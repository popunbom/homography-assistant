<script lang="ts">
  import AppBar from "./components/AppBar.svelte";
  import PointsSelector from "./components/PointsSelector.svelte";
  import { pointsA } from "./stores";
</script>

<div id="app">
  <AppBar />
  <main>
    <div class="wrapper">
      <PointsSelector bind:points={$pointsA} />
    </div>
  </main>
</div>

<style lang="scss">
  main {
    padding: 16px;
    position: relative;
  }
  .wrapper {
    width: 800px;
    height: 300px;
  }
</style>
