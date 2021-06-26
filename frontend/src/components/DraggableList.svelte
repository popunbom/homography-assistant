<div class="draggable-list" bind:this={sortableList}>
  {#each $pointConfigs as point (point.id)}
    <div class="draggable-item">
      <div class="hamburger"></div>
      <div
        class="circle"
        style={`background-color: ${point.color.bg}; color: ${point.color.fg}`}
      >{point.id}</div>
      <div>({point.pos.x}, {point.pos.y})</div>
    </div>
  {/each}
</div>

<script lang="ts">
import { onMount, createEventDispatcher } from 'svelte';
import Sortable from "sortablejs";

import { points, pointConfigs } from "../stores/points";

const dispatch = createEventDispatcher<{changed: void}>();

let sortableList: HTMLDivElement

onMount(() => {
  Sortable.create(sortableList, {
    animation: 150,
    handle: ".hamburger",
    ghostClass: 'blue-background-class',
    onEnd: (evt) => {
      // Change order of items
      $points.splice(evt.newIndex, 0, ...$points.splice(evt.oldIndex, 1))
      dispatch("changed")
    }
  });
})

</script>

<style lang="scss">
.draggable-list {
  margin: 8px;
  padding: 16px;
  width: 300px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 8px 8px 8px rgba(0, 0, 0, 0.4);
}
.draggable-item {
  border: 2px solid rgba(0, 0, 0, 0.2);
  padding: 8px;
  margin: -2px 0px;
  display: flex;
  align-items: center;
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
.hamburger {
  width: 17px;
  height: 4px;
  color: rgba(0,0,0, 10%);
  background: currentColor;
  position: relative;
  margin-right: 8px;
  cursor: grab;
  &:before {
    content: "";
    position: absolute;
    top: -6px;
    width:  100%;
    height: 100%;
    background: currentColor;
  }
  &:after {
    content: "";
    position: absolute;
    top: 6px;
    width:  100%;
    height: 100%;
    background: currentColor;
  }
}
</style>
