<script lang="ts">
  import { onMount, createEventDispatcher } from "svelte";
  import Sortable from "sortablejs";

  import type { Point } from "../entities/Point";
  import { getPos } from "../entities/Point";

  const dispatch = createEventDispatcher<{ changed: void }>();

  export let points: Point[];
  const handleSwap = (
    indexFrom: number | undefined,
    indexTo: number | undefined,
  ) => {
    // Change order of items
    if (indexFrom !== undefined && indexTo !== undefined) {
      points.splice(indexTo, 0, ...points.splice(indexFrom, 1));
      points = Array(...points);
      dispatch("changed");
    }
  };
  const handleRemove = (index: number) => () => {
    points.splice(index, 1);
    points = Array(...points);
    dispatch("changed");
  };

  let sortableList: HTMLDivElement;
  onMount(() => {
    Sortable.create(sortableList, {
      animation: 150,
      handle: ".icon-hamburger",
      ghostClass: "blue-background-class",
      onEnd: (event) => handleSwap(event.oldIndex, event.newIndex),
    });
  });
</script>

<div class="draggable-list" bind:this={sortableList}>
  {#each points as point, i (point.pointNumber)}
    <div class="draggable-item">
      <svg class="icon-hamburger" viewBox="0 0 80 80">
        <rect width="80" height="20" y="15" />
        <rect width="80" height="20" y="45" />
      </svg>
      <div
        class="circle"
        style={`background-color: ${point.color.bg}; color: ${point.color.fg}`}
      >
        {point.pointNumber}
      </div>
      <div class="coordinate">
        ({Math.round(getPos(point).x)}, {Math.round(getPos(point).y)})
      </div>
      <svg class="icon-cross" viewBox="0 0 80 80" on:click={handleRemove(i)}>
        <circle cx="40" cy="40" r="40" />
        <rect
          width="40"
          height="12"
          transform="rotate(45) translate(36, -6) "
        />
        <rect
          width="40"
          height="12"
          transform="rotate(-45) translate(-20, 50) "
        />
      </svg>
    </div>
  {/each}
</div>

<style lang="scss">
  @import "../stylesheets/common";

  $circle_radius: 2em;
  $icon_size: calc(#{$circle_radius} * 0.7);

  * {
    font-family: monospace;
  }
  .draggable-list {
    @extend .fill-width;
    @extend .fill-height;
    overflow: scroll;
  }
  .draggable-item {
    @extend .flex__center_vertical;
    position: relative;
    padding: 8px;
    &:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }
  }
  .circle {
    @extend .flex__center_vertical;
    justify-content: center;
    width: $circle_radius;
    height: $circle_radius;
    font-size: calc(#{$circle_radius} * 0.5);
    border: 2px solid black;
    border-radius: 50%;
    margin-right: 8px;
  }
  .icon-hamburger {
    width: $icon_size;
    fill: rgba(0, 0, 0, 0.15);
    margin-right: 8px;
    cursor: grab;
    &:active {
      cursor: grabbing;
    }
  }
  .icon-cross {
    position: absolute;
    right: 8px;
    width: $icon_size;
    fill: #fafafa;
    margin-right: 8px;
    cursor: pointer;
    & > circle {
      fill: rgba(0, 0, 0, 0.2);
    }
    &:hover {
      & > circle {
        fill: hsl(0, 100%, 40%);
      }
    }
    &:active {
      & > circle {
        fill: hsl(0, 100%, 30%);
      }
    }
  }
</style>
