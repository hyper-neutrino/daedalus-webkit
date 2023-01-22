<script lang="ts">
    import Modal from "$lib/Modal.svelte";

    let open: boolean = false;
</script>

<button on:click={() => (open = true)}>open modal</button>
<Modal bind:open>
    {#each new Array(100) as _}
        a <br />
    {/each}
</Modal>
