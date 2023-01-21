<script lang="ts">
    export let data: any = null;
</script>

{#if data !== null && data !== undefined}
    <slot />
{:else}
    Loading...
{/if}
