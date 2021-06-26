<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatcher = createEventDispatcher<{ imageLoad: HTMLImageElement }>();

  let dragging: boolean = false;

  const handleFileUpload = (file: File) => {
    const fileReader = new FileReader();

    fileReader.onload = (event) => {
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
    for="imgFile"
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
      id="imgFile"
      on:change|preventDefault={({ currentTarget }) =>
        handleFileUpload(currentTarget.files?.item(0))}
    />
  </label>
</div>

<style lang="scss">
  .fill {
    width: 100%;
    height: 100%;
  }
  .file-uploader {
    @extend .fill;
    border: 2px solid red;
  }
  label {
    @extend .fill;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
    transition-property: all;
    transition: 0.1s;
    &::after {
      content: "画像を開く";
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
