<script lang="ts">
  import { onMount } from "svelte";

  import AppBar from "./components/AppBar.svelte";
  import PointsSelector from "./components/PointsSelector.svelte";
  import { basePointSelector, overPointSelector } from "./stores";
  import ResultCanvas from "./components/ResultCanvas.svelte";
  import { sendTransformRequest } from "./utils/api";

  let resultCanvasDom: HTMLDivElement;
  let resultCanvasWidth: number;
  let resultCanvasHeight: number;
  let transformedImage: HTMLImageElement;

  const handleTransform = () => {
    console.debug("handleTransform");
    sendTransformRequest($basePointSelector, $overPointSelector).then(
      (image) => {
        transformedImage = image;
        console.debug(transformedImage);
      },
    );
  };
  onMount(() => {
    resultCanvasWidth = resultCanvasDom.clientWidth;
    resultCanvasHeight = resultCanvasDom.clientHeight;
  });
</script>

<div id="app">
  <header>
    <AppBar on:transform={() => handleTransform()} />
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
        width={resultCanvasWidth}
        height={resultCanvasHeight}
        baseImage={transformedImage}
        overImage={$basePointSelector.image}
      />
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
    display: flex;
    justify-content: space-between;
    padding: 16px;
    // border: 2px solid cornflowerblue;
    box-sizing: border-box;
  }
  .point-selectors {
    width: 59%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    & > * {
      height: 49%;
    }
  }
  .result-canvas {
    width: 40%;
    height: 100%;
    // padding: 16px;
    // border: 2px solid gray;
    box-sizing: border-box;
  }
</style>
