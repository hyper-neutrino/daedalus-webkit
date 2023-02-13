<script lang="ts">
    export let title: string;
    export let header_color: string = "#000";
    export let drawer_background: string = "#0000";
    export let color: string = "#ccc";
    export let duration: number = 300;
    export let open: boolean = false;
</script>

<link
    rel="stylesheet"
    type="text/css"
    href="https://fonts.googleapis.com/icon?family=Material+Icons"
/>

<div
    class="header"
    on:click={() => (open = !open)}
    on:keydown={() => (open = !open)}
    style="color: {header_color}; background-color: {color}"
>
    <svg viewBox="0 0 100 100" style="width: 1em; height: 1em">
        <polyline
            points="35,25 60,50 35,75"
            class={open ? "spin" : ""}
            stroke-width="10px"
            stroke={header_color}
            fill="none"
            style="transition: {duration}ms ease-in-out"
        />
    </svg>
    <span style="padding-left: 1em">{@html title}</span>
</div>
<div
    class="drawer {open ? 'open' : 'closed'}"
    style="background-color: {drawer_background}; border: 2px solid {color}; transition: {duration}ms ease-in-out"
>
    <div><slot /></div>
</div>

<style lang="scss">
    :root {
        --width: 90%;

        @media screen and (max-width: 1000px) {
            --width: 75%;
        }
    }

    polyline {
        transform-origin: 50% 50%;
    }

    .spin {
        transform: rotate(90deg);
    }

    .header {
        display: flex;
        flex-direction: row;
        align-items: center;

        cursor: default;
        padding: 0.5em 2em;
    }

    .header {
        width: var(--width);

        user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
    }

    .drawer {
        padding: 0.5em 2em;

        width: calc(var(--width) - 4px);

        display: grid;
        overflow: scroll;

        & > div {
            align-self: end;
            min-height: 0;
        }
    }

    .open {
        grid-template-rows: 1fr;
        margin-bottom: 1em;
    }

    .closed {
        grid-template-rows: 0fr;
        opacity: 0;
    }
</style>
