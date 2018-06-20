<template>
    <div class="as-look-inside">
        <div class="row">
            <div class="column">
                <img src="../../static/DemoShots/WorkoutComplexResized.png" class="as-look-inside-image"/>
            </div>
            <div class="column">
                <img src="../../static/DemoShots/WorkoutSimpleGood2.png" class="as-look-inside-image"/>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <img src="../../static/DemoShots/Video_DefaultResized.png" class="as-look-inside-image"/>
            </div>
            <div class="column">
                <img src="../../static/DemoShots/Progress.png" class="as-look-inside-image"/>
            </div>
        </div>
    </div>

</template>

<script>
    export default {

    };

</script>

<style lang="scss">

    .as-look-inside {
        max-width: 1280px; 
        height: 100%;
        margin: 0 auto;
        background-color:#1976d2;
        padding-bottom:20px;
        &-image {
            height: auto;
            width: 100%;
            display: block;
        }
        .column {
            background-color:#1976d2;
            float: left;
            width: 50%;
            padding-top: 5px;
            padding-bottom: 10px;
            padding-left: 10px;
            padding-right: 10px;
        }        
        .row::after {
            content: "";
            clear: both;
            display: table;
        }        
    }

</style>