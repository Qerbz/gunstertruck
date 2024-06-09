<script>
    import Customer from "$lib/Customer.svelte";

    export let customers = [];
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;

    $: gapBetweenCustomers = windowWidth / 10;

    $: startX = windowWidth / 2.5;
    $: startY = windowHeight / 45;
</script>

<svelte:window on:resize={() => {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    }}
/>

{#each customers as customera, index}
    <Customer x={startX + (index * gapBetweenCustomers)} y={startY} customer={customera.customer_type} />
{/each}

<style>
</style>