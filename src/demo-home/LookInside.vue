<template>
    <div class="as-look-inside">
        <div class="as-look-inside-img-ctr">
            <img src="../../static/DemoShots/WorkoutComplexResized.png" class="as-look-inside-image"/>
        </div>
        <div class="as-look-inside-img-ctr">
            <img src="../../static/DemoShots/WorkoutSimpleGood2.png" class="as-look-inside-image"/>
        </div>
        <div class="as-look-inside-img-ctr">
            <img src="../../static/DemoShots/Video_DefaultResized.png" class="as-look-inside-image"/>
        </div>
        <div class="as-look-inside-img-ctr">
            <img src="../../static/DemoShots/Progress.png" class="as-look-inside-image"/>
        </div>
       
    </div>

</template>

<script>
    export default {
        

    };

</script>

<style lang="scss">

    .as-look-inside {
        height: 100%;
        padding-bottom:20px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;


        .as-look-inside-img-ctr {
            display: flex; 
            justify-content: center;
            align-items: center;
            min-width: 300px;
            max-width: 575px;
            padding: 16px;
            margin: 4px;
            background-color: rgba(0, 0, 0, 0.5);


            img {
                object-fit: contain;
                width: 100%;
            }   
        }   
    }

</style>