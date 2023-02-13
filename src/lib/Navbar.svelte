<script lang="ts">
    export let sticky: boolean = false;
    export let scale: number = 0.005;
    export let height: [number, number] = [100, 50];
    export let opacity: [number, number] = [0, 100];

    export let background: string = "#ffffff00";
    export let foreground: string = "#000000";

    let y: number = 0;

    let inter: number = 0;
    $: inter = Math.min(y * scale, 1);

    const interpolate: (array: [number, number], inter: number) => number = ([x, y]) =>
        y * inter + x * (1 - inter);

    let height_: number;
    let opacity_: number;

    $: height_ = interpolate(height, inter);
    $: opacity_ = interpolate(opacity, inter);
</script>

<svelte:window bind:scrollY={y} />

<div style={sticky ? "position: fixed; left: 0; top: 0; width: 100%" : ""}>
    <nav style="height: {height_}px; color: {foreground}">
        <slot />
    </nav>

    <div
        class="bg"
        style="height: {height_}px; background-color: {background}; opacity: {opacity_}%"
    />
</div>

<div style="height: {Math.max(height[0], height[1])}px;" />

<style lang="scss">
    nav {
        position: absolute;
        width: 100%;
        z-index: 100;
    }

    .bg {
        position: absolute;
        width: 100%;
        z-index: 90;
    }
</style>
