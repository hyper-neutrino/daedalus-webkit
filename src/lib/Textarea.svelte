<script lang="ts">
    import { onMount } from "svelte";

    function update() {
        this.style.height = "0";
        this.style.height = this.scrollHeight + "px";
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
