<script lang="ts">
  import AppBar from "./components/AppBar.svelte";
  import PointsSelector from "./components/PointsSelector.svelte";
  import { basePointSelector, overPointSelector } from "./stores";
  import ResultCanvas from "./components/ResultCanvas.svelte";
  import { sendTransformRequest } from "./utils/api";
  import Alert from "./components/Alert.svelte";

  let resultCanvasDom: HTMLDivElement;
  let transformedImage: HTMLImageElement;
  let visible = false;
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
  <header>
    <AppBar
      on:transform={() => handleTransform()}
      on:export={() => (message = "未実装です")}
    />
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
