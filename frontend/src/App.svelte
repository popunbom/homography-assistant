<div id="app">
	<AppBar />
	<main>
		<DraggableList
			on:changed={handleListChange}
		/>
	</main>
</div>

<script lang="ts">
	import { onMount } from "svelte"
	import { points } from "./stores/points";
	import AppBar from "./components/AppBar.svelte"	
	import DraggableList from "./components/DraggableList.svelte";

	const handleListChange = () => {
		console.debug("Detect changed");
		console.debug($points);
	}

	onMount(() => {
		points.set([
			{ id: 1, pos: {x: 0, y: 0} },
			{ id: 2, pos: {x: 100, y: 50} },
			{ id: 3, pos: {x: 400, y: 200} },
			{ id: 4, pos: {x: 300, y: 150} },
			{ id: 5, pos: {x: 200, y: 100} },
		]);
	});
</script>
