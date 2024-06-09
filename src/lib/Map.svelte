<script>
    import ButtonOverlay from "$lib/ButtonOverlay.svelte";
    import Politi from "$lib/Politi.svelte";
    import json from "$lib/locs.json";

    export let lokasjon;
    export let site;
    export let user;

    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    
    $: horizontal_ratio = windowWidth / 640;
    $: vertical_ratio = windowHeight / 360;
</script>

<svelte:window on:resize={() => {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    }}
/>

<div id="a"></div>
{#each Object.keys(json) as key}
<ButtonOverlay 
start_x = {json[key].location.from_x * horizontal_ratio} 
start_y = {json[key].location.from_y * vertical_ratio} 
end_x = {json[key].location.to_x * horizontal_ratio} 
end_y = {json[key].location.to_y * vertical_ratio}
on:click={() => {
    if (key !== "glenn_ronny_trucking") {lokasjon = key; site = 2;}
    else {
        site = 5;
    }
}}
/>
{/each}

{#if user.reklameskilt}
    <div class="reklame" style="
        top: 40vh;
        left: 50vw;"/>
    <div class="reklame" style="
        top: 80vh;
        left: 80vw;"/>
{/if}

<style>
    #a {
        background-image: url("/nordjaeren.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        width: 100vw;
        height: 100vh;
    }
    .reklame {
        background-image: url("/reklame.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        width: 15vw;
        height: 5vh;
        position: absolute;
        z-index: 2;
    }
</style>