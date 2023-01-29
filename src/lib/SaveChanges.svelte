<script lang="ts">
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    export let unsaved = false;

    export let background: string = "#222";
    export let foreground: string = "#ccc";

    export let reset_background: string = "#0000";
    export let reset_foreground: string = "#eee";

    export let save_background: string = "#3ba55d";
    export let save_foreground: string = "#eee";
</script>

<div
    class="box {unsaved ? 'show' : ''}"
    style="background-color: {background}; color: {foreground}"
>
    You have unsaved changes

    <div>
        <a
            id="reset"
            href={"javascript:void(0)"}
            on:click={() => dispatch("reset")}
            style="background-color: {reset_background}; color: {reset_foreground}"
        >
            Reset
        </a>
        <a
            id="save"
            href={"javascript:void(0)"}
            on:click={() => dispatch("save")}
            style="background-color: {save_background}; color: {save_foreground}"
        >
            Save
        </a>
    </div>
</div>

<style lang="scss">
    .box {
        position: fixed;
        bottom: 0px;
        left: calc(50vw - 30%);
        z-index: 5;
        transition: 250ms bottom cubic-bezier(1, -0.5, 1, 1);

        border-radius: 5px;
        font-size: 120%;
        padding: 0.75em 1em;
        position: fixed;

        width: 60%;

        display: flex;
        flex-direction: row;
        justify-content: space-between;

        transform: translateY(100%);
    }

    .show {
        bottom: 80px;
        transition: 250ms bottom cubic-bezier(0, 1.5, 1, 1);
    }

    a {
        text-decoration: none;
        padding: 0.25em 1em;
        border-radius: 5px;
    }
</style>
