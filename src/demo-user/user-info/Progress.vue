<template>

<div class="as-progress">
    <div class="as-progress-summary">
       <h1 class="as-progress-report-header">Level {{ oldLevel }} Performance Summary</h1>
        <v-divider/>

        <div class="as-progress-summary-content">
            <h1 class="as-progress-status-header">{{ statusText }}</h1>
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

    <div class="as-progress-next-workout"> <!-- v-if="!inProgress" -->
        <h1>Next Steps</h1>
        <v-divider/>
        <div class="as-progress-next-workout-content" v-if="$session.get('user').isAdmin || !inProgress">
            <div>
                <h3>Your next set of workouts will be at 
                    <span class="as-progress-next-level">
                        {{ `level ${newLevel}`.toUpperCase() }}
                    </span>.
                </h3>
            </div>
            
            <div v-html="levelUpMessage"></div>
            <div v-if="newLevel === 11" class="as-level-11"></div>
            <div v-else-if="newLevel === 16" class="as-level-16"></div>

            <v-btn small color="primary" 
                @click="routeTo('Videos')"
                class="as-progress-next-workout-button">
                View Unlocked Videos</v-btn>
            <v-btn small color="primary"
                @click="routeTo('SetLevels')"
                class="as-progress-next-workout-button">
                Get New Workouts</v-btn>
        </div>

        <div class="as-progress-next-workout-content2" v-else>
            <h3>Next steps will be generated once you complete all workouts for your level.</h3>
        </div>
    </div>
</div>

</template>

<script>

    import ProgressService from '@/services/ProgressService'; 

    export default {
        data() {
            return {
                oldLevel: 0,
                newLevel: 0,
                statusText: '',
                userId: 1,
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
                coreExerciseTableItems: [],
                secondaryExerciseTableItems: [],
                levelUpMessage: ''
            }
        },
        mounted() {
            this.fetchProgressInfo();
        },
        methods: {
            fetchProgressInfo() {
                this.userId = this.$session.get('user').id; 

                ProgressService.fetchProgressInfo(this.userId).then(response => {
                    this.oldLevel = response.data.oldLevel; 
                    this.newLevel = response.data.newLevel; 
                    this.statusText = response.data.statusText; 

                    this.coreExerciseTableItems = response.data.coreExerciseTableItems;
                    this.secondaryExerciseTableItems = response.data.secondaryExerciseTableItems;
                    this.levelUpMessage = response.data.levelUpMessage;
                });
            },
            alloyResultClasses(alloyResult) {
                return {
                    'as-alloy-result-failed': alloyResult === 'FAILED',
                    'as-alloy-result-passed': alloyResult === 'PASSED'
                }
            },
            routeTo(name) {
                this.$router.push({ name: name }); 
            }
        },
        computed: {
            inProgress() {
                return this.statusText === 'Still In Progress'; 
            }
        }
    };  

</script>

<style lang="scss">

    @import "~@/demo-common/styles/colors";

    .as-progress {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
    }

    .as-progress-summary {
        max-width: 100%; 
        width: 850px;
        margin-bottom: 25px;

        .as-progress-report-header { // h1
            margin: 15px 0 15px 25px; 
        }

        &-content {
            margin: 0 25px; 

            .as-progress-status-header {
                margin-top: 15px;
            }

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
            }
        }

        &-content2 {
            width: 100%;
            padding: 0 25px 25px 25px;

            h3 {
                margin: 15px 0 5px;
            }
        }

        .as-progress-next-level {
            color: $blueBase;
            font-size: 22px;
            margin-left: 2px;
        }

        &-button:nth-of-type(1) {
            margin-left: 0px;
            margin-right: 12px;
        }

        &-button:nth-of-type(2) {
            margin-left: 0px;
        }
    }

    .as-level-11 {
        margin: 0 0 16px; 
        width: 350px; 
        height: 97px; 
        min-width: 300px;
        background: url("../../../static/level11.png") no-repeat center;
        background-size: cover; 
    }

    .as-level-16 {
        margin: 0 0 16px;  
        width: 350px; 
        height: 97px; 
        min-width: 300px;
        background: url("../../../static/level16.jpg") no-repeat center;
        background-size: cover; 
    }

</style>