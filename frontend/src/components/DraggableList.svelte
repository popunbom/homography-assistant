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
  * {
    font-family: monospace;
  }
  .draggable-list {
    width: 100%;
    height: 100%;
    overflow: scroll;
  }
  .draggable-item {
    position: relative;
    padding: 8px;
    display: flex;
    align-items: center;
    &:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }
  }
  .circle {
    width: 1.5em;
    height: 1.5em;
    border: 2px solid black;
    border-radius: 50%;
    margin-right: 0.5em;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .icon-hamburger {
    width: 15px;
    fill: rgba(0, 0, 0, 0.15);
    margin-right: 8px;
    cursor: grab;
    &:active {
      cursor: grabbing;
    }
  }
  .icon-cross {
    // border: 1px solid red;
    position: absolute;
    right: 10px;
    width: 20px;
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
