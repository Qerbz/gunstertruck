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
      <div style={`z-index: 99; width: 10%; height: 10%;position: absolute; top: ${y}px; left: ${x}px; background-color: white; border-radius: white;`} />
    {/if}
</div>

<style>
    .circle-container {
      position: absolute;
      width: 15vh;
      height: 15vh;
      overflow: hidden;
      z-index: 99;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  
    .circle {
        width: 0;
        height: 0;
        background-color: white;
        border-radius: 50%;
        animation: expandCircle 2s forwards;
    }
  
    @keyframes expandCircle {
      to {
        opacity: 0;
        width: 100%;
        height: 100%;
      }
    }
  </style>
