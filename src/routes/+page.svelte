<script lang="ts">
    import LoadingSpinner from "$lib/LoadingSpinner.svelte";

    let text = ["a", "b"];

    setTimeout(() => (text = ["a", "b", "c"]), 5000);
</script>

<LoadingSpinner size={50} {text} />
