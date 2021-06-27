<script lang="ts">
  import AppBar from "./components/AppBar.svelte";
  import PointsSelector from "./components/PointsSelector.svelte";
  import { pointsA } from "./stores";
</script>

<div id="app">
  <AppBar />
  <main>
    <PointsSelector bind:points={$pointsA} />
  </main>
</div>

<style lang="scss">
  main {
    padding: 16px;
    position: relative;
  }
</style>
