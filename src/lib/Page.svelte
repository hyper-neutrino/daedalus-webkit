<script lang="ts">
    export let title: string = "";
    export let description: string = "";
    export let keywords: string[] = [];
    export let author: string = "";

    export let discord_embed: {
        title?: string;
        description?: string;
        url?: string;
        color?: number;
    } = {};
</script>

<!DOCTYPE html>
<html lang="en">
    <head>
        {#if description}
            <meta name="description" content={description} />
        {/if}
        {#if keywords?.length > 0}
            <meta name="keywords" content={keywords.join(",")} />
        {/if}
        {#if author}
            <meta name="author" content={author} />
        {/if}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {#if discord_embed}
            {#if discord_embed.title}
                <meta name="og:title" content={discord_embed.title} />
            {/if}
            {#if discord_embed.description}
                <meta
                    name="og:description"
                    content={discord_embed.description}
                />
            {/if}
            {#if discord_embed.url}
                <meta name="og:url" content={discord_embed.url} />
            {/if}
            {#if discord_embed.color}
                <meta
                    name="theme-color"
                    data-react-helmet="true"
                    content={"#" +
                        discord_embed.color
                            .toString(16)
                            .slice(-6)
                            .padStart(6, "0")}
                />
            {/if}
        {/if}

        {#if title}
            <title>{title}</title>
        {/if}
    </head>

    <body>
        <slot />
    </body>
</html>
