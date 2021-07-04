<script lang="ts">
  import { fly } from "svelte/transition";
  import { createEventDispatcher } from "svelte";

  export let message: string = "";

  const dispatcher = createEventDispatcher<{ close: void }>();
</script>

<div class="alert" transition:fly={{ y: -100 }}>
  <div class="material-icons close" on:click={() => dispatcher("close")}>
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
    // left: 0;
    right: 3%;
    // margin: auto;
    padding: 16px;
    width: 300px;
    height: 100px;
    background-color: crimson;
    color: white;
    z-index: 100;
    box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.14),
      0 1px 18px 0 rgba(0, 0, 0, 0.12), 0 3px 5px -1px rgba(0, 0, 0, 0.2);
  }
  .close {
    position: absolute;
    right: 8px;
    top: 8px;
    color: rgba(0, 0, 0, 0.12);
    cursor: pointer;
    &:hover {
      color: rgba(0, 0, 0, 0.48);
    }
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
