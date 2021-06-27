<script lang="ts">
  import AppBar from "./components/AppBar.svelte";
  import PointsSelector from "./components/PointsSelector.svelte";
  import { pointsA, pointsB } from "./stores";
</script>

<div id="app">
  <header>
    <AppBar />
  </header>
  <main>
    <div class="point-selectors">
      <div>
        <PointsSelector name="画像1" bind:points={$pointsA} />
      </div>
      <div>
        <PointsSelector name="画像2" bind:points={$pointsB} />
      </div>
    </div>
  </main>
</div>

<style lang="scss">
  #app {
    height: 100%;
  }
  header {
    height: 7%;
  }
  main {
    height: 93%;
    position: relative;
  }
  .point-selectors {
    height: 100%;
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    & > * {
      height: 49%;
    }
  }
</style>
