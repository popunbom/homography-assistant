<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatcher = createEventDispatcher<{
    transform: void;
    export: void;
  }>();
</script>

<div id="app-bar">
  <h2 class="title-bar">homograph-assistant</h2>
  <div class="tool-bar">
    <button on:click={() => dispatcher("transform")}>Transform</button>
    <button on:click={() => dispatcher("export")}>Export</button>
  </div>
</div>

<style lang="scss">
  @import "../stylesheets/variables";
  @import "../stylesheets/common";

  #app-bar {
    @extend .flex__center_horizontal;
    @extend .flex__center_vertical;
    height: 100%;
    padding: 0 1em;
    color: $primary_text;
    background-color: $primary_light;
    box-shadow: 0px 0px 8px 0px $primary;
  }
  h2.title-bar {
    margin: 0;
    padding: 0;
    color: white;
    font-family: "Abril Fatface", cursive;
  }
  .tool-bar {
    @extend .flex__center_vertical;
    padding: 0 1em;
    height: 100%;
  }
  button {
    $font_size: 1.05em;
    margin: 0 0.5em;
    width: calc(#{$font_size} * 10);
    height: 75%;
    font-size: $font_size;
  }
</style>
