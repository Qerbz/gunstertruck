<script>
    import { onMount } from "svelte";
    export let x;
    export let y;

    let el;
    let animate = false;

    onMount(() => {
    // Trigger the animation when the component mounts
    animate = true;
    //setTimeout(() => {el.classList.add("fade")}, 100);
    });
</script>

<div class="circle-container" style={`top: ${y}px; left: ${x}px`}>
    {#if animate}
      <div bind:this={el} class="circle"></div>
    {/if}
</div>

<style>
    .circle-container {
      position: absolute;
      width: 5vh;
      height: 5vh;
      overflow: hidden;
      z-index: 99;
    }
  
    .circle {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 0;
        height: 0;
        background-color: white;
        border-radius: 50%;
        animation: expandCircle 1s forwards;
    }
  
    @keyframes expandCircle {
      to {
        opacity: 0;
        width: 100%;
        height: 100%;
      }
    }
  </style>
