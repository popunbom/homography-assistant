<div class="draggable-list" bind:this={sortableList}>
  {#each $points as point, i (point.id)}
    <div class="draggable-item">
      <svg class="icon-hamburger" viewBox="0 0 80 80">
        <rect width="80" height="20" y="15"></rect>
        <rect width="80" height="20" y="45"></rect>
      </svg>
      <div
        class="circle"
        style={`background-color: ${pickColor(point.id).bg}; color: ${pickColor(point.id).fg}`}
      >{point.id}</div>
      <div>({point.pos.x}, {point.pos.y})</div>
      <svg class="icon-cross" viewBox="0 0 80 80" on:click={handleRemove(i)}>
        <circle cx="40" cy="40" r="40"></circle>
        <rect width="40" height="12" transform="rotate(45) translate(36, -6) "></rect>
        <rect width="40" height="12" transform="rotate(-45) translate(-20, 50) "></rect>
      </svg>
    </div>
  {/each}
</div>

<script lang="ts">
import { onMount, createEventDispatcher } from 'svelte';
import Sortable from "sortablejs";

import { points } from "../stores/points";
import { pickColor } from "../utils/colors";

const dispatch = createEventDispatcher<{changed: void}>();

const handleSwap = (indexFrom: number, indexTo: number) => {
  // Change order of items
  points.update(
    points => {
      points.splice(indexTo, 0, ...points.splice(indexFrom, 1));
      return points;
    }
  );
  dispatch("changed");
}
const handleRemove = (index: number) => (() => {
  points.update(
    points => {
      points.splice(index, 1)
      return points
    }
  );
  dispatch("changed");
});

let sortableList: HTMLDivElement;
onMount(() => {
  Sortable.create(sortableList, {
    animation: 150,
    handle: ".icon-hamburger",
    ghostClass: 'blue-background-class',
    onEnd: (event) => handleSwap(event.oldIndex, event.newIndex),
  });
})

</script>

<style lang="scss">
.draggable-list {
  margin: 8px;
  // padding: 16px;
  width: 300px;
  // border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 8px 8px 8px rgba(0, 0, 0, 0.4);
}
.draggable-item {
  position: relative;
  padding: 8px;
  margin: -2px 0px;
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
  fill:rgba(0, 0, 0, 0.15);
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
    &:hover {
      fill: hsl(0, 100%, 40%);
    }
    &:active {
      fill: hsl(0, 100%, 30%);
    }
  }
}
</style>
