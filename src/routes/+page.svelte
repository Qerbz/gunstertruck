<script>
    import WelcomePage from "$lib/WelcomePage.svelte";
    import InsideGunsturTruck from "$lib/InsideGunsturTruck.svelte";
    import Map from "$lib/Map.svelte"
    import Store from "$lib/Store.svelte"
    import Money from "$lib/Money.svelte";
    import Folgere from "$lib/Folgere.svelte";
    import Politi from "$lib/Politi.svelte";
    import EndScreen from "$lib/EndScreen.svelte";
    import { politiStore } from "$lib/politi.js";
    import { folgereStore } from "$lib/folgere.js";

    let site = 0;
    let lokasjon = "piren_pub";
    let user = {
        cash: 10000,
        kamuflasje: false, // implemented
        reklameskilt: false, // implemented
        kurs: false, // implemented
        decoyvan: 0, // implemented
        gunstermaskin: false, // implemented
        ekstrabokser: false, // implemented
        guideline: false, 
        liv: 1,
    };

    function checkPoliceScore(score) {
        if (score > 100) {
            politiStore.set(0);
            user.liv -= 1
        }
        if (user.liv === 0) site = 6;
    }

    $: checkPoliceScore($politiStore);
    $: {
        if ($folgereStore >= 10000000) {
            site = 6;
        }
    }
</script>

{#if ![0, 1, 6].includes(site) }
<div id="sitebar">
    <button style="padding:10px;" on:click={() => (site = 2)}>Gunster Truck</button>
    <button style="padding:10px;"on:click={() => (site = 3)}>Kart</button>
</div>

<Money bind:user/>
<Folgere />
<Politi />
{/if}

{#if site === 0}
    <div class="position" id="zeroPage" on:click={() => site = 1}><h1>Click anywhere to play</h1></div>
{:else if site === 1}
    <WelcomePage bind:site />
{:else if site === 2}
    <InsideGunsturTruck {lokasjon} bind:user />
{:else if site === 3}
    <Map bind:lokasjon bind:site {user}/>
{:else if site === 5}
    <Store bind:user {lokasjon} />
{:else if site === 6}
    <EndScreen />
{/if}

<style>
    :global(:root) {
        --monster: #22cf00;
        --guinness: #2B0101;
        --foam: #F1E5AC;
    }
    :global(body) {
        margin: 0;
        overflow: hidden;
        position: relative;
    }
    :global(.position) {
        position: absolute;
    }
    #sitebar {
        position: absolute;
        top: 0px;
        left: 0px;
        z-index: 999;
    } 
    #zeroPage {
        top: 0px; 
        left: 0px; 
        width: 100vw; 
        height: 100vh; 
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: white;
    }
</style>
