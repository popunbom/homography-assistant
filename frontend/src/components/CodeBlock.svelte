<script lang="ts">
  import { afterUpdate, onMount } from "svelte";
  import CodeMirror from "codemirror";

  import "codemirror/lib/codemirror.css";
  import "codemirror/theme/idea.css";
  import "codemirror/mode/javascript/javascript";

  export let code: string;
  let codeBlockDom: HTMLDivElement;
  let editor: CodeMirror.Editor;

  onMount(() => {
    editor = CodeMirror(codeBlockDom, {
      value: code,
      lineNumbers: true,
      lineWrapping: true,
      mode: {
        name: "javascript",
        json: true,
      },
      theme: "idea",
    });
  });
  afterUpdate(() => {
    editor.setValue(code);
  });
</script>

<div class="code" bind:this={codeBlockDom} />

<style lang="scss">
  :global(.CodeMirror) {
    font-family: "Source Code Pro", monospace !important;
    height: 100% !important;
  }
  .code {
    height: 100%;
  }
</style>
