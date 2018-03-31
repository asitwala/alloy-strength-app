<template>

<div class="as-progress">
    <div class="as-progress-summary">
       <h1>Progress Report</h1>
        <v-divider/>

        <div class="as-progress-summary-content">
            <h2>Core Exercises</h2>
            <v-card class="as-progress-exercise-table">
                <v-card-title>
                    <v-data-table
                        :headers="coreExerciseTableHeaders"
                        :items="coreExerciseTableItems"
                        hide-actions>
                        <template slot="items" slot-scope="props">
                            <td> {{ props.item.exerciseType }}</td>
                            <td> {{ props.item.exerciseName }}</td>
                            <td> {{ props.item.max }}</td>
                            <td :class="alloyResultClasses(props.item.alloyResult)"> {{ props.item.alloyResult }}</td>
                        </template>
                    </v-data-table>
                </v-card-title>
            </v-card>

            <h2>Secondary Exercises</h2>
            <v-card class="as-progress-exercise-table">
                <v-card-title>
                    <v-data-table
                        :headers="secondaryExerciseTableHeaders"
                        :items="secondaryExerciseTableItems"
                        hide-actions>
                        <template slot="items" slot-scope="props">
                            <td> {{ props.item.exerciseType }}</td>
                            <td> {{ props.item.exerciseName }}</td>
                            <td> {{ props.item.max }}</td>
                            <td :class="alloyResultClasses(props.item.alloyResult)"> {{ props.item.alloyResult }}</td>
                        </template>
                    </v-data-table>
                </v-card-title>
            </v-card>
        </div>
    </div>

    <div class="as-progress-next-workout">
        <h1>Next Steps</h1>
        <v-divider/>
        <div class="as-progress-next-workout-content">
            <h3>Your next set of workouts will be at 
                <span class="as-progress-next-level">
                    {{ "level 3".toUpperCase() }}
                </span>.
            </h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
                dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt 
                mollit anim id est laborum.</p>
            <v-btn small color="primary" 
                class="as-progress-next-workout-button">
                View Unlocked Videos</v-btn>
            <v-btn small color="primary"
                class="as-progress-next-workout-button">
                Get New Workouts</v-btn>
        </div>
    </div>
</div>

</template>

<script>
    export default {
        data() {
            return {
                coreExerciseTableHeaders: [
                    { value: 'exerciseType', text: 'Exercise Type' },
                    { value: 'exerciseName', text: 'Exercise Name' },
                    { value: 'max', text: 'Max (lbs)' },
                    { value: 'alloyResult', text: 'Alloy Result' }
                ],
                secondaryExerciseTableHeaders: [
                    { value: 'exerciseType', text: 'Exercise Type' },
                    { value: 'exerciseName', text: 'Exercise Name' },
                    { value: 'max', text: 'Max (lbs)' },
                    { value: 'alloyResult', text: 'Alloy Result' }
                ], 
                coreExerciseTableItems: [ 
                    {
                        value: false,
                        exerciseType: 'UB Hor Push',
                        exerciseName: 'DB Bench Press',
                        max: '175',
                        alloyResult: 'FAILED'
                    }, 
                    {
                        value: false,
                        exerciseType: 'Squat',
                        exerciseName: 'Goblet Box Squat',
                        max: '154', 
                        alloyResult: 'PASSED'
                    },
                    {
                        value: false,
                        exerciseType: 'Hinge',
                        exerciseName: 'DB Pause RDL', 
                        max: '164',
                        alloyResult: 'PASSED'
                    }
                ],
                secondaryExerciseTableItems: [
                    {
                        value: false,
                        exerciseType: 'LB Uni Push',
                        exerciseName: 'DB Reverse Lunge',
                        max: '\u2014',
                        alloyResult: 'PASSED'
                    },
                    {
                        value: false,
                        exerciseType: 'Carry',
                        exerciseName: 'Suitcase Carry',
                        max: '\u2014',
                        alloyResult: 'FAILED'
                    },
                    {
                        value: false,
                        exerciseType: 'Ant Chain',
                        exerciseName: 'Reverse Crunch',
                        max: '\u2014',
                        alloyResult: 'PASSED'
                    },
                    {
                        value: false,
                        exerciseType: 'Iso 3',
                        exerciseName: 'Band Pullapart',
                        max: '\u2014',
                        alloyResult: 'PASSED'
                    }
                ]
            }
        },
        methods: {
            alloyResultClasses(alloyResult) {
                return {
                    'as-alloy-result-failed': alloyResult === 'FAILED',
                    'as-alloy-result-passed': alloyResult === 'PASSED'
                }
            }
        },
    };  

</script>

<style lang="scss">

    @import "~@/demo-common/styles/colors";

    .as-progress {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }

    .as-progress-summary {
        width: 850px; 
        margin-bottom: 25px;

        h1 {
            margin: 15px 0 15px 25px; 
        }

        &-content {
            margin: 0 25px; 

            h2 {
                margin: 15px 0 5px; 
            }
        }
    }

    .as-progress-exercise-table {
        
        .card__title {
            padding: 0; 

            & > div {
                width: 100%; 
            }
        }

        .as-alloy-result-failed {
            background-color: $redBase;
        }

        .as-alloy-result-passed {
            background-color: $greenAccent3; 
        }
    }

    .as-progress-next-workout {
        background-color: $greyLighten2;
        height: auto;
        flex: 1;

        h1 {
            margin: 15px 0 15px 25px; 
        }

        &-content {
            width: 100%;
            padding: 0 25px 25px 25px;

            h3 {
                margin: 15px 0 5px;
                height: 31px;
                line-height: 31px;
            }
        }

        .as-progress-next-level {
            color: $blueBase;
            font-size: 22px;
            margin-left: 2px;
        }

        &-button:nth-of-type(1) {
            margin-left: 0px;
        }

    }

</style>