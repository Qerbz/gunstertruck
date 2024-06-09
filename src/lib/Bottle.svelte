<script>
    export let x;
    export let y;
    export let rotation;
    export let monster;
    export let guinness;
</script>

<div on:click id="a" class="position" style={`top: ${y}px; left: ${x}px; transform: rotate(${-rotation}deg);`}>
    {#if monster}
        <div id="monster"></div>
    {:else if guinness}
    <div id="guinness"></div>
    {/if}
</div>

<style>
    #a {
        height: 20vh;
        width: 15vw;
        z-index: 99;
    }
    #monster {
        background-image: url("/Monster_Nitro.webp");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        z-index: 100;
        width: 100%;
        height: 100%;
    }
    #guinness {
        
        background-image: url("/guinness.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        z-index: 100;
        width: 100%;
        height: 100%;
    }
</style>
