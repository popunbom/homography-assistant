<script lang="ts">
  import AppBar from "./components/AppBar.svelte";
  import FileUploader from "./components/FileUploader.svelte";
  import ImageCanvas from "./components/ImageCanvas.svelte";
  import DraggableList from "./components/DraggableList.svelte";
  import type { Point } from "./entities/Point";

  let image: HTMLImageElement;
  let points: Point[] = [];
</script>

<div id="app">
  <AppBar />
  <main>
    <div class="draggable-list">
      <DraggableList bind:points />
    </div>
    <div class="wrapper">
      <FileUploader on:imageLoad={({ detail }) => (image = detail)} />
    </div>
    {#if image !== undefined}
      <div class="image-canvas">
        <ImageCanvas width={600} height={300} bind:points {image} />
      </div>
    {/if}
  </main>
</div>

<style lang="scss">
  main {
    padding: 16px;
    position: relative;
  }
  .wrapper {
    width: 200px;
    height: 50px;
    margin: 16px;
  }

  .image-canvas {
    border: 1px solid cornflowerblue;
    width: fit-content;
    height: fit-content;
  }
  .draggable-list {
    position: absolute;
    right: 0px;
  }
</style>
