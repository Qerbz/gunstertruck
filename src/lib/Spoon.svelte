<script>
    export let x;
    export let y;
    export let rotation;
</script>

<div class="position" style={`top: ${y}px; left: ${x}px; transform: rotate(${rotation-  50}deg);`} on:click>
</div>

<style>
    div {
        width: 5vw;
        height: 15vh;
        z-index: 102;
        background-image: url("Spoon_Clipart.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }
</style>
