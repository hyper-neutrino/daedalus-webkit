<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let open: boolean = false;
    export let background_color: string = "white";
    export let overlay_color: string = "#00000077";

    const dispatch = createEventDispatcher();

    function close() {
        open = false;
        dispatch("close");
    }
</script>

<svelte:window on:keydown={(e) => e.key === "Escape" && close()} />

<div class="modal {open ? '' : 'closed'}" style="background-color: {background_color};">
    <slot />
</div>

<div
    class="overlay {open ? '' : 'closed'}"
    style="background-color: {overlay_color};"
    on:click={close}
    on:keydown={close}
/>

<style lang="scss">
    div.modal {
        position: fixed;

        z-index: 300;

        top: 20%;
        left: 20%;
        right: 20%;
        max-height: 50%;

        border-radius: 5px;
        transition: 200ms ease-in-out;

        overflow-y: scroll;
        padding: 2% 5%;
    }

    div.modal.closed {
        transform: scale(75%) translateY(-20%);
        opacity: 0%;
        pointer-events: none;
    }

    @media screen and (max-width: 1000px) {
        div.modal {
            left: 5%;
            right: 5%;
        }
    }

    div.overlay {
        position: fixed;
        z-index: 200;

        inset: 0;

        transition: 200ms ease-in-out;
    }

    div.overlay.closed {
        opacity: 0%;
        pointer-events: none;
    }
</style>
