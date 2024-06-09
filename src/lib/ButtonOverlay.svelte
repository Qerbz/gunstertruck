<script>
    export let start_x;
    export let start_y;
    export let end_x;
    export let end_y;
</script>

<button on:click style="position: absolute; top: {start_y}px; left:{start_x}px; width: {end_x-start_x}px; height: {end_y-start_y}px; "></button>

<style>
    button {
        cursor: pointer;
        background-color: transparent;
    }
    button:hover {
        border: 3px solid black;
    }
</style>
