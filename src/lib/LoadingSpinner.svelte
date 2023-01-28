<script lang="ts">
    export let color: string = "#009688";
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
    <svg width="{size}px" height="{size}px">
        <polygon
            id="large"
            points="{size * 0.5},{size * 0.95} {size * 0.89},{size * 0.275} {size * 0.11},{size *
                0.275}"
            stroke={color}
            stroke-width={2 + size * 0.02}
            fill="none"
        />
        <polygon
            id="small"
            points="{size * 0.5},{size * 0.86} {size * 0.812},{size * 0.32} {size * 0.186},{size *
                0.32}"
            stroke={color}
            opacity="32%"
            stroke-width={3 + size * 0.02}
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

        60% {
            transform: rotateZ(120deg);
        }

        100% {
            transform: rotateZ(360deg);
        }
    }

    @keyframes backspin {
        0% {
            transform: rotateZ(0deg);
        }

        100% {
            transform: rotateZ(360deg);
        }
    }

    #large {
        transform-origin: 50% 50%;
        animation: 2500ms spin linear infinite;
    }

    #small {
        transform-origin: 50% 50%;
        animation: 8000ms backspin linear infinite reverse;
    }
</style>
