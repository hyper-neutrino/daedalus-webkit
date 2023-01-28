<script lang="ts">
    export let foreground: string = "#009688";
    export let background: string = "#00968860";
    export let size: number = 100;
    export let text: string | string[] = ["Loading", "Loading.", "Loading..", "Loading..."];

    const length = () => (typeof text === "string" ? 1 : text.length);

    let index: number = 0;

    function advance() {
        setTimeout(() => {
            index = (index + 1) % length();
            advance();
        }, 2500 / length());
    }

    advance();
</script>

<div>
    <svg viewBox="0 0 100 100" style="width: {size}px; height: {size}px">
        <polygon
            id="small"
            points="50,86 81.2,32 18.6,32"
            stroke={background}
            stroke-width="5"
            fill="none"
        />
        <polygon
            id="large"
            points="50,95 89,27.5 11,27.5"
            stroke={foreground}
            stroke-width="4"
            fill="none"
        />
    </svg>
    <span style="font-size: {size * 0.8}px; padding-left: {size * 0.2}px"
        >{typeof text === "string" ? text : text[index]}</span
    >
</div>

<style lang="scss">
    div {
        display: inline-flex;
        flex-direction: row;
        align-items: center;
    }

    @keyframes spin {
        0% {
            transform: rotateZ(0deg);
        }
        100% {
            transform: rotateZ(360deg);
        }
    }

    #large {
        transform-origin: 50% 50%;
        animation: 2500ms spin cubic-bezier(0.75, 0.25, 0.25, 0.75) infinite;
    }

    #small {
        transform-origin: 50% 50%;
        animation: 7500ms spin linear infinite reverse;
    }
</style>
