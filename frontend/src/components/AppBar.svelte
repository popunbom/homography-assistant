<div id="app-bar">
  <h2 class="title-bar">homograph-assistant</h2>
  <div class="tool-bar">
    <button>Transform</button>
    <button>Hide</button>
    <button>Export</button>
  </div>
</div>

<style lang="scss">
  @import "../stylesheets/variables";
  @import "../stylesheets/global";

  #app-bar {
    height: 100%;
    padding: 0 1em;
    background-color: $primary;
    color: $primary_text;
    box-shadow: 0px 2px 2px $primary;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  h2.title-bar {
    margin: 0;
    padding: 0;
    color: white;
  }
  .tool-bar {
    display: flex;
    align-items: center;
    padding: 0 1em;
    height: 100%;
  }
  button {
    @extend .btn__style_reset;
    $font_size: 1.05em;
    height: 100%;
    color: $primary_text;
    box-sizing: border-box;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    font-family: "Roboto", sans-serif;
    font-weight: 100;
    font-size: $font_size;
    width: calc(#{$font_size} * 10);
    &:hover {
      background-color: $primary_400;
    }
    &:active {
      background-color: $primary_450;
    }
  }
</style>
