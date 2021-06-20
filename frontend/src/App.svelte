<div id="app">
	<AppBar />
	<main>
		<DraggableList
			bind:points={points}
			on:changed={handleListChange}
		/>
		<!-- <img id="img" src="./test.png" alt="test.png" bind:this={image}>
		{#if image !== undefined}
		<ImageCanvas
			width={1280}
			height={1280}
			image={image}
			points={points}
			on:add-point={() => {}}
			on:drag-point={() => {}}
		/>
		{/if} -->
	</main>
</div>

<script lang="ts">
	import { onMount } from "svelte";
	import AppBar from "./components/AppBar.svelte"	
	import type { PointConfig } from "./components/canvas/Point";
	
	import DraggableList from "./components/DraggableList.svelte";
	import { pickColorWithBG } from "./utils/colors";
	// import Test from "./components/Test.svelte"	

	let image: HTMLImageElement;
	let points: PointConfig[] = [...Array(5).keys()].map(
		(index: number) => ({
			id: index,
			color: pickColorWithBG(index),
			pos: {x: index * 100, y: index * 50}
		} as PointConfig)
	)

	const handleListChange = () => {
		console.debug("Detect changed");
		console.debug(points);
	}

	onMount(() => {
		image = document.getElementById("img") as HTMLImageElement
	})

</script>
