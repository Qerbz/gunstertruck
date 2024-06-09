<script>
    import ButtonOverlay from "$lib/ButtonOverlay.svelte";
    import json from "$lib/glennronny.json";
    import Audio from "$lib/Audio.svelte";

    export let user;
    let lokasjon = "glenn_ronny_trucking";

    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    
    $: horizontal_ratio = windowWidth / 640;
    $: vertical_ratio = windowHeight / 360;
    let kundeSomFaarServert = 0;
</script>

<svelte:window on:resize={() => {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    }}
/>

<div id="a"></div>
{#each Object.keys(json) as key}
{#if !user[key] || key === "decoyvan"}
<ButtonOverlay 
start_x = {json[key].location.from_x * horizontal_ratio} 
start_y = {json[key].location.from_y * vertical_ratio} 
end_x = {json[key].location.to_x * horizontal_ratio} 
end_y = {json[key].location.to_y * vertical_ratio}
on:click={() => {
    let price = json[key].price;
    if ( key === "decoyvan" ) {
        price *= 7**user["decoyvan"];
    }
    if (user.cash >= price){
        if (confirm(
            json[key].beskrivelse + `
            
"Ja, vil du kjøba denne? Den koste `+price+`kr. For et røverkjøp!"`

        )){
            
            if (key === "decoyvan") {
                user.cash -= price;
                user.liv += 1;
                user["decoyvan"] += 1
            }
            else{
                user.cash -= price;
                user[key] = true;   
            }
        }
    }
    else{
        
        alert(json[key].beskrivelse+`

"Du har kje nok penger, lillegutt. Du trenge `+price +`kr for å kjøba denne.."`);
    }
}}
/>
{/if}
{/each}
<Audio {lokasjon} {kundeSomFaarServert}></Audio>
<style>
    #a {
        background-image: url("/glennronny.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        width: 100vw;
        height: 100vh;
    }
</style>