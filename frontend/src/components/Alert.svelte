<script lang="ts">
  import { fly } from "svelte/transition";
  import { createEventDispatcher } from "svelte";

  export let message: string = "";

  const dispatcher = createEventDispatcher<{ close: void }>();
</script>

<div class="alert" transition:fly={{ y: -100 }}>
  <div
    class="material-icons btn__icon_close"
    on:click={() => dispatcher("close")}
  >
    close
  </div>
  <div class="message">
    <div class="material-icons">highlight_off</div>
    <p>{message}</p>
  </div>
</div>

<style lang="scss">
  @import "../stylesheets/common";

  .alert {
    position: absolute;
    top: 3%;
    right: 3%;
    padding: 16px;
    width: 300px;
    height: 100px;
    background-color: crimson;
    color: white;
    z-index: 100;
    @include BoxShadow(6);
  }
  .message {
    margin-top: 24px;
    display: flex;
    & > p {
      font-weight: bold;
      margin: 0;
      margin-left: 8px;
    }
  }
</style>
