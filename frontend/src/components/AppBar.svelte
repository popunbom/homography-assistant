<div id="app-bar">
  <h1 class="title-bar">homograph-assistant</h1>
  <div class="tool-bar">
    <button>Transform</button>
    <button>Hide</button>
    <button>Export</button>
  </div>
</div>

<style lang="scss">
@import "../stylesheets/variables";
#app-bar {
  background-color: $primary;
	color: $primary_text;
	box-shadow: 0px 2px 2px $primary;
  display: flex;
  justify-content: space-between;
}
h1.title-bar {
	margin: 0;
	padding: 0.5em;
}
.tool-bar {
  display: flex;
  align-items: center;
}
button {
  $font_size: 1.35em;
  height: 80%;
  box-sizing: border-box;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: $primary_text;
  font-family: 'Roboto', sans-serif;
  font-weight: 100;
  font-size: $font_size;
  width: calc(#{$font_size} * 7);
  &:hover {
    background-color: $primary_400;
  }
  &:active {
    background-color: $primary_450;
  }
}
</style>
