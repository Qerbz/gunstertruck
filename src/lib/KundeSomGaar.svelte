<script>
    import Customer from "./Customer.svelte";
    import { createEventDispatcher } from "svelte";

    export let customer;

    const dispatch = createEventDispatcher();

    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;

    let x = windowWidth / 4.5;
    let y = windowHeight / 45;

    const interval = setInterval(() => {
        x -= 1;
        if (x < -10) {
            dispatch("done");
            clearInterval(interval);
        }
    }, 20);
</script>


<svelte:window on:resize={() => {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    }}
/>

<Customer {x} {y} {customer} />

<style>
</style>