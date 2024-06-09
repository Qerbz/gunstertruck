<script>
    import { onMount } from "svelte";
  
    let number = 0;
  
    onMount(() => {
      setTimeout(() => {
        // Remove the component
        document.body.removeChild($$.ctx.component);
      }, 500);
    });
  
    export let value;
    
    $: number = value.toFixed(1);
  </script>
  
  <div class="popup">
    <p>{number}</p>
  </div>
  
  <style>
    .popup {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #ffffff;
      border: 1px solid #000000;
      padding: 10px;
      border-radius: 5px;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
    }
  </style>
  