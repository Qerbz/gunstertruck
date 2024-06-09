<script>
    import { folgereStore } from "$lib/folgere.js";
    import endscreenCities from "$lib/endscreenCities.json";
    import { onMount } from "svelte";
    import CityRadarDot from "$lib/CityRadarDot.svelte";

    let politiElement;
    let interval, interval2;
    let counterElement;
    let folgereTall = 0;
    let mapElement;
    let playAgainElement;
    let sluttbeskjed = "Du spredte nesten Gunster til hele verden, vil du prøve på nytt?"


    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;

    $: horizontal_ratio = windowWidth / 1280;
    $: vertical_ratio = windowHeight / 720;

    onMount(() => {
        setTimeout(() => {
            startCounter();
        }, 3000);
    });


    function startCounter() {
        counterElement.classList.add("fadeIn");
        let folgerePlussTall = 1;

        if (Math.abs($folgereStore) > 100) folgerePlussTall = Math.round($folgereStore * 0.005);

        if ($folgereStore < 0) {
            folgerePlussTall = -folgerePlussTall;
        } 

        interval = setInterval(() => {
            folgereTall = folgereTall + folgerePlussTall;

            if (folgereTall > $folgereStore && $folgereStore > 0) {
                folgereTall = Math.round($folgereStore);
                clearInterval(interval);
                fadeToWorldMap();
            } else if (folgereTall < $folgereStore && $folgereStore < 0) {
                folgereTall = Math.round($folgereStore);
                clearInterval(interval);
                sluttbeskjed = "Du gjorde mer skade enn godt for Gunster. Tenk på det...";
                fadeToPlayAgain();
            } else if (Math.round($folgereStore) === 0) {
                folgereTall = Math.round($folgereStore);
                clearInterval(interval);
                sluttbeskjed = "Du oppnådde ingenting.";
                fadeToPlayAgain();
            }
        }, 10);
    }

    function fadeToWorldMap() {
        setTimeout(() => {
            mapElement.classList.add("fadeIn");
            displayWorldReach();
        }, 2000);
    }

    function fadeToPlayAgain() {
        setTimeout(() => {
            playAgainElement.classList.add("fadeIn");
        }, 2000);
    }

    function displayWorldReach() {
        setTimeout(() => { null; }, 2000);

        const followerGoal = 10000000;

        if (folgereTall >= followerGoal) sluttbeskjed = "Du spredte Gunster til hele verden! Gratulerer, du er en sann ambassadør!";

        let cities = Object.keys(endscreenCities);

        for (let i = 0; i < cities.length; i++) {
            if (folgereTall >= endscreenCities[cities[i]].goal) {
                setTimeout(() => {
                    new CityRadarDot({
                        props: {
                            x: endscreenCities[cities[i]].x * horizontal_ratio - 7,
                            y: endscreenCities[cities[i]].y * vertical_ratio - 6
                        },
                        target: document.body
                    });
                }, 400 * (i + 1));
            } else {
                setTimeout(() => {
                    fadeToPlayAgain();
                }, 400 * (i + 1));
                break;
            }

            
            if (i === cities.length - 1) {
                setTimeout(() => {
                        fadeToPlayAgain();
                    }, 400 * (i + 1));
                    break;
            }
        }
    }

</script>

<svelte:window on:resize={() => {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    }}
/>

<div bind:this={politiElement} class="position" id="a">
    <div>
    <h2>Politiet stoppet Gunster Trucken din, men...</h2>
    </div>
</div>

<div bind:this={counterElement} class="position" id="b">
    <div>
    <h3>Takket være deg er det: </h3>
    <h2>Gunster Følgere i Verden</h2>
    </div>
    <div>
    <h1>{folgereTall}</h1>
    </div>
</div>

<div class="position" id="verdenskartet" bind:this={mapElement} />

<div bind:this={playAgainElement} class="position" id="playAgain">
    <div>
        <h2>{sluttbeskjed}</h2>
        <button on:click={() => window.location.reload()}>Spill en gang til</button>
    </div>
</div>

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

       /* Define the keyframes */
       @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    
    :global(.fader) {
        animation: fadeOut 2s forwards;
    }

    :global(.fadeIn) {
        animation: fadeIn 2s forwards;
    }

    #a {
        top: 0px;
        left: 0px;
        width: 100vw;
        height: 100vh;
        background-color: var(--guinness);
        color: white;
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;
        text-align:center;
        z-index: 1;
    }

    #b {
        top: 0px;
        left: 0px;
        width: 100vw;
        height: 100vh;
        background-color: lightgreen;
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;
        text-align:center;
        opacity: 0;
        z-index: 2;
    }

    #verdenskartet {
        background-image: url("/verdenskartet.jpg");
        background-size: 100vw 100vh;
        background-repeat: no-repeat;
        width: 100vw;
        height: 100vw;
        top: 0px;
        left: 0px;
        opacity: 0;
        z-index: 3;
    }

    #playAgain {
        top: 0px;
        left: 0px;
        width: 100vw;
        height: 100vh;
        background-color: var(--monster);
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;
        text-align:center;
        z-index: 4;
        opacity: 0;
    }
</style>