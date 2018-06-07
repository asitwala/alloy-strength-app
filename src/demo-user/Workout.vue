<template>

<div class="as-workout-container">
    <as-notification
        :visible="notificationVisible"
        :type="notificationType"
        @update-visibility="val => notificationVisible = val">
        <template slot="notification-content">
            <span> {{ notificationMessage }}</span>
            <v-btn v-if="notificationType === 'resetWarning' || notificationType === 'submitWarning'"
                class="notification-button"
                small flat
                @click="notificationAcknowledged">Yes</v-btn>
        </template>
    </as-notification>

    <as-warning :visible="setWarningVisible" :text="setWarningText" @close="setWarningAcknowledged"></as-warning>

    <!-- Loading icon -->
    <div class="as-loading" v-if="loading"> 
        <v-progress-circular indeterminate color="primary"/>
    </div>

    <transition name="as-fade">
        <div class="as-workout-actual-content"  v-if="!loading">
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
                            v-if="!notEditable"
                            class="as-subworkout-button"
                            @click="checkClear()">
                            Reset
                        </v-btn>
                        <v-btn color="primary"
                            v-if="!notEditable"
                            class="as-subworkout-button"
                            @click="saveWorkoutInfo()">
                            Save
                        </v-btn>
                        <v-btn color="green" 
                            v-if="!notEditable"
                            class="as-subworkout-button"
                            @click="checkSubmit()">
                            Submit
                        </v-btn>
                    </div>
                </div>
                <v-divider/>
            </div>

            <as-workout-prompt :copy="copy" :show-prompt="showPrompt"></as-workout-prompt>

            <div class="as-workout">

                <transition name="as-fade" mode="out-in">

                    <div class="as-no-workout" v-if="contentView === 1">
                        <h3>{{ noWorkoutMessage }}</h3>
                    </div>

                    <div class="as-no-workout" v-if="contentView === 2">
                        <h3>{{ hiddenWorkoutMessage }}</h3>
                    </div>

                    <div class="as-subworkout-container" v-if="contentView === 3">
                        <div class="as-subworkout-options">
                            <h3>{{ titlePart2 }}</h3>
                            <p class="as-subworkout-suggested-disclaimer">Brackets [ ] indicate a recommended value, e.g. [ 7 ] in an RPE box means a target RPE of 7 for that set.</p>
                        </div>
                    
                        <as-subworkout 
                            v-for="(subworkout, subworkoutIndex) in subworkouts" 
                            @refresh="updateSpecial"
                            @showWarning="showSetWarning"
                            :not-editable="notEditable"
                            :key="subworkout.name"
                            :type="subworkout.type"
                            :name="subworkout.name"
                            :suggested-weight-string="subworkout.suggestedWeightString"
                            :special-class="subworkout.class"
                            :special-describer="subworkout.specialDescriber"
                            :describer="subworkout.describer"
                            :video="subworkout.hasVideo ? subworkout.selectedVideo : {}"
                            :RPEOptions="subworkout.RPEOptions"
                            :dataTableItems="subworkout.dataTableItems"
                            :number="subworkout.number"
                            :hasButton="subworkout.hasButton"
                            :buttonDisplay="subworkout.buttonDisplay ? subworkout.buttonDisplay : ''"
                            :buttonName="subworkout.buttonName"
                            :headers="headersList[subworkoutIndex]"
                            :warn-next-set="subworkout.warnNextSet"
                            :warning-text="subworkout.warningText"
                            :set-warning-ok="setWarningOk"
                        />
                    </div>

                    <div class="as-simple-workout-container" v-if="contentView === 4">
                        <div class="as-subworkout-options">
                            <h3>{{ titlePart2 }}</h3>
                        </div>
                        <as-simple-workout 
                            @refresh="() => fetchWorkoutInfo()"
                            @showWarning="showSetWarning"
                            :not-editable="notEditable"
                            :subworkouts="subworkouts"
                            :set-warning-ok="setWarningOk"/>
                    </div>
                </transition>
                
                <div class="as-date-pickers" v-if="showCalendar">
                    <div class="as-date-pickers-text">
                        Select workout dates by using the dropdown menu and buttons below.
                    </div>
                
                    <v-date-picker
                        width="300"
                        v-model="date"
                        :events="arrayEvents"
                        :event-color="arrayEventsColors"
                    />
                    
                    <as-workout-legend></as-workout-legend>

                    <div class="as-workout-date-dropdown-options">
                        <div class="as-workout-date-any-date">
                            <v-select
                                class="body-1"
                                :items="formattedWorkoutDates"
                                v-model="selectedDateWithWeekDay"
                                label="Select workout dates"
                                single-line
                            ></v-select>
                            <v-btn
                                @click="getSpecificWorkout"
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
    </transition>
</div>

</template>

<script>

import moment from 'moment'; 
let SimpleWorkout = require('./SimpleWorkout.vue').default; 
let Subworkout = require('./Subworkout.vue').default;
let Notification = require('../demo-common/components/Notification.vue').default; 

import WorkoutLegend from '@/demo-common/components/WorkoutLegend'; 

import WorkoutPrompt from '@/demo-user/user-info/WorkoutPrompt';

import SetWarning from '@/demo-common/components/SetWarning'; 

import WorkoutService from '@/services/WorkoutService';

const headerMap = {
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

export default {
    components: {
        'as-warning': SetWarning,
        'as-workout-legend': WorkoutLegend,
        'as-subworkout': Subworkout,
        'as-simple-workout': SimpleWorkout,
        'as-notification': Notification,
        'as-workout-prompt': WorkoutPrompt
    },
    mounted() {
        this.fetchWorkoutInfo();
    },
    methods: {
        showSetWarning(warningInfo) {
            if (warningInfo.warnNextSet) {
                this.setWarningVisible = true;
                this.setWarningText = warningInfo.warningText;
            }
        },
        setWarningAcknowledged() {
            this.setWarningOk = true; 
        },
        updateSpecial(buttonInfo) {
            let {patternNumber, buttonName} = buttonInfo; 
            let userId = this.$session.get("user").id;
            let vWID = this.$session.get("viewingWID");
            let tempKey = '';
            let tempValue = '';  
            let body = {};
    
            let splitCode = buttonName.split("|");
            body.specialType = splitCode[1];
            body.patternNum = splitCode[2];
            // let type = req.body.specialType;
            this.subworkouts.forEach((subworkout, subworkoutIndex) => {
                subworkout.dataTableItems.forEach((row, rowIndex) => {
                    row.inputs.forEach((input, inputIndex) => {
                        if (input && (input.status === 'Empty' || input.status === 'Filled')) {
                            tempKey = input.code
                            tempValue = input.value ? `${input.value}` : '';
                            body[tempKey] = tempValue; 
                        }
                    });
                });
            });
            
            WorkoutService.updateSpecial(userId, vWID, patternNumber, body).then((response) => {
                if (response) {
                    this.fetchWorkoutInfo();
                }
            });
        },
        getSpecificWorkout() {
            let index = this.workoutDates.map(date => date.Date).indexOf(this.selectedWorkoutDate);
            if (index >= 0) {
                let selectedDateInfo = this.workoutDates[index]; 
                this.$session.set('viewingWID', selectedDateInfo.ID);
                this.fetchWorkoutInfo();
            }
        },
        getNextWorkout() {
            let currentWID = this.$session.get('viewingWID'); // recall that WID is 1-indexed
            let workoutDays = this.workoutDates.length; 

            if (currentWID > 0 && currentWID < workoutDays) {
                this.$session.set('viewingWID', currentWID + 1);
                this.fetchWorkoutInfo();
            }
        },
        getLastWorkout() {
            let currentWID = this.$session.get('viewingWID'); // recall that WID is 1-indexed
            let workoutDays = this.workoutDates.length; 
    
            if (currentWID > 1 && currentWID <= workoutDays) {
                this.$session.set('viewingWID', currentWID - 1);
                this.fetchWorkoutInfo();
            }
        },
        formatWorkoutDates() {
            this.workoutDates.forEach(date => {
                this.formattedWorkoutDates.push(`Week ${date.Week}, Day ${date.Day}: ${date.Date}`);
            });
        },
        fetchWorkoutInfo() {
            this.loading = true; 
            let _User = this.$session.get("user");
            let UserId = _User.id;
            let workoutId = this.$session.get("viewingWID");

            WorkoutService.fetchWorkoutInfo(UserId, workoutId).then(response => {
                if (typeof response === 'object') {

                    if (this.validAccessLevelGM(response.data.accessLevel)) {
                        this.handleAccessLevelGM(response.data.accessLevel);

                        // 4 -> Progress (no new workouts yet)
                        // 5 -> Missed Workouts
                        if (response.data.accessLevel === 4) {
                            this.copy = {
                                headerText: `You Have No Upcoming Workouts`,
                                descriptionText: `to see your last progress report 
                                and generate a new set of workouts`,
                                pathName: 'Progress'
                            }

                            this.showPrompt = true;

                        } else if (response.data.accessLevel === 5) {
                            this.copy = {
                                headerText: `You Have Incomplete Workouts`,
                                descriptionText: `to reschedule your workouts`,
                                pathName: 'RescheduleWorkouts'
                            }; 

                            this.showPrompt = true;
                        }
                    }

                    if (response.data.hidden && !this.$session.get('user').isAdmin) {
                        this.hiddenWorkout = true;
                        this.hiddenWorkoutMessage = response.data.hiddenText;
                    } else {
                        let title = response.data.describer.split(' - '); 
                        let title1 = title[0].split(', '); 
                        this.titlePart1 = title1[0];
                        this.titlePart1Extend = title1[1];
                        this.titlePart2 = title[1];
                        this.workoutDates = response.data.workoutDates; 
                        this.formatWorkoutDates(); 
                        this.subworkouts = response.data.subworkouts;
                        this.date = response.data.date;
                        this.selectedDateWithWeekDay = ''; 
                        this.setTableHeaders(); 
                        this.hiddenWorkout = '';
                        this.hiddenWorkoutMessage = '';
                        let todayDate = moment().local().format('YYYY-MM-DD'); 
                        let accessible = (todayDate === this.date);

                        if ((response.data.noedits || (!accessible)) && !this.$session.get('user').isAdmin) {
                            this.notEditable = true; 
                        } else {
                            this.notEditable = false; 
                        }

                        this.arrayEvents = []; 
                        this.arrayEventsColors = {}; 
                        this.workoutDates.forEach(date => {
                            let momentDate = moment(date.Date).format('YYYY-MM-DD'); 
                            let color = ''; 

                            if (momentDate < todayDate) {
                                color = 'grey'; 
                            } else if (momentDate > todayDate) {
                                color = 'blue'; 
                            } else {
                                color = 'green'; 
                            }

                            this.arrayEvents.push(momentDate); 

                            this.arrayEventsColors[momentDate] = color; 

                        });
                    }
                }
            }).finally(() => {
                this.loading = false; 
                this.setWarningVisible = false;
                this.setWarningText = '';
                this.setWarningOk = false;
            });
        },
        setTableHeaders() {
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
        },
        notificationAcknowledged() {
            if (this.notificationType === 'resetWarning') {
                this.clearWorkoutInfo();
            } else if (this.notificationType === 'submitWarning') {
                this.submitWorkoutInfo(); 
            }

            this.notificationVisible = false; 
        },
        checkSubmit() {
            let blankFields = this.fieldsLeftBlank; 
            if (blankFields > 0) {
                if (blankFields === 1) {
                    this.notificationMessage = `It seems like ${blankFields} field was left blank. Would you still like to submit?`;
                } else {
                    this.notificationMessage = `It seems like ${blankFields} fields were left blank. Would you still like to submit?`;
                }
                this.notificationType = "submitWarning";
                this.notificationVisible = true; 
            } else {
                this.submitWorkoutInfo(); 
            }
        },
        checkClear() {
            let filledFields = this.fieldsFilled; 
            if (filledFields > 0) {
                if (filledFields === 1) {
                    this.notificationMessage = `It seems like you've already entered information for ${filledFields} field. Are you sure you want to reset your workout?`;
                } else {
                    this.notificationMessage = `It seems like you've already entered information for ${filledFields} fields. Are you sure you want to reset your workout?`;
                }
                
                this.notificationType = "resetWarning"; 
                this.notificationVisible = true; 
            } else {
                let userId = this.$session.get("user").id;
                let vWID = this.$session.get("viewingWID");
                this.clearWorkoutInfo(userId, vWID); 
            }
        },
        saveWorkoutInfo() {
            let tempKey = '';
            let tempValue = '';  

            let workout = {};
            workout.userId = this.$session.get("user").id;
            workout.WID = this.$session.get("viewingWID");

            this.subworkouts.forEach((subworkout, subworkoutIndex) => {
                subworkout.dataTableItems.forEach((row, rowIndex) => {
                    row.inputs.forEach((input, inputIndex) => {
                        if (input && (input.status === 'Empty' || input.status === 'Filled')) {
                            tempKey = input.code
                            tempValue = input.value ? `${input.value}` : '';
                            workout[tempKey] = tempValue; 
                        }
                    });
                });
            });

            WorkoutService.saveWorkoutInfo(workout).then(response => {
                this.fetchWorkoutInfo();
                this.notificationMessage = `Your workout was successfully saved!`;
                this.notificationType = "save";
                this.notificationVisible = true; 
            });
        },
        submitWorkoutInfo() {
            let tempKey = '';
            let tempValue = '';
            let workout = {};
            workout.userId = this.$session.get("user").id;
            workout.WID = this.$session.get("viewingWID");

            this.subworkouts.forEach((subworkout, subworkoutIndex) => {
                subworkout.dataTableItems.forEach((row, rowIndex) => {
                    row.inputs.forEach((input, inputIndex) => {
                        if (input && (input.status === 'Empty' || input.status === 'Filled')) {
                            tempKey = input.code
                            tempValue = input.value ? `${input.value}` : '';
                            workout[tempKey] = tempValue; 
                        }
                    });
                });
            });

            WorkoutService.submitWorkoutInfo(workout).then(response => {
                if (response.data.lastWorkout) {
                    this.$router.push({name: 'Progress'}); // route users to progress page
                } else {
                    this.fetchWorkoutInfo();
                    this.notificationMessage = `Your workout was successfully submitted!`;
                    this.notificationType = "submit";
                    this.notificationVisible = true; 
                }
            });
        },
        clearWorkoutInfo() {
            let userId = this.$session.get("user").id;
            let WID = this.$session.get("viewingWID");

            WorkoutService.clearWorkoutInfo(userId, WID).then(response => {
                this.fetchWorkoutInfo();
                this.notificationMessage = `Your workout was successfully reset!`;
                this.notificationType = "reset";
                this.notificationVisible = true; 
            });
        }
    },
    data() {
        return {
            date: '',
            selectedDateWithWeekDay: '',
            titlePart1: '',
            titlePart1Extend: '',
            titlePart2: '',
            subworkouts: [],
            headersList: [], 
            workoutDates: [],
            formattedWorkoutDates: [],
            showCalendar: true,
            showSimpleView: false,
            
            // notifications
            notificationType: 'submitWarning',
            notificationVisible: false,
            notificationMessage: '',

            // events
            arrayEvents: [],
            arrayEventsColors: {},

            // messages
            noWorkoutToday: false,
            noWorkoutMessage: 'There is no workout scheduled for today. Get some rest!',

            // hidden
            hiddenWorkout: false,
            hiddenWorkoutMessage: '',

            // no edits
            notEditable: false,

            // workout prompt
            copy: {},
            showPrompt: false,

            // loading icon
            loading: false,

            // set warning
            setWarningVisible: false,
            setWarningText: '',
            setWarningOk: false
        };
    },
    computed: {
        contentView() {
            if (this.noWorkoutToday) {
                return 1; 
            } else if (this.hiddenWorkout && !this.noWorkoutToday) {
                return 2;
            } else if (!this.hiddenWorkout && !this.noWorkoutToday && !this.showSimpleView) {
                return 3;
            } else if (!this.hiddenWorkout && !this.noWorkoutToday && this.showSimpleView) {
                return 4; 
            } else {
                return 0; 
            }
        },
        selectedWorkoutDate() {
            return this.selectedDateWithWeekDay.split(": ")[1]; 
        },
        fieldsLeftBlank() {
            let fieldsCount = 0;
            let tempValue = ''; 

            this.subworkouts.forEach((subworkout, subworkoutIndex) => {
                subworkout.dataTableItems.forEach((row, rowIndex) => {
                    row.inputs.forEach((input, inputIndex) => {
                        if (input && (input.status === 'Empty' || input.status === 'Filled')) {
                            tempValue = input.value ? `${input.value}` : ''; 
                            if (tempValue === '') {
                                fieldsCount += 1; 
                               
                            }
                        }
                    });
                });
            });

            return fieldsCount; 
        },
        fieldsFilled() {
            let fieldsCount = 0;
            let tempValue = ''; 

            this.subworkouts.forEach((subworkout, subworkoutIndex) => {
                subworkout.dataTableItems.forEach((row, rowIndex) => {
                    row.inputs.forEach((input, inputIndex) => {
                        if (input && (input.status === 'Empty' || input.status === 'Filled')) {
                            tempValue = input.value ? `${input.value}` : ''; 
                            if (tempValue !== '') {
                                fieldsCount += 1; 
                               
                            }
                        }
                    });
                });
            });

            return fieldsCount; 
        },
    }, 
    watch: {
        date: function(newVal) {
            let index = this.arrayEvents.indexOf(newVal);
            if (index >= 0) {
                let selectedDateInfo = this.workoutDates[index]; 
                this.$session.set('viewingWID', selectedDateInfo.ID);
                this.fetchWorkoutInfo();
                this.noWorkoutToday = false;
            } else {
                this.noWorkoutToday = true;
            }
        }
    }
};

</script>

<style lang="scss">
    @import '~@/demo-common/styles/transitions';
    @import '~@/demo-common/styles/colors';

    .as-workout-container {
        width: 90%; 
        margin: 0 auto;
        height: 100%;
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
                    background-color: $blueGreyBase !important;
                }
            }
        }
    }


    .as-workout {
        display: flex;
        width: 100%;
        flex-wrap: wrap;
        margin-top: 14px;
        overflow: auto;

        .as-subworkout-options {
            h3 {
                font-size: 18px; 
            }
        }

        .as-date-pickers {
            &-text {
                text-align: justify;
                margin-bottom: 16px;
                margin-top: 6px;
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

        .as-subworkout-container {
            flex: 1; 
            margin: 0 20px;
            min-width: 300px;
        }

        .as-simple-workout-container {
            flex: 1; 
            margin: 0 20px;
            margin-bottom: 25px;
            min-width: 735px;
        }
    }

    .as-no-workout {
        display: flex; 
        flex: 1; 
        justify-content: center;
        align-items: center;
    }
</style>