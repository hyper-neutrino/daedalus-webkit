<script lang="ts">
    import MetaTags from "$lib/MetaTags.svelte";
    import Navbar from "$lib/Navbar.svelte";
</script>

<html lang="en">
    <head>
        <MetaTags title="hello" />
    </head>

    <Navbar background="black" foreground="blue">Hello</Navbar>

    top <br />

    {#each new Array(100) as _}
        a <br />
    {/each}
</html>
