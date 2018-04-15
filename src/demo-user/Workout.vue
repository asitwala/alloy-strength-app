<template>
<div class="as-workout-container">
    <div style="width: 60%; margin: 0 auto">
        <v-alert
            type="warning"
            dismissible
            v-model="visible"
            transition="as-fade"
            style="position:fixed; width: 60%; z-index: 100; border-radius: 10px !important;
                background-color: #ffe082 !important; color: black !important;">
            It seems like some fields were left blank. Would you still like to submit? 
            <v-btn @click="warningYes">Yes</v-btn>
        </v-alert>

        <v-alert
            type="warning"
            dismissible
            v-model="visible2"
            transition="as-fade"
            style="position:fixed; width: 60%; z-index: 100; border-radius: 10px !important;
                background-color: #ffe082 !important; color: black !important;">
            It seems like you've already entered some information. Are you sure you want to clear all fields?
            <v-btn @click="warning2Yes">Yes</v-btn>
        </v-alert>
    </div>
    <div class="as-workout">
        <div class="as-date-pickers">
            <div class="as-date-pickers-text">
                Select workout dates by clicking on the calendar or by 
                using the dropdown menu and options.
            </div>

            <v-date-picker
                width="300"
                v-model="date"
            />

            <div class="as-workout-date-dropdown-options">
                <v-btn
                    @click="getLastWorkout"
                    class="as-workout-date-back-btn"
                    fab 
                    small
                    color="primary">
                    <v-icon>fa-angle-left</v-icon>
                </v-btn>

                <v-select
                    class="body-1"
                    :items="formattedWorkoutDates"
                    v-model="selectedWorkoutDate"
                    label="Select workout dates"
                    single-line
                ></v-select>

                <v-btn
                    @click="getNextWorkout"
                    class="as-workout-date-next-btn"
                    fab 
                    small
                    color="primary">
                    <v-icon>fa-angle-right</v-icon>
                </v-btn>
            </div>

        </div>

        <div class='as-subworkout-container'>
            <div class="as-subworkout-options">
                <p class="as-subworkout-suggested-disclaimer">Brackets () indicate a recommended value.<br>e.g. (7) in an RPE box means a target RPE of 7 for that set.</p>
                <div class="as-subworkout-buttons">
                    <v-btn color="red" 
                        @click="checkClear()"
                        style="color: white">
                        Clear
                    </v-btn>
                    <v-btn color="primary"
                        @click="postWorkoutInfo('SAVE')">
                        Update
                    </v-btn>
                    <v-btn color="green" 
                        style="color: white">
                        Submit
                    </v-btn>
                </div>
            </div>

            <v-card>
                <v-card-title>
                    <table class="as-workout-simple-view" v-if="simpleView">
                        <thead>
                            <tr>
                                <th>Pattern</th>
                                <th>Exercise</th>
                                <th>Reps</th>
                                <th>Weight</th>
                                <th>RPE</th>
                                <th>Tempo</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="subworkout in subworkouts" :key="subworkout.name">
                                <td>{{subworkout.type}}</td>
                                <td>{{subworkout.name}}</td>
                                <td>
                                    <div v-for="reps in subworkout.dataTableItems[0].inputs">
                                        <span v-if="reps.status === 'Fixed'">{{ reps.value }}</span>
                                        <input v-else-if="reps.status === 'Filled'" 
                                            v-model="reps.value"/>
                                        <input v-else-if="reps.status === 'Empty'"
                                            v-model="reps.value" placeholder="Enter Reps"/>
                                    </div>
                                </td>
                                <td>
                                    <div v-for="weight in subworkout.dataTableItems[1].inputs">
                                        <span v-if="weight.status === 'Fixed'">{{ weight.value }}</span>
                                        <input v-else-if="weight.status === 'Filled'" 
                                            v-model="weight.value"/>
                                        <input v-else-if="weight.status === 'Empty'"
                                            v-model="weight.value" placeholder="Enter Weights"/>
                                    </div>
                                </td>
                                <td>
                                    <div v-for="RPE in subworkout.dataTableItems[2].inputs">
                                        <span v-if="RPE.status === 'Fixed'">{{ RPE.value }}</span>
                                        <select v-else-if="RPE.status === 'Filled'" v-model="RPE.value">
                                            <option v-for="RPEOption in subworkout.RPEOptions">
                                                {{ RPEOption }}
                                            </option>
                                        </select>
                                        <select v-else-if="RPE.status === 'Empty'" v-model="RPE.value">
                                            <option disabled value="null">Please select RPE</option>
                                            <option v-for="RPEOption in subworkout.RPEOptions">
                                                {{ RPEOption }}
                                            </option>
                                        </select>
                                    </div>
                                </td>
                                <td>
                                    <div v-for="tempo in subworkout.dataTableItems[3].inputs">
                                        <span v-if="tempo.status === 'Fixed'">{{ tempo.value.join(' | ') }}</span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </v-card-title>
            </v-card>

            <as-subworkout v-if="!simpleView" v-for="subworkout in subworkouts" :key="subworkout.name"
                :name="subworkout.name"
                :RPEOptions="subworkout.RPEOptions"
                :dataTableItems="subworkout.dataTableItems"
            />
        </div>
    </div>
</div>


</template>

<script>

let Subworkout = require('./Subworkout.vue').default;
import WorkoutService from '@/services/WorkoutService';

export default {
    components: {
        'as-subworkout': Subworkout
    },
    mounted() {
        this.fetchWorkoutInfo();
    },
    methods: {
        checkClear() {
            this.subworkouts.forEach((subworkout, subworkoutIndex) => {
                subworkout.dataTableItems.forEach((row, rowIndex) => {
                    row.inputs.forEach((input, inputIndex) => {
                        if (input.value !== null || input.value !== '' && input.status === 'Empty') {
                            this.visible2 = true; 
                            return; 
                        }
                    });

                });
            });
        },
        warningYes() {
            this.visible = false; 
            this.checkBlankFields = false; 
            this.postWorkoutInfo('SAVE');
        },
        warning2Yes() {
            this.visible2 = false; 
            this.fetchWorkoutInfo();
        },
        getNextWorkout() {
            let index = this.formattedWorkoutDates.indexOf(this.selectedWorkoutDate) + 1;
            if (index >=0 && index < this.workoutDates.length) {
                this.selectedWorkoutDate = this.formattedWorkoutDates[index]; 
            }
        },
        getLastWorkout() {
            let index = this.formattedWorkoutDates.indexOf(this.selectedWorkoutDate) - 1; 
            if (index >=0 && index < this.workoutDates.length) {
                this.selectedWorkoutDate = this.formattedWorkoutDates[index]; 
            }
        },
        formatWorkoutDates() {
            this.workoutDates.forEach(date => {
                this.formattedWorkoutDates.push(`Week ${date.Week}, Day ${date.Day}: ${date.Date}`);
            });
        },
        postWorkoutDates(actionType) {

        },
        fetchWorkoutInfo() {
            WorkoutService.fetchWorkoutInfo().then(response => {
                if (typeof response === 'object') {
                    this.workoutDates = response.data.workoutDates; 
                    this.formatWorkoutDates(); 
                    this.subworkouts = response.data.subworkouts;
                    this.date = response.data.date;
                }
            });
        },
        postWorkoutInfo(actionType) {
            // put into a format Matt likes
            let firstParameter = ''; 
            let secondParameter = ''; 
            let thirdParameter = ''; 
            let tempKey = '';
            let tempValue = ''; 
            let alloySetInfo = {}; // on a subworkout basis 

            let workout = {};
            this.subworkouts.forEach((subworkout, subworkoutIndex) => {
                let firstParameter = subworkoutIndex + 1; // make 1-indexed
                
                subworkout.dataTableItems.forEach((row, rowIndex) => {
                    if (row.id === 1) {
                        secondParameter = 'Reps';
                    } else if (row.id === 2) {
                        secondParameter = 'W';
                    } else if (row.id === 3) {
                        secondParameter = 'RPE'; 
                    }

                    row.inputs.forEach((input, inputIndex) => {
                        if (input && (input.status === 'Empty' || input.status === 'Filled')) {
                            console.info('Input', input);
                            /* Special Case: Alloy Set */ 
                            if (!(secondParameter === 'Reps' && input.alloy)) {
                                thirdParameter = inputIndex + 1; 
                            } else if (secondParameter === 'Reps' && input.alloy && subworkout.alloyStage === 2) {
                                secondParameter = 'X'; 
                                thirdParameter = 'Alloy';
                            }

                            if (firstParameter && secondParameter && thirdParameter) {
                                tempKey = `${firstParameter}|${secondParameter}|${thirdParameter}`;
                                if (input.value === null | input.value === '' && this.checkBlankFields) {
                                    this.visible = true; 
                                    return; 
                                }
                                tempValue = input.value ? `${input.value}` : ''; 
                                workout[tempKey] = tempValue; 
                            }
                        }                        
                    });
                });
            }); 

            if (actionType === 'SAVE') {
                workout.SaveBtn = actionType; 
            }

            WorkoutService.postWorkoutInfo(workout).then(response => {
                this.fetchWorkoutInfo();
            });
        }
    },
    data() {
        return {
            simpleView: true,
            date: '',
            selectedWorkoutDate: '',
            subworkouts: [],
            workoutDates: [],
            formattedWorkoutDates: [],
            visible: false,
            visible2: false,
            checkBlankFields: true
        };
    },
    watch: {
        selectedWorkoutDate: function(newDate) {
            if (newDate) {
                let index = this.formattedWorkoutDates.indexOf(newDate); 
                let workoutDate = {};
                if (index >= 0) {
                    workoutDate = this.workoutDates[index];
                }

                let dateInformation = {
                    changeWorkoutBtn: true,
                    changeWorkoutSelect: `${workoutDate.Week}|${workoutDate.Day}`
                }

                WorkoutService.postWorkoutInfo(dateInformation).then(response => {
                    this.fetchWorkoutInfo();
                });
                // TODO -- call post here
            }
        }
    }
};

</script>

<style lang="scss">
    @import '~@/demo-common/styles/transitions';
    @import '~@/demo-common/styles/colors';

    .as-workout {
        display: flex;
        width: 100%;
        flex-wrap: wrap;
        justify-content: space-evenly;
        margin-top: 25px;

        .as-date-pickers {
            &-text {
                text-align: justify;
                margin-bottom: 5px;
            }
            
            .as-workout-date-dropdown-options {
                display: flex;
            }

            .as-workout-date-back-btn,
            .as-workout-date-next-btn {
                margin-top: 18px;
                height: 30px;
                width: 30px;
            }

            width: 300px;
            margin-bottom: 20px; 
        }

        .as-subworkout-suggested-disclaimer {
            font-style: italic;
        }

        .as-subworkout-options {
            display: flex;
            justify-content: space-between; 
        }

        .as-subworkout-container {
            width: 60%;
            min-width: 400px;
        }
    }

    .as-workout-simple-view {
        width: 100%; 
        border-collapse: collapse; 

        td, th {
            border: 1px solid $greyLighten2;
            padding: 8px;
        }
    }
</style>