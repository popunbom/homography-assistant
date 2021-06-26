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
			{ x: 0, y: 0 },
			{ x: 100, y: 50 },
			{ x: 400, y: 200 },
			{ x: 300, y: 150 },
			{ x: 200, y: 100 },
		]);
	});
</script>
