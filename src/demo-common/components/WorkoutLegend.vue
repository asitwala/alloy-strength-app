<template>
    <v-card width="givenWidth">
        <v-card-text>
            <div class="as-workout-legend-container">
                <div class="as-completed as-workout-legend-item">
                    <span class="as-completed-icon as-workout-legend-icon"></span>
                    <span>Completed</span>
                </div>

                <div class="as-missed as-workout-legend-item">
                    <span class="as-missed-icon as-workout-legend-icon"></span>
                    <span>Missed</span>
                </div>

                <div class="as-current as-workout-legend-item">
                    <span class="as-current-icon as-workout-legend-icon"></span>
                    <span>Current</span>
                </div>

                <div class="as-upcoming as-workout-legend-item">
                    <span class="as-upcoming-icon as-workout-legend-icon"></span>
                    <span>Upcoming</span>
                </div>
            </div>
        </v-card-text>
    
    </v-card>
</template>


<script>

/* 
    - Gray - completed
    - Red - missed -> still need to do 
    - Green - current
    - Blue - upcoming  

*/

export default {
    props: {
        givenWidth: {
            type: String,
            default: '300px'
        }
    }
};


</script>


<style lang="scss">

    @import '~@/demo-common/styles/colors';

    .as-workout-legend-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    .as-workout-legend-item  {
        margin-right: 12px;
    }

    .as-workout-legend-icon {
        display: inline-block; 
        width: 8px;
        height: 8px;
        border-radius: 50%;
    }

    .as-completed-icon {
        background-color: $greyBase;
    }

    .as-missed-icon {
        background-color: $redBase;
    }

    .as-current-icon {
        background-color: $greenBase;
    }

    .as-upcoming-icon {
        background-color: $blueBase;
    }





</style>