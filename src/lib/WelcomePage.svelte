<script>
    import { onMount } from "svelte"
    export let site;

    let divElement;

    function startGame() {

        divElement.classList.add("fader");

        setTimeout(() => site = 2, 2000);
    }
    let audio;

    onMount(() => {
        audio.play();
    });
</script>

<div bind:this={divElement} id="a"><div id="b"><h1>GUNSTERTRUCK</h1><br/><button on:click={startGame}>EXPERIENCE</button></div></div>
<audio loop bind:this={audio} src="/sound/gunster_theme.m4a" />

<style>
    /* Define the keyframes */
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }

    #a {
        width: 100vw;
        height: 100vh;
        background: linear-gradient(to bottom, var(--foam) 0%, var(--foam) 4%, var(--guinness) 5%, var(--guinness) 45%, var(--monster) 55%, var(--monster) 100%);
        position: relative;
    }

    :global(.fader) {
        animation: fadeOut 2s forwards;
    }

    #b {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    h1 {
        color: white;
    }

    button {
        width: 70%;
    }
    :global(body) {
        background-color: black;
    }
</style>