<script>
    export let user;
</script>

<div class="position">$ {Math.round(user.cash)}</div>

<style>
    div {
        padding: 5px;
        top: 10px;
        right: 2vw;
        background-color: yellow;
        z-index: 999;
        width: fit-content;
        height: 3vh;
    }
</style>