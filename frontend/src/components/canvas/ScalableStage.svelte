<script lang="ts" context="module">
  export type LayerChildType = Konva.Image | Point;
</script>

<script lang="ts">
  import { onMount, createEventDispatcher, afterUpdate, tick } from "svelte";

  import Konva from "konva";

  import type { Point } from "src/entities/Point";
  import type { ScalableStageConfig } from "../../utils/configs";

  // Fixed values
  const scrollScale: number = 1.2;
  const dispatch = createEventDispatcher<{ scalling: Konva.Vector2d }>();

  // References
  let selfDom: HTMLDivElement;
  let scrolled = false;

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

    if (current.cursor === null) {
      return;
    }

    const pointerPosTo = {
      x: current.cursor.x / current.scale - current.position.x / current.scale,
      y: current.cursor.y / current.scale - current.position.y / current.scale,
    };

    const newScale =
      wheelDelta > 0
        ? current.scale * scrollScale
        : current.scale / scrollScale;

    stage.scale({ x: newScale, y: newScale });

    const newPointerPos = stage.getPointerPosition() || current.position;
    const newPos = {
      x: -(pointerPosTo.x - newPointerPos.x / newScale) * newScale,
      y: -(pointerPosTo.y - newPointerPos.y / newScale) * newScale,
    };

    stage.position(newPos);
    scrolled = true;
  };

  const handleWindowResize: svelte.JSX.UIEventHandler<Window> = () => {
    if (selfDom.parentElement === null) {
      return;
    }
    stage.setSize({
      width: selfDom.parentElement.clientWidth,
      height: selfDom.parentElement.clientHeight,
    });
    dispatch("scalling", stage.scale());
  };

  const handleWheel: svelte.JSX.WheelEventHandler<HTMLDivElement> = (event) => {
    cursorCenteredScaling(event.deltaY, scrollScale);
    dispatch("scalling", stage.scale());
  };

  const updateLayer = (_children: LayerChildType[]) => {
    console.debug("updateLayer");
    layer.removeChildren();
    _children.forEach((child) =>
      layer.add(child instanceof Konva.Image ? child : child.kGroup),
    );
    layer.draw();
  };

  const updateConfig = (_config: ScalableStageConfig) => {
    console.debug("updateConfig");
    stage.size({ width: _config.width, height: _config.height });
    if (!scrolled) {
      // scale の更新は「ウィンドウサイズの変更」または「画像がセット」された時のみ実行
      // 一度でもスクロールされた後は scale を更新しない
      // scale を更新すると、点を設置した際に画像位置がズレる
      stage.scale(_config.scale);
    }
  };

  $: if (layer !== undefined) updateLayer(childs);
  $: if (config !== undefined && stage !== undefined) updateConfig(config);

  onMount(async () => {
    console.debug("onMount");
    layer = new Konva.Layer({ draggable: true });
    updateLayer(childs);
    stage = new Konva.Stage({
      container: selfDom,
      ...config,
    });
    stage.add(layer);
    updateConfig(config);
  });
</script>

<div
  class="konva-stage"
  on:wheel|preventDefault={handleWheel}
  style={`width: ${config.width}px; height: ${config.height}px;`}
  bind:this={selfDom}
/>

<svelte:window on:resize={handleWindowResize} />
