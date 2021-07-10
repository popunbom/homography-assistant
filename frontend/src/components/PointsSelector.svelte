<script lang="ts">
  import FileUploader from "./FileUploader.svelte";
  import ImageCanvas from "./ImageCanvas.svelte";
  import DraggableList from "./DraggableList.svelte";
  import type { PointSelector } from "src/entities/PointSelector";

  // Props
  export let fileDomId: string;
  export let label: string;
  export let data: PointSelector;

  // Reactive data
  let imageCanvasDom: HTMLDivElement;
</script>

<div class="points-selector fill-height">
  <h2>{label}</h2>
  <div class="flex-wrapper">
    <div class="image-canvas" bind:this={imageCanvasDom}>
      {#if data.image === undefined}
        <FileUploader
          {fileDomId}
          on:imageLoad={({ detail }) => (data.image = detail)}
        />
      {:else}
        <ImageCanvas bind:data />
      {/if}
    </div>
    <div class="draggable-list">
      <DraggableList bind:points={data.points} />
    </div>
  </div>
</div>

<style lang="scss">
  @import "../stylesheets/common";

  h2 {
    @extend .flex__center_vertical;
    height: 10%;
    margin: 0;
  }
  .flex-wrapper {
    @extend .fill-width;
    height: 90%;
    border: 2px solid gray;
    display: flex;
  }

  .image-canvas {
    @extend .fill-height;
    width: 70%;
  }
  .draggable-list {
    width: 30%;
    border: 2px solid gray;
    margin: -2px -2px -2px 0px;
    box-sizing: content-box;
  }
</style>
