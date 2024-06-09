<script>
    import { onMount } from "svelte";
    export let number;
    let nodeRef;
  
    onMount(() => {
      setTimeout(() => {
        // Remove the component
        nodeRef.parentNode.removeChild(nodeRef);
      }, 1500);
    });
  

  </script>

  <div bind:this={nodeRef} class="popup">
    <p>+ ${Math.round(number*10)/10}</p>
  </div>
  
  
  <style>
    .popup {
      position: absolute;
      top: 10vh;
      left: 45vw;
      border: 1px solid #000000;
      background: linear-gradient(to bottom, var(--foam) 0%, var(--foam) 4%, var(--guinness) 5%, var(--guinness) 45%, var(--monster) 55%, var(--monster) 100%);
      color: white;
      font-size: 250%;
      padding: 0px 10px 0px 10px;
      border-radius: 5px;
      z-index: 9999;
    }
  </style>
  