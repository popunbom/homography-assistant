<script lang="ts">
  import AppBar from "./components/AppBar.svelte";
  import PointsSelector from "./components/PointsSelector.svelte";
  import { basePointSelector, overPointSelector } from "./stores";
</script>

<div id="app">
  <header>
    <AppBar />
  </header>
  <main>
    <div class="point-selectors">
      <div>
        <PointsSelector name="基準画像" bind:data={$basePointSelector} />
      </div>
      <div>
        <PointsSelector name="変形画像" bind:data={$overPointSelector} />
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
