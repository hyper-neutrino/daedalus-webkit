<script lang="ts">
    import { onMount } from "svelte";

    export let min_height: number = 0;

    function update() {
        this.style.height = "0";
        this.style.height = Math.max(min_height, this.scrollHeight) + "px";
    }

    let element: any;
    onMount(() => update.bind(element)());
</script>

<textarea {...$$props} on:input={update} bind:this={element} />

<style lang="scss">
    textarea {
        resize: none;
    }
</style>
