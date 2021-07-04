<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatcher = createEventDispatcher<{ imageLoad: HTMLImageElement }>();

  export let id: string = "imgFile";
  let dragging: boolean = false;

  const handleFileUpload = (file: File | null | undefined) => {
    if (file === null || file === undefined) {
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = (event) => {
      if (event.target === null) {
        return;
      }
      const image = new Image();
      image.onload = () => dispatcher("imageLoad", image);
      if (typeof event.target.result === "string") {
        image.src = event.target.result;
      }
    };
    fileReader.readAsDataURL(file);
  };
</script>

<div class="file-uploader">
  <label
    for={id}
    x-dragging={dragging}
    on:dragenter|preventDefault={() => (dragging = true)}
    on:dragleave|preventDefault={() => (dragging = false)}
    on:dragover|preventDefault={() => {}}
    on:drop|preventDefault|stopPropagation={(event) =>
      handleFileUpload(event.dataTransfer?.files.item(0))}
  >
    <input
      type="file"
      name="imgFile"
      {id}
      on:change|preventDefault={({ currentTarget }) =>
        handleFileUpload(currentTarget.files?.item(0))}
    />
  </label>
</div>

<style lang="scss">
  @import "../stylesheets/common";

  .file-uploader {
    @extend .fill-width;
    @extend .fill-height;
    position: relative;
    box-sizing: border-box;
    &::after {
      $border-width: 3px;
      $padding-size: 15px;
      $round-size: 5px;
      content: "";
      display: block;
      position: absolute;
      z-index: -1;
      top: $padding-size;
      left: $padding-size;
      width: calc(100% - calc(calc(#{$border-width} + #{$padding-size}) * 2));
      height: calc(100% - calc(calc(#{$border-width} + #{$padding-size}) * 2));
      border: $border-width dashed rgba(0, 0, 0, 20%);
      border-radius: $round-size;
    }
  }
  label {
    @extend .fill-width;
    @extend .fill-height;
    @extend .flex__center_vertical;
    justify-content: center;

    user-select: none;
    transition: all 150ms;
    &::after {
      content: "クリックまたはファイルドラッグで画像を開く";
    }
    &:hover {
      background-color: rgba(64, 128, 255, 0.3);
    }
    &[x-dragging="true"] {
      background-color: rgba(64, 255, 121, 0.3);
      &::after {
        content: "ドラッグされた画像を開く";
      }
    }
    input {
      display: none;
    }
  }
</style>
