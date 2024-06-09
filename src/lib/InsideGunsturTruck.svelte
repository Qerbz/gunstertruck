<script>
    import Spoon from "$lib/Spoon.svelte";
    import Glass from "$lib/Glass.svelte";
    import Bottle from "$lib/Bottle.svelte";
    import Customer from "$lib/Customer.svelte";
    import CustomerLine from "$lib/CustomerLine.svelte";
    import KundeSomGaar from "$lib/KundeSomGaar.svelte";
    import json from "$lib/locs.json";
    import evaluateGunsterParts from "$lib/GunsterQuality.js";
    import { politiStore } from "$lib/politi.js";
    import { folgereStore } from "./folgere";
    import Audio from "$lib/Audio.svelte";
    import { onMount } from "svelte";
    
    export let user;
    export let lokasjon;

    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;

    $: glassX = windowWidth / 2.9;
    $: glassY = windowHeight / 1.62;

    let start = new Date()

    let monsterIsPouring = false;
    let monsterX, monsterY, monsterRotation;
    setMonsterCoords()
    $: windowWidth, windowHeight, monsterIsPouring, setMonsterCoords();

    function setMonsterCoords() {
        if (monsterIsPouring) {
            monsterX = windowWidth / 4;
            monsterY = windowHeight / 2.3;
        } else {
            monsterX = windowWidth / 1.8;
            monsterY = windowHeight / 1.7;
            monsterRotation = 0;
        }
    }

    let guinnessIsPouring = false;
    let guinnessX, guinnessY, guinnessRotation;
    setguinnessCoords()
    $: windowWidth, windowHeight, guinnessIsPouring, setguinnessCoords();

    function setguinnessCoords() {
        if (guinnessIsPouring) {
            guinnessX = windowWidth / 4;
            guinnessY = windowHeight / 2.3;
        } else {
            guinnessX = windowWidth / 1.5;
            guinnessY = windowHeight / 1.7;
            guinnessRotation = 0;
        }
    }
    
    let spoonIsHeld = false;
    let spoonX, spoonY, spoonRotation = 0;
    setSpoonCoords();
    $: windowWidth, windowHeight, spoonIsHeld, setSpoonCoords();

    function setSpoonCoords() {
        if (spoonIsHeld) {
            spoonX = windowWidth / 2.4;
            spoonY = windowHeight / 2;
        } else {
            spoonX = windowWidth / 2;
            spoonY = windowHeight / 1.5;
        }
    }

    let kunderIKoe = [];
    let kundeSomFaarServert = null;
    let kundeSomGaar = [];

    function setKundeSomFaarServert(kunde) {
        kundeSomFaarServert = {...kunde};
        kundeSomFaarServert.x = windowWidth / 4.5;
        kundeSomFaarServert.y = windowHeight / 45;
        kundeSomFaarServert.status = "gunstertime";
    }

    function newCustomer() {
        const population = json[lokasjon].population;
        const karakterer = Object.keys(population);

        let karakterSjanser = [];

        for (let i = 0; i < karakterer.length; i++) {
            karakterSjanser.push({});
            karakterSjanser[i].karakter = karakterer[i];
            if (i === 0) {
                karakterSjanser[i].start = 0;
            } else {
                karakterSjanser[i].start = karakterSjanser[i-1].slutt;
            }

            karakterSjanser[i].slutt = karakterSjanser[i].start + population[karakterer[i]];
        }

        let randomNumber = Math.random();
        let ettersokelse, penger;
        let valgtKarakter = karakterSjanser.find((sjanse) =>  sjanse.start < randomNumber && sjanse.slutt > randomNumber);
        if (valgtKarakter.karakter === "old_drunkard") {
            ettersokelse = 0.7;
            penger = -0.5;
        } else if (valgtKarakter.karakter === "baddie") {
            ettersokelse = 1;
            penger = 0.5;
        } else {
            ettersokelse = 1.6;
            penger = 2;
        }

        return {
            customer_type: valgtKarakter.karakter,
            ettersokelse: ettersokelse,
            x: null,
            y: null,
            penger: penger,
            status: "queue",
            done: false,
        };
    }

    let gunsterParts = [];

    let keys = {
        "w": false,
        "s": false,
        "ArrowUp": false,
        "ArrowDown": false,
        "ArrowLeft": false,
        "ArrowRight": false
    }

    let handleKeyUp = (event) => keys[event.key] = false;
    let handleKeyDown = (event) => keys[event.key] = true;
    const mixDifficulty = 10;



    class GunsterPart{ 

        constructor(type, startingY){
            this.type = type;
            this.startingY = startingY;
            this.y = 0;
        }
        
        fill (spoonY, rate) {
            this.y += (user.ekstrabokser + 1) * rate;
        }             
    }

    let customerCount = 0
    let lastCustomerCount = customerCount;
    const newCustomerCountdown = setInterval(() => customerCount++, json[lokasjon].specs.new_customer_rate * 1000 * 10 );
    let startingY = 0;
    function gameLoop() {
        // Physics
        let top;
        if (gunsterParts.length){
            top = gunsterParts[gunsterParts.length-1];
            if (top.type === "guinness") {
                if (Math.sin(rad(guinnessRotation)) < -0.1 && guinnessIsPouring){
                    top.fill(spoonY, (1 - Math.cos(rad(guinnessRotation)))/5);
                }
                else if (Math.sin(rad(monsterRotation)) < -0.1 && monsterIsPouring) {
                    startingY += top.y;
                    top = new GunsterPart("monster", startingY);
                    gunsterParts.push(top);
                    top.fill(spoonY, (1 - Math.cos(rad(monsterRotation)))/5);
                }
            }
            else if (top.type === "monster") {
                if (Math.sin(rad(monsterRotation)) < -0.1 && monsterIsPouring){
                    top.fill(spoonY, (1 - Math.cos(rad(monsterRotation)))/5);
                }
                else if (Math.sin(rad(guinnessRotation)) < -0.1 && guinnessIsPouring) {
                    startingY += top.y;
                    top = new GunsterPart("guinness", startingY);
                    gunsterParts.push(top);
                    top.fill(spoonY, (1 - Math.cos(rad(guinnessIsPouring)))/5);
                }
            }
        }
        else if (Math.sin(rad(guinnessRotation)) < -0.1 && guinnessIsPouring) {
            top = new GunsterPart("guinness", startingY);
            gunsterParts.push(top);
            top.fill(spoonY, (1 - Math.cos(rad(guinnessIsPouring)))/5);
        }
        else if (Math.sin(rad(monsterRotation)) < -0.1 && monsterIsPouring) {
            top = new GunsterPart("monster", startingY);
            gunsterParts.push(top);
            top.fill(spoonY, (1 - Math.cos(rad(monsterRotation)))/5);
        }
        gunsterParts = gunsterParts;

        // Keys handling
        let rotationSpeed = 4;
        let spoonSpeed = 1;
        if (keys["w"] && monsterIsPouring) monsterRotation += rotationSpeed; 
        if (keys["w"] && guinnessIsPouring) guinnessRotation += rotationSpeed; 
        if (keys["s"] && monsterIsPouring) monsterRotation -= rotationSpeed; 
        if (keys["s"] && guinnessIsPouring) guinnessRotation -= rotationSpeed; 
        if (keys["ArrowDown"] && spoonIsHeld) spoonY += spoonSpeed;
        if (keys["ArrowUp"] && spoonIsHeld) spoonY -= spoonSpeed;
        if (keys["ArrowLeft"] && spoonIsHeld) spoonX -= spoonSpeed;
        if (keys["ArrowRight"] && spoonIsHeld) spoonX += spoonSpeed;

        // Customer event
        if (lastCustomerCount !== customerCount) {
            lastCustomerCount = customerCount;
            kunderIKoe.push(newCustomer());
            if (!kundeSomFaarServert) {
                setKundeSomFaarServert(kunderIKoe[0]);
                kunderIKoe = [];
            }
            kunderIKoe = kunderIKoe;
        }
        if (user.gunstermaskin){
            guinnessIsPouring = false;
            monsterIsPouring = false;
            if (gunsterParts.length === 0){
                gunsterParts = [new GunsterPart("monster",0), new GunsterPart("guinness",0)];
            }
            else if (gunsterParts.length === 2 && gunsterParts[1].startingY + gunsterParts[1].y < 100){
                gunsterParts[0].y += (2/5);
                gunsterParts[1].startingY += (2/5)
                gunsterParts[1].y += (2/5);
            }
            else if (gunsterParts.length !== 0 && gunsterParts.length !== 2) gunsterParts = []; // should only happen on the buy action of gunstermaskin
        }
    }
    const gameLoopInterval = setInterval(gameLoop, 1000/60); 

    const rad = (deg) => {
        return deg * Math.PI / 180; 
    }

    let servert_en_plass = 0;

    function serverGunster() {
        if (!kundeSomFaarServert) return;
        
        servert_en_plass++;
        let gunsterScore = evaluateGunsterParts(gunsterParts) * 10;
        politiStore.update((verdi) => {
            return verdi + 1.6*(kundeSomFaarServert.ettersokelse/(1+user.kamuflasje*0.5) + (10-gunsterScore)/10 + (servert_en_plass) / 100);
    });
        kundeSomFaarServert.status = "walking";

        kundeSomGaar.push(kundeSomFaarServert);
        kundeSomGaar = kundeSomGaar;

        user.cash += (gunsterScore + gunsterScore * $folgereStore*0.002) * (user.kurs + 1) + kundeSomFaarServert.penger;
        folgereStore.update((followers) => followers += followers * (0.02 + gunsterScore/100 + user.reklameskilt/50) + gunsterScore*4*(1+user.reklameskilt))
        gunsterParts = [];

        kundeSomFaarServert = null;
        
        if (kunderIKoe[0]) {
            setKundeSomFaarServert(kunderIKoe[0]);
            kunderIKoe = kunderIKoe.slice(1, kunderIKoe.length);
        }
    }

    onMount(() => {        
        setKundeSomFaarServert(newCustomer());
        kundeSomFaarServert = kundeSomFaarServert;
    });

</script>

<svelte:window on:keydown={handleKeyDown} on:keyup={handleKeyUp} on:resize={() => {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    }}
/>

<div id="a"></div>
<div class="lokasjon" style="background-image: url('locations/{lokasjon}.png'); background-size: 100% 100%; background-repeat: no-repeat;"></div>



<Spoon x={spoonX} y={spoonY} rotation={spoonRotation} on:click={() => {
    spoonIsHeld = !spoonIsHeld;
    spoonRotation = 0;
}} />

<Glass x={glassX} y={glassY} {gunsterParts} guideline={user.guideline} />

<button class="position"
style={` top: ${windowHeight / 1.13}px; left: ${windowWidth / 2.84}px; z-index: 999;`} 
on:click={serverGunster}>Server Gunster</button>

<Bottle x={guinnessX} y={guinnessY} rotation={guinnessRotation} guinness on:click={() => {
    guinnessIsPouring = !guinnessIsPouring;
    if (monsterIsPouring) monsterIsPouring = !monsterIsPouring;
    }}/>

<Bottle x={monsterX} y={monsterY} rotation={monsterRotation} monster on:click={() => {
    monsterIsPouring = !monsterIsPouring;
    if (guinnessIsPouring) guinnessIsPouring = !guinnessIsPouring;
    }}/>

{#if user.ekstrabokser}
    {#if guinnessIsPouring}
        <Bottle x={guinnessX - (windowWidth / 10)} y={guinnessY} rotation={guinnessRotation} guinness on:click={() => {
            guinnessIsPouring = !guinnessIsPouring;
            if (monsterIsPouring) monsterIsPouring = !monsterIsPouring;
        }}/>
    {/if}
    {#if monsterIsPouring}
        <Bottle x={monsterX - (windowWidth / 10)} y={monsterY} rotation={monsterRotation} monster on:click={() => {
            monsterIsPouring = !monsterIsPouring;
            if (guinnessIsPouring) guinnessIsPouring = !guinnessIsPouring;
        }}/>
    {/if}
{/if}

<CustomerLine customers={kunderIKoe} />

{#if kundeSomFaarServert}
    <Customer x={kundeSomFaarServert.x} y={kundeSomFaarServert.y} customer={kundeSomFaarServert.customer_type} />
{/if}

{#if kundeSomGaar.some((kunde) => !kunde.done)}
    {#each kundeSomGaar as kunde, index}
        {#if !kunde.done}
            <KundeSomGaar customer={kunde.customer_type} on:done={() => kundeSomGaar[index].done = true } />
        {/if}
    {/each}

{/if}

{#if user.gunstermaskin}
    <div id ="gunstermaskin"></div>
{/if}

<Audio {kundeSomFaarServert} {lokasjon}></Audio>

<style>
    #a {
        background-image: url("/gunster_truck_inside.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        width: 100vw;
        height: 100vh;
    }
    #gunstermaskin {
        background-image: url("/gunstermaskin.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        width: 100vw;
        height: 100vh;
        z-index: 100;
        position: absolute;
        top:0px;
        left:0px;
    }
    .lokasjon {
        width: 100vw;
        height: 100vh;
        position: absolute;
        top: 0px;
        left: 0px;
        z-index: -99;
    }
</style>
