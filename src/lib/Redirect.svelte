<script lang="ts">
    export let to: string;
    export let after: number = 0;
</script>

<meta http-equiv="refresh" content="{after};URL='{to.replace("'", '%27')}'" />
