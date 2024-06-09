<script>
    export let x;
    export let y;
    export let customer;
</script>

{#if customer === "baddie"}
    <div on:click class="customer" style={`top: ${y}px; left: ${x}px; background-image: url("/karakterer/${customer}.png");`} />
{:else if customer === "old_drunkard"}
    <div on:click class="customer" style={`top: ${y}px; left: ${x}px; background-image: url("/karakterer/${customer}.png");`} />
{:else if customer === "minor"}
    <div on:click class="customer" style={`top: ${y}px; left: ${x}px; background-image: url("/karakterer/${customer}.png");`} />
{/if}
<style>
    .customer {
        position: absolute;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        width: 30vw;
        height: 60vh;
        z-index: -10;
    }
</style>
