<script>
    import { politiStore } from "./politi.js";
</script>

<div class="position">Ettersøkt Nivå: {Math.round($politiStore*10)/10}/100</div>

<style>
    div {
        padding: 5px;
        top: 10px;
        right: 10vw;
        background-color: grey;
        z-index: 999;
        width: fit-content;
        height: 3vh;
    }
</style>