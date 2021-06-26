<script lang="ts">
  import AppBar from "./components/AppBar.svelte";
  import FileUploader from "./components/FileUploader.svelte";
</script>

<div id="app">
  <AppBar />
  <main>
    <div class="wrapper">
      <FileUploader on:imageLoad={({ detail }) => console.log(detail)} />
    </div>
  </main>
</div>

<style lang="scss">
  main {
    padding: 16px;
  }

  .wrapper {
    width: 600px;
    height: 300px;
  }
</style>
