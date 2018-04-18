<template>
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
                    style="color: white">
                    Reset
                </v-btn>
                <v-btn color="primary"
                    @click="postWorkoutInfo('SAVE')">
                    Save
                </v-btn>
                <v-btn color="green" 
                    style="color: white">
                    Submit
                </v-btn>
            </div>
        </div>
        <div id="simpleTable" v-if="simpleView">
            <form id="simpleViewForm">
                <table style="width:100%; margin-top:10px; margin-bottom:10px;">
                <tr>
                    <th>Pattern</th>
                    <th>Exercise</th> 
                    <th>Reps</th>
                    <th>Weight</th>
                    <th>RPE</th>
                    <th>Tempo</th>
                </tr>
                <tr v-for="subworkout in subworkouts" :key="subworkout.name">
                    <td>{{subworkout.type}}</td>
                    <td>{{subworkout.name}}</td>
                    <td class="dividedCell" style="padding:0px !important; position: relative;">                        
                        <div v-for="Cell in subworkout.dataTableItems[0].inputs" :key="Cell.code" style="border:solid 1px black; padding-left:5px;">
                            {{Cell.code}}
                            <span v-if="Cell.status == 'Fixed'">{{Cell.value}}</span>
                            <input v-if="Cell.status =='Filled'" type="text" style="border: 1px solid black; float: right;"
                            v-model="Cell.value" v-bind:name="Cell.code">
                            <input v-if="Cell.status =='Empty'" type="text" style="border: 1px solid black; float: right;"
                            v-model="Cell.value" placeholder="Enter Reps" v-bind:name="Cell.code">
                        </div>
                    </td>
                    <td class="dividedCell" style="padding:0px !important; position: relative;">                        
                        <div v-for="Cell in subworkout.dataTableItems[1].inputs" :key="Cell.code" style="border:solid 1px black; padding-left:5px;">
                            {{Cell.code}}
                            <span v-if="Cell.status == 'Fixed'">{{Cell.value}}</span>
                            <input v-if="Cell.status =='Filled'" type="text" style="border: 1px solid black; float: right;"
                            v-model="Cell.value" v-bind:name="Cell.code">
                            <input v-if="Cell.status =='Empty'" type="text" style="border: 1px solid black; float: right;"
                            v-model="Cell.value" placeholder="Enter Weight" v-bind:name="Cell.code">
                        </div>
                    </td>
                    <td class="dividedCell" style="padding:0px !important; position: relative;">                        
                        <div v-for="Cell in subworkout.dataTableItems[2].inputs" :key="Cell.code" style="border:solid 1px black; padding-left:5px;">
                            {{Cell.code}}
                            <span v-if="Cell.status == 'Fixed'">{{Cell.value}}</span>
                            <input v-if="Cell.status =='Filled'" type="text" style="border: 1px solid black; float: right;"
                            v-model="Cell.value" v-bind:name="Cell.code">
                            <input v-if="Cell.status =='Empty'" type="text" style="border: 1px solid black; float: right;"
                            v-model="Cell.value" placeholder="Enter RPE" v-bind:name="Cell.code">
                        </div>
                    </td>
                    <td class="dividedCell" style="padding:0px !important; position: relative;">                        
                        <div v-for="Cell in subworkout.dataTableItems[3].inputs" :key="Cell.code" style="border:solid 1px black; padding-left:5px;">
                            {{Cell.code}}
                            <span v-if="Cell.status == 'Fixed'">{{Cell.stringValue}}</span>
                            <input v-if="Cell.status =='Filled'" type="text" style="border: 1px solid black; float: right;"
                            v-model="Cell.value" v-bind:name="Cell.code">
                            <input v-if="Cell.status =='Empty'" type="text" style="border: 1px solid black; float: right;"
                            v-model="Cell.value" placeholder="Enter Tempo" v-bind:name="Cell.code">                            
                        </div>
                    </td>
                </tr>
                </table>
            </form>
        </div>
        <as-subworkout v-for="subworkout in subworkouts" :key="subworkout.name"
            :name="subworkout.name"
            :RPEOptions="subworkout.RPEOptions"
            :dataTableItems="subworkout.dataTableItems"
        />
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
        getNextWorkout() {
            let index = this.formattedWorkoutDates.indexOf(this.selectedWorkoutDate) + 1;
            if (index >=0 && index < this.workoutDates.length) {
                this.selectedWorkoutDate = this.formattedWorkoutDates[index]; 
            }
            if (this.$session.get("viewingWID") < this.$session.get("user").workoutDates.length) {
                this.$session.set("viewingWID", this.$session.get("viewingWID") + 1);          
            }
            console.log("new VWID: ", this.$session.get("viewingWID"));
            this.fetchWorkoutInfo();
        },
        getLastWorkout() {
            let index = this.formattedWorkoutDates.indexOf(this.selectedWorkoutDate) - 1; 
            if (index >=0 && index < this.workoutDates.length) {
                this.selectedWorkoutDate = this.formattedWorkoutDates[index]; 
            }
            if (this.$session.get("viewingWID") >= 1) {
                this.$session.set("viewingWID", this.$session.get("viewingWID") - 1);          
            }
            this.fetchWorkoutInfo();
        },
        formatWorkoutDates() {
            this.workoutDates.forEach(date => {
                this.formattedWorkoutDates.push(`Week ${date.Week}, Day ${date.Day}: ${date.Date}`);
            });
        },
        postWorkoutDates(actionType) {

        },
        fetchWorkoutInfo() {
            console.log("this.$session", this.$session.getAll());
            // console.log("this.$session:", this.$session);
            var _User = this.$session.get("user");
            var UserId = _User.id;
            var workoutId = this.$session.get("viewingWID");
            console.log("userId: ", UserId);
            console.log("workoutId: ", workoutId);

            WorkoutService.fetchWorkoutInfo(UserId, workoutId).then(response => {
                console.log("response: ", response);
                if (typeof response === 'object') {
                    this.workoutDates = response.data.workoutDates; 
                    console.log("response.data.workoutDates: ", response.data.workoutDates);
                    this.formatWorkoutDates(); 
                    console.log("formattedworkoutdates: ", this.formattedWorkoutDates);
                    this.subworkouts = response.data.subworkouts;
                    this.date = response.data.date;
                    this.simpleView = true;
                }
            });
        },
        simpleFormSubmit: function(event) {
            console.log("EVENT", event);
            // console.log()
            event.preventDefault();
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
            workout.userId = this.$session.get("user").id;
            workout.WID = this.$session.get("viewingWID");
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
                            // console.info('Input', input);
                            /* Special Case: Alloy Set */ 
                            if (!(secondParameter === 'Reps' && input.alloy)) {
                                thirdParameter = inputIndex + 1; 
                            } else if (secondParameter === 'Reps' && input.alloy && subworkout.alloyStage === 2) {
                                secondParameter = 'X'; 
                                thirdParameter = 'Alloy';
                            }

                            if (firstParameter && secondParameter && thirdParameter) {
                                tempKey = `${firstParameter}|${secondParameter}|${thirdParameter}`;
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
            if (this.simpleView) {
                // document.getElementById("simpleViewForm").submit();// Form submission
            }

            WorkoutService.postWorkoutInfo(workout).then(response => {
                this.fetchWorkoutInfo();
            });
        }
    },
    data() {
        return {
            date: '',
            selectedWorkoutDate: '',
            subworkouts: [],
            workoutDates: [],
            formattedWorkoutDates: []
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
    input {
        padding-left:5px;
        background-color: #b3d4fc;
    }
    table, th, td {
        border: 1px solid black;
        border-collapse: collapse;
    }
    th, td {
        padding: 5px;
    }
    .dividedCell {
        padding: 0px;
        padding-top:0px;
        padding-bottom:0px;
    }
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
</style>