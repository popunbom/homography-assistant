<script lang="ts">
  import { fade } from "svelte/transition";
  import { createEventDispatcher } from "svelte";
  import CodeBlock from "./CodeBlock.svelte";

  import { format } from "date-fns";

  import { basePointSelector, overPointSelector } from "../stores";
  import {
    exportPointsAsCSV,
    exportPointsAsJSON,
    saveFile,
  } from "../utils/exporters";

  const dispatcher = createEventDispatcher<{ close: void }>();
  const formats: string[] = ["JSON", "CSV"];

  let selectedFormat: string = "JSON";

  $: code = (() => {
    if (selectedFormat == "JSON") {
      return exportPointsAsJSON(
        $basePointSelector.points,
        $overPointSelector.points,
      );
    } else if (selectedFormat == "CSV") {
      return exportPointsAsCSV(
        $basePointSelector.points,
        $overPointSelector.points,
      );
    }
    return "";
  })();

  const handleDownload = () => {
    const timestamp = format(new Date(), "yyyyMMdd-HHmmss");
    saveFile(code, `points_${timestamp}.${selectedFormat.toLowerCase()}`);
  };
</script>

<div
  class="modal"
  transition:fade={{ duration: 100 }}
  on:click={() => dispatcher("close")}
>
  <div class="content" on:click|stopPropagation={() => {}}>
    <div
      class="material-icons btn__icon_close"
      on:click={() => dispatcher("close")}
    >
      close
    </div>
    <div class="material-icons download" on:click={() => handleDownload()}>
      download
    </div>
    <h2>対応点をファイルに出力</h2>
    <div class="tab">
      {#each formats as format}
        <div
          class="tab-item"
          aria-selected={selectedFormat == format}
          on:click={() => (selectedFormat = format)}
        >
          {format}
        </div>
      {/each}
    </div>
    <div class="code-block">
      <CodeBlock {code} />
    </div>
  </div>
</div>

<style lang="scss">
  @import "../stylesheets/common";

  .modal {
    @extend .fill-width;
    @extend .fill-height;
    @extend .flex__center_vertical;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.6);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 50;
  }
  .content {
    width: 65%;
    height: 85%;
    padding: 32px;
    background-color: white;
    position: relative;
    display: flex;
    flex-direction: column;
  }
  .tab {
    display: flex;
    margin: 16px 0px;
  }
  .tab-item {
    $font_size: 1.2em;
    $border_size: calc(#{$font-size} * 0.2);
    font-size: $font_size;
    font-family: "Source Code Pro", monospace;
    font-weight: bold;
    padding: calc(#{$font-size} * 0.5) calc(#{$font-size});
    border-bottom: $border_size solid rgba(0, 0, 0, 0);
    &:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }
    &[aria-selected="true"] {
      border-color: cornflowerblue;
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
  .code-block {
    border: 2px solid rgba(0, 0, 0, 0.15);
    flex-grow: 1;
    overflow-y: scroll !important;
  }
  .download {
    $font_size: 2em;
    position: absolute;
    bottom: 48px;
    right: 48px;
    z-index: 75;
    font-size: $font_size;
    border-radius: 50%;
    background-color: cornflowerblue;
    color: white;
    padding: calc(#{$font_size} * 0.25);
    @include BoxShadow(16);
    &:hover {
      background-color: #93b5f2;
    }
    &:active {
      background-color: #4668a6;
    }
  }
</style>
