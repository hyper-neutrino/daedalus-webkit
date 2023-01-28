<script lang="ts">
    let value: string = $$props.value ?? "";
</script>

<textarea {...$$props} bind:value rows={value.split("\n").length} />

<style lang="scss">
    textarea {
        resize: none;
    }
</style>
