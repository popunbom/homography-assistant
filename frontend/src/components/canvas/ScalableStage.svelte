<script lang="ts" context="module">
  export type LayerChildType = Konva.Group | Konva.Shape;
</script>

<script lang="ts">
  import { onMount, createEventDispatcher, afterUpdate } from "svelte";

  import Konva from "konva";
  import type { ScalableStageConfig } from "../../utils/configs";

  // Fixed values
  const scrollScale: number = 1.2;
  const dispatch = createEventDispatcher<{ scalling: Konva.Vector2d }>();

  // References
  let selfDom: HTMLDivElement;

  // Props
  export let stage: Konva.Stage;
  export let layer: Konva.Layer;
  export let config: ScalableStageConfig;
  export let childs: LayerChildType[];

  const cursorCenteredScaling = (wheelDelta: number, scrollScale: number) => {
    const current = {
      scale: stage.scaleX(),
      cursor: stage.getPointerPosition(),
      position: stage.position(),
    };

    const pointerPosTo = {
      x: current.cursor.x / current.scale - current.position.x / current.scale,
      y: current.cursor.y / current.scale - current.position.y / current.scale,
    };

    const newScale =
      wheelDelta > 0
        ? current.scale * scrollScale
        : current.scale / scrollScale;

    stage.scale({ x: newScale, y: newScale });

    const newPointerPos = stage.getPointerPosition();
    const newPos = {
      x: -(pointerPosTo.x - newPointerPos.x / newScale) * newScale,
      y: -(pointerPosTo.y - newPointerPos.y / newScale) * newScale,
    };

    stage.position(newPos);
  };

  const handleWindowResize: svelte.JSX.UIEventHandler<Window> = () => {
    dispatch("scalling", stage.scale());
    stage.setSize({
      width: selfDom.parentElement.clientWidth,
      height: selfDom.parentElement.clientHeight,
    });
  };

  const handleWheel: svelte.JSX.WheelEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    cursorCenteredScaling(event.deltaY, scrollScale);
    dispatch("scalling", stage.scale());
  };

  const updateKonva = () => {
    layer.removeChildren();
    childs.forEach((child) => layer.add(child));
    stage.add(layer);
  };

  onMount(async () => {
    stage = new Konva.Stage({
      container: selfDom,
      ...config,
    });
    layer = new Konva.Layer({ draggable: true });
    updateKonva();
  });
  afterUpdate(updateKonva);
</script>

<div
  class="konva-stage"
  on:wheel={handleWheel}
  style="width: {config.width}px; height: {config.height}px;"
  bind:this={selfDom}
/>

<svelte:window on:resize={handleWindowResize} />
