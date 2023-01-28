import type { RequestEvent, RequestHandler } from "@sveltejs/kit";

const cookie_config = { path: "/", httpOnly: true, sameSite: "lax" } as const;

export class DiscordOAuth2 {
    client_id: string;
    client_secret: string;
    callback_url: string;
    domain: string;
    scope: string;

    url: string;

    constructor(
        client_id: string,
        client_secret: string,
        callback_url: string,
        domain: string,
        scopes: string[] = ["identify"],
    ) {
        this.client_id = client_id;
        this.client_secret = client_secret;
        this.callback_url = callback_url;
        this.domain = domain;
        this.scope = scopes.join(" ");

        this.url = `https://discord.com/api/v8/oauth2/authorize?client_id=${encodeURIComponent(
            this.client_id,
        )}&redirect_uri=${encodeURIComponent(
            this.callback_url,
        )}&response_type=code&scope=${encodeURIComponent(this.scope)}`;
    }

    login: RequestHandler = async ({ cookies, url }) => {
        let state = "";
        for (let x = 0; x < 32; x++)
            state += String.fromCharCode(Math.floor(Math.random() * 94) + 33);

        const headers = new Headers({
            Location: `${this.url}&state=${encodeURIComponent(
                state + (url.searchParams.get("redirect") ?? "/"),
            )}`,
        });

        headers.append(
            "Set-Cookie",
            cookies.serialize("state", state, {
                ...cookie_config,
                expires: new Date(Date.now() + 10 * 60 * 1000),
            }),
        );

        return new Response(null, { headers, status: 302 });
    };

    callback: RequestHandler = async ({ cookies, url, fetch }) => {
        const code = url.searchParams.get("code");
        if (!code) throw "missing-code";

        const state = url.searchParams.get("state");
        if (!state) throw "missing-state";

        if (state.substring(0, 32) !== cookies.get("state")) throw "state-mismatch";

        const data = {
            client_id: this.client_id,
            client_secret: this.client_secret,
            grant_type: "authorization_code",
            redirect_uri: this.callback_url,
            code,
            scope: this.scope,
        };

        const request = await fetch("https://discord.com/api/v8/oauth2/token", {
            method: "post",
            body: new URLSearchParams(data),
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
        });

        if (!request.ok) throw "oauth-request-failed";

        const response = await request.json();

        const access_expire = new Date(Date.now() + response.expires_in);
        const refresh_expire = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

        const headers = new Headers({ Location: state.substring(32) });

        headers.append(
            "Set-Cookie",
            cookies.serialize("discord_access_token", response.access_token, {
                ...cookie_config,
                expires: access_expire,
            }),
        );

        headers.append(
            "Set-Cookie",
            cookies.serialize("discord_refresh_token", response.refresh_token, {
                ...cookie_config,
                expires: refresh_expire,
            }),
        );

        return new Response(null, { headers, status: 302 });
    };

    refresh: RequestHandler = async ({ cookies, url, fetch }) => {
        const discord_refresh_token = url.searchParams.get("code");
        if (!discord_refresh_token)
            return new Response(JSON.stringify({ error: "No refresh token found." }), {
                status: 500,
            });

        const data = {
            client_id: this.client_id,
            client_secret: this.client_secret,
            grant_type: "refresh_token",
            redirect_uri: this.callback_url,
            refresh_token: discord_refresh_token as string,
            scope: this.scope,
        };

        const request = await fetch("https://discord.com/api/v8/oauth2/token", {
            method: "post",
            body: new URLSearchParams(data),
            headers: { "Content-Type": "application/json" },
        });

        if (!request.ok)
            return new Response(JSON.stringify({ error: "No refresh token found." }), {
                status: 500,
            });

        const response = await request.json();

        const access_token_expiry = new Date(Date.now() + response.expires_in);
        const refresh_token_expiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

        const headers = new Headers({ Location: "/" });

        headers.append(
            "Set-Cookie",
            cookies.serialize("discord_access_token", response.access_token, {
                ...cookie_config,
                expires: access_token_expiry,
            }),
        );

        headers.append(
            "Set-Cookie",
            cookies.serialize("discord_refresh_token", response.refresh_token, {
                ...cookie_config,
                expires: refresh_token_expiry,
            }),
        );

        return new Response(JSON.stringify({ discord_access_token: response.access_token }), {
            headers,
            status: 200,
        });
    };

    logout: RequestHandler = async ({ cookies, url }) => {
        const headers = new Headers({ Location: url.searchParams.get("redirect") ?? "/" });

        headers.append(
            "Set-Cookie",
            cookies.serialize("discord_access_token", "", { ...cookie_config, maxAge: 0 }),
        );

        headers.append(
            "Set-Cookie",
            cookies.serialize("discord_refresh_token", "", { ...cookie_config, maxAge: 0 }),
        );

        return new Response(null, { headers, status: 302 });
    };

    check: (
        event: RequestEvent<Partial<Record<string, string>>, string | null>,
        refresh_path: string,
    ) => Promise<void> = async (event, refresh_path) => {
        const cookies = event.cookies;

        const discord_access_token = cookies.get("discord_access_token");
        const discord_refresh_token = cookies.get("discord_refresh_token");

        let access_token: string | undefined;

        if (discord_refresh_token && !discord_access_token) {
            const request = await fetch(
                `${this.domain}${refresh_path}?code=${discord_refresh_token}`,
            );

            const response = await request.json();

            access_token = response.discord_access_token;
        } else access_token = discord_access_token;

        if (access_token) {
            const request = await fetch("https://discord.com/api/v8/users/@me", {
                headers: { Authorization: `Bearer ${access_token}` },
            });

            if (request.ok) {
                const response = await request.json();

                if (response.id) return response;
            }
        }
    };
}
