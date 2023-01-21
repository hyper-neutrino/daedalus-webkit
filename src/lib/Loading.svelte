<script lang="ts">
    export let data: any;
</script>

{#if data}
    <slot />
{:else}
    Loading...
{/if}
