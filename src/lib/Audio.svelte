<script>
  import { onDestroy, onMount } from "svelte";

    export let lokasjon;
    export let kundeSomFaarServert;
    let generelt = ["sound/generelt/general.m4a", "sound/generelt/its gonster time.m4a", "sound/generelt/selger.m4a", "sound/generelt/skrik.m4a"];
    let baddie = ["sound/karakter/baddie/baddie.m4a", "sound/karakter/baddie/baddie3.m4a", "sound/karakter/baddie/baddie4.m4a"]
    let child = ["sound/karakter/barn/barn.m4a", "sound/karakter/barn/barn2.m4a", "sound/karakter/barn/kid4.m4a", "sound/karakter/barn/kid5.m4a","sound/karakter/barn/kid6.m4a"]
    let oldie = ["sound/karakter/fyllik/gammel.m4a", "sound/karakter/fyllik/gammel2.m4a","sound/karakter/fyllik/gammel3.m4a", "sound/karakter/fyllik/gammel4.m4a"]
    let kvaddaa = ["sound/lokasjon/kvaddaa.m4a", "sound/lokasjon/kvaddå 2.m4a", "sound/lokasjon/kvaddaa 3.m4a"];
    let glennronny = ["sound/lokasjon/Glenn Ronny Trucking.m4a", "sound/lokasjon/glenn ronny 2.m4a", "sound/lokasjon/glenn ronny 3.m4a"];
    let vaulen = ["sound/lokasjon/vaulen.m4a", "sound/lokasjon/vaulen 2.m4a", "sound/lokasjon/vaulen 3.m4a"];
    let ruten = ["sound/lokasjon/ruten.m4a", "sound/lokasjon/ruten2.m4a", "sound/lokasjon/ruten3.m4a"];
    let uis = ["sound/lokasjon/uis2.m4a", "sound/lokasjon/uis.m4a", "sound/lokasjon/uis3.m4a"];
    let torvet = ["sound/lokasjon/torget.m4a","sound/lokasjon/torvet2.m4a", "sound/lokasjon/torvet3.m4a", "sound/lokasjon/torvet4.m4a"];
    let piren = ["sound/lokasjon/piren.m4a", "sound/lokasjon/piren2.m4a", "sound/lokasjon/piren3.m4a"];

    let customerdict = {
        "baddie": baddie,
        "minor": child,
        "old_drunkard": oldie,
        0: []
    }
    let locdict = {
        "kvaddaa": kvaddaa,
        "glenn_ronny_trucking": glennronny,
        "vaulen": vaulen,
        "ruten": ruten,
        "uis": uis,
        "torvet": torvet,
        "piren_pub": piren,
    }
    const randomElement = (array) => array[Math.floor(Math.random() * array.length)];
    let audio;
    let interval;
    onMount(() => {
        audio.src = randomElement(locdict[lokasjon]);
        audio.play();
        interval = setInterval(() => {
            let audios = [];
            if(kundeSomFaarServert) audios = audios.concat(customerdict[kundeSomFaarServert.customer_type]);
            let audios1 = locdict[lokasjon];
            let audios2 = generelt
            if (audios2.length) audios = audios.concat(audios2);
            if (audios1.length) audios = audios.concat(audios1);
            audio.src = randomElement(audios);
            audio.play();
        }, 25000)
    });

    onDestroy(()=>{
        clearInterval(interval);
    })


</script>


<audio bind:this={audio} src=""></audio>