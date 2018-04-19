<template>
 <div class="as-workout-container">
    <div class="as-workout-header">
        <div class="as-workout-options">
            <div class="as-subworkout-descs">
                <h1>{{ titlePart1 }}</h1>
                <h3>{{ titlePart1Extend }}</h3>
            </div>
            <div class="as-subworkout-controls">
                <v-checkbox 
                    class="as-workout-options-checkbox"
                    color="primary"
                    label="Simple View"
                    v-model="showSimpleView"
                >
                </v-checkbox>
                <v-checkbox 
                    class="as-workout-options-checkbox"
                    color="primary"
                    label="Show Calendar"
                    v-model="showCalendar"
                >
                </v-checkbox>
                <v-btn
                    class="as-subworkout-button">
                    Reset
                </v-btn>
                <v-btn color="primary"
                    class="as-subworkout-button"
                    @click="postWorkoutInfo('SAVE')">
                    Save
                </v-btn>
                <v-btn color="green" 
                    class="as-subworkout-button">
                    Submit
                </v-btn>
            </div>
        </div>
        <v-divider/>
    </div>

    <div class="as-workout">
         <div class='as-subworkout-container' v-if="!showSimpleView">
            <div class="as-subworkout-options">
                <h3>{{ titlePart2 }}</h3>
                <p class="as-subworkout-suggested-disclaimer">Brackets [ ] indicate a recommended value, e.g. [ 7 ] in an RPE box means a target RPE of 7 for that set.</p>
            </div>
        
            <as-subworkout v-for="(subworkout, subworkoutIndex) in subworkouts" :key="subworkout.name"
                :type="subworkout.type"
                :name="subworkout.name"
                :describer="subworkout.describer"
                :video="subworkout.hasVideo ? subworkout.selectedVideo : {}"
                :RPEOptions="subworkout.RPEOptions"
                :dataTableItems="subworkout.dataTableItems"
                :headers="headersList[subworkoutIndex]"
            />
        </div>


        <div class="as-date-pickers" v-if="showCalendar">
            <div class="as-date-pickers-text">
                Select workout dates by clicking on the calendar or by 
                using the dropdown menu and options.
            </div>

            <v-date-picker
                width="300"
                v-model="date"
            />

            <div class="as-workout-date-dropdown-options">
                <div class="as-workout-date-any-date">
                    <v-select
                        class="body-1"
                        :items="formattedWorkoutDates"
                        v-model="selectedWorkoutDate"
                        label="Select workout dates"
                        single-line
                    ></v-select>
                    <v-btn
                        @click="getNextWorkout"
                        class="as-workout-date-any-date-btn"
                        small
                        color="primary">
                        <span>Go</span> 
                    </v-btn>
                </div>
                <div class="as-workout-date-back-next">
                    <v-btn
                        @click="getLastWorkout"
                        class="as-workout-date-back-btn"
                        small
                        color="primary">
                        <v-icon left>fa-angle-left</v-icon> 
                        <span>Last</span>
                    </v-btn>
                    <v-btn
                        @click="getNextWorkout"
                        class="as-workout-date-next-btn"
                        small
                        color="primary">
                        <span>Next</span> 
                        <v-icon right>fa-angle-right</v-icon> 
                    </v-btn>
                </div>
            </div>
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
                    let title = response.data.describer.split(' - '); 
                    let title1 = title[0].split(', '); 
                    this.titlePart1 = title1[0];
                    this.titlePart1Extend = title1[1];
                    this.titlePart2 = title[1];
                    this.workoutDates = response.data.workoutDates; 
                    console.log("response.data.workoutDates: ", response.data.workoutDates);
                    this.formatWorkoutDates(); 
                    console.log("formattedworkoutdates: ", this.formattedWorkoutDates);
                    this.subworkouts = response.data.subworkouts;
                    this.date = response.data.date;
                    this.simpleView = true;

                    let headerMap = {
                        0: "1st",
                        1: "2nd",
                        2: "3rd",
                        3: "4th",
                        4: "5th",
                        5: "6th",
                        6: "7th",
                        7: "8th",
                        8: "9th",
                        9: "10th"
                    };

                    this.headersList = []; 

                    this.subworkouts.forEach((subworkout, subworkoutIndex) => {

                        subworkout.dataTableItems.forEach((row, rowIndex) => { 
                            if (rowIndex === 0) {
                                let tempHeaders = []; 
                                tempHeaders.push({ text: '', value: '', sortable: false }); // set first column header to blank string
                                row.inputs.forEach((input, inputIndex) => {
                                    if (input.alloy) {
                                        tempHeaders.push({ text: 'Alloy Set', value: '', sortable: false });
                                    } else {
                                        tempHeaders.push({ text: `${headerMap[inputIndex]} Set`, value: '', sortable: false });
                                    }
                                });
                                this.headersList.push(tempHeaders);
                            }
                        });
                    });
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
            titlePart1: '',
            titlePart1Extend: '',
            titlePart2: '',
            subworkouts: [],
            headersList: [], 
            workoutDates: [],
            formattedWorkoutDates: [],
            showCalendar: true,
            showSimpleView: false
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
    @import '~@/demo-common/styles/colors';

    .as-workout-container {
        width: 90%; 
        margin: 0 auto;
    }

    .as-workout-header {
        margin: 0 20px;

        .as-workout-options {
            padding-top: 4px;
            min-height: 58px;
            display: flex; 
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;

            .as-subworkout-descs {
                display: flex;
                align-items: center;
                flex-wrap: wrap;

                h1 {
                    margin-right: 12px;
                }

                h3 {
                    padding-top: 2px;
                    font-size: 18px;
                }
            }

            .as-subworkout-controls {
                display: flex;
                align-items: center;
                flex-wrap: wrap;

                .as-workout-options-checkbox {
                    min-width: 150px;
                    height: 30px;
                }
            }

            .as-subworkout-button {
                margin-left: 0px !important;
                color: white;
                &:nth-of-type(1) {
                    margin-left: 0px !important;
                    background-color: $blueGreyBase;
                }
                &:nth-of-type(2) {
                   
                }
                &:nth-of-type(3) {
                }
            }
        }
    }


    .as-workout {
        display: flex;
        width: 100%;
        flex-wrap: wrap;
        margin-top: 14px;

        .as-date-pickers {
            &-text {
                text-align: justify;
                margin-bottom: 16px;
            }
            
            .as-workout-date-dropdown-options {

                .as-workout-date-any-date {
                    display: flex;
                    align-items: center;

                    select {
                        flex: 1; 
                    }


                    &-btn {
                        margin-right: 0px;
                        max-width: 20px !important;
                        
                        &.btn {
                            min-width: 36px !important;
                        }

                    }
                }

                .as-workout-date-back-next {
                    display: flex;
                    justify-content: space-between;
                }
                
            }

            .as-workout-date-back-btn,
            .as-workout-date-next-btn {
                margin-top: -8px;
                margin-left: 0px;
                margin-right: 0px;

                &.btn {
                    min-width: 60px !important;
                }
            }

            width: 300px;
            margin: 0 20px; 
            margin-bottom: 20px; 
        }

        .as-subworkout-suggested-disclaimer {
        }

        .as-subworkout-options {
        }

        .as-subworkout-container {
            flex: 1; 
            margin: 0 20px;
            min-width: 400px;
        }
    }
</style>