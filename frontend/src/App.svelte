<div id="app">
	<AppBar />
	<main>
		<!-- <Test /> -->
		<img id="img" src="./test.png" alt="test.png" bind:this={image}>
		{#if image !== undefined}
		<ImageCanvas
			width={1280}
			height={1280}
			image={image}
			points={points}
			on:add-point={() => {}}
			on:drag-point={() => {}}
		/>
		{/if}
	</main>
</div>

<script lang="ts">
	import { onMount } from "svelte";
	import AppBar from "./components/AppBar.svelte"	
	import type { PointConfig } from "./components/canvas/Point";
	import ImageCanvas from "./components/ImageCanvas.svelte";
	// import Test from "./components/Test.svelte"	

	let image: HTMLImageElement;
	let points: PointConfig[] = [];

	onMount(() => {
		image = document.getElementById("img") as HTMLImageElement
	})

</script>
