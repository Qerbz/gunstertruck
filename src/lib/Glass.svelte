<script>
    export let x;
    export let y;
    export let gunsterParts;
</script>

<div id="a" class="position" style={`top: ${y}px; left: ${x}px; `}>
    <div style={`position: absolute; width: 100%; background-color: #199791; height:100%; z-index: 1;`}/>
    {#each gunsterParts as gunsterPart}
        <div id={gunsterPart.type} style={`height: ${gunsterPart.y}%`} />
    {/each}
</div>

<style>
    #a {
        width: 10vw;
        height: 23vh;
        border: 5px solid blue;
        z-index: -9;
        display: flex;
        flex-direction: column-reverse;
        flex-wrap: nowrap;
    }

    #guinness {
        width: 100%;
        z-index: 99;
        background-color: var(--guinness);
    }

    #monster {
        width: 100%;
        z-index: 99;
        background-color: var(--monster);
    }
    #blanding {
        width: 100%;
        z-index: 99;
        background: linear-gradient(to bottom, var(--guinness) 0%, var(--guinness) 45%, var(--monster) 55%, var(--monster) 100%);
    }
</style>