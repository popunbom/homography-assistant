<script lang="ts">
  import AppBar from "./components/AppBar.svelte";
  import PointsSelector from "./components/PointsSelector.svelte";
  import { basePointSelector, overPointSelector } from "./stores";
  import ResultCanvas from "./components/ResultCanvas.svelte";
  import { sendTransformRequest } from "./utils/api";
  import Alert from "./components/Alert.svelte";
  import PointsExportModal from "./components/PointsExportModal.svelte";

  let resultCanvasDom: HTMLDivElement;
  let transformedImage: HTMLImageElement;
  let showModal = false;
  let message = "";

  const handleTransform = () => {
    sendTransformRequest($basePointSelector, $overPointSelector)
      .then((image) => {
        transformedImage = image;
        console.debug(transformedImage);
      })
      .catch((reason: string) => (message = reason));
  };
</script>

<div id="app">
  {#if message !== ""}
    <Alert {message} on:close={() => (message = "")} />
  {/if}
  {#if showModal}
    <PointsExportModal on:close={() => (showModal = false)} />
  {/if}
  <header>
    <AppBar
      on:transform={() => handleTransform()}
      on:export={() => (showModal = true)}
    />
  </header>
  <main>
    <div class="point-selectors">
      <div>
        <PointsSelector
          label="基準画像"
          fileDomId="baseImage"
          bind:data={$basePointSelector}
        />
      </div>
      <div>
        <PointsSelector
          label="変形画像"
          fileDomId="overImage"
          bind:data={$overPointSelector}
        />
      </div>
    </div>
    <div class="result-canvas" bind:this={resultCanvasDom}>
      <ResultCanvas
        baseImage={transformedImage}
        overImage={$basePointSelector.image}
      />
    </div>
  </main>
</div>

<style lang="scss">
  @import "./stylesheets/common";
  #app {
    height: 100%;
  }
  header {
    height: 7%;
  }
  main {
    @extend .flex__center_horizontal;
    height: 93%;
    position: relative;
    padding: 16px;
  }
  .point-selectors {
    @extend .flex__center_horizontal;
    flex-direction: column;
    width: 59%;
    height: 100%;
    & > * {
      height: 49%;
    }
  }
  .result-canvas {
    width: 40%;
    height: 100%;
    box-sizing: content-box;
  }
</style>
