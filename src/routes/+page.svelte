<script lang="ts">
    import { SaveChanges } from "$lib";
    let unsaved: boolean = false;
</script>

<a href={"javascript:void(0)"} on:click={() => (unsaved = !unsaved)}>toggle</a>
<SaveChanges {unsaved} />
