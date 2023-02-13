<script lang="ts">
    import { createEventDispatcher, onMount } from "svelte";

    export let min_height: string = "0px";

    const dispatch = createEventDispatcher();

    export function update() {
        if (!element) return;

        element.style.height = "0";
        element.style.height = `calc(max(${min_height}, ${element.scrollHeight}px))`;

        dispatch("input");
    }

    let element: any;
    export let value: string = "";
    onMount(() => update.bind(element)());
</script>

<textarea
    {...$$props}
    bind:value
    on:input={update}
    on:keydown={(e) => dispatch("keydown", e)}
    bind:this={element}
/>

<style lang="scss">
    textarea {
        resize: none;
    }
</style>
