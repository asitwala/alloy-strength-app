<template>
    <div class="as-set-levels">
        <div class="as-initialize-step-3">
            <div class="as-initialize-step-3-container">
                <div class="as-initialize-step-3-left">

                    <h1 class="as-set-levels-header">You've been placed at Level {{ level }} {{ blockText }}!</h1>

                    <h3>Select a start date</h3>
                    <p style="margin-bottom: 0px !important;">Enter below or use by clicking on the calendar to the right.</p>
                    <v-form v-model="validForm">
                        <v-text-field
                            v-model="startDate"
                            :rules="startDateRules"
                            return-masked-value
                            placeholder="MM/DD/YYYY"
                            mask="##/##/####"
                        />
                    </v-form>
                
                    <h3 class="as-initialize-step-3-select-days">
                        Select {{ numWorkoutDays }} days you'd like to work out on
                    </h3>
                    
                    <div class="as-initialize-step-3-days">
                        <div class="as-initialize-step-3-day"
                            v-for="day in days" :key="day">
                            <v-checkbox 
                                color="primary"
                                :label="day" v-model="selectedDays" :value="day">
                            </v-checkbox>
                        </div>
                    </div>

                    <p class="as-select-days-error" v-if="!validSelectedDays">
                        You have selected {{ selectedDaysLength }} workout days. Please select <strong>{{ numWorkoutDays }}</strong>.
                    </p>
                </div>
                <div class="as-initialize-step-3-right as-set-levels-calendar">
                    <v-date-picker v-model="startDateCalendar"></v-date-picker>
                </div>
            </div>
            <v-btn 
                color="primary" 
                class="submit-button"
                @click="generateWorkouts()">Submit</v-btn>
        </div>
    </div>

</template>

<script>
    import UsersService from '@/services/UsersService'; 
    import moment from 'moment'; 
    export default {
        data() {
            return {
                days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                selectedDays: [], 
                startDateCalendar: moment().format(`YYYY-MM-DD`),
                startDate: moment().format(`MM/DD/YYYY`),
                startDateRules: [
                    v => moment(v, 'MM/DD/YYYY', true).isValid() || 'Please use a valid date format.'
                ],
                validForm: false,
                validSelectedDays: true,
                level: ''
            }
        },
        mounted() {
            this.level = this.$session.get('user').level; 
        },
        methods: {
            generateWorkouts() {
                if (this.selectedDaysLength !== this.numWorkoutDays) {
                    this.validSelectedDays = false; 
                } else {
                    this.validSelectedDays = true;
                }

                if (this.validSelectedDays) {
                    let daysList = []; 
                    this.selectedDays.forEach(day => {
                        daysList.push(this.days.indexOf(day));
                    })
                    let params = {
                        startDate: this.startDateCalendar,
                        daysList: daysList
                    };
        
                    return UsersService.adminGenerateWorkouts(this.$session.get('user').id, params).then(()=> {
                        this.$session.set("viewingWID", 1);
                        this.$router.push({name: 'Workout'});
                    });
                }
            },
            supportCalendar(textValue) {
                let dateKeys = textValue.split('/');  // YYYY, MM, DD
                let month = dateKeys[0]; 
                let day = dateKeys[1]; 
                let year = dateKeys[2]; 
                this.startDateCalendar = `${year}-${month}-${day}`;
            },
            supportText(calendarValue) {
                let dateKeys = calendarValue.split('-');  // YYYY, MM, DD
                let month = dateKeys[1]; 
                let day = dateKeys[2]; 
                let year = dateKeys[0]; 
                this.startDate = `${month}/${day}/${year}`;
            }
        },
        watch: {
            startDate: function(newValue) {
                if (moment(newValue, 'MM/DD/YYYY', true).isValid()) {
                    this.supportCalendar(newValue); 
                }
            },
            startDateCalendar: function(newValue) {
                this.supportText(newValue); 
            }
        },
        computed: {
            numWorkoutDays() {
                return this.level < 6 ? 3 : 4; 
            },
            selectedDaysLength() {
                let selectedDaysLen = this.selectedDays.length;
                if (!this.validSelectedDays && (selectedDaysLen === this.numWorkoutDays)) {
                    this.validSelectedDays = true;
                }

                return selectedDaysLen; 
            },
            blockText() {
                if (this.level > 10) {
                    let blockNum = this.$session.get('user').blockNum; 
                    if (blockNum === 1) {
                        return `\u2014 Block ${blockNum}: Volume`; 
                    } else if (blockNum === 2) {
                        return `\u2014 Block ${blockNum}: Strength/Power`; 
                    }
                } else {
                    return ''; 
                }
            }
        }
    };
</script>

<style lang="scss">

    @import "~@/demo-common/styles/colors";

    .as-set-levels {
        padding: 20px;
        height: 100%;
    }

    .as-set-levels-header {
        margin-bottom: 24px;
    }

    .as-set-levels-calendar {
        margin-bottom: 16px;
    }

    .as-initialize-step-3 {
        h2:nth-of-type(2) {
            margin-bottom: 16px; 
        }
    }

    .as-initialize-step-3-select-days {
        margin-bottom: 8px;
    }

    .as-initialize-step-3-days {
        display: flex; 
        flex-wrap: wrap; 
    }

    .as-initialize-step-3-day {
        display: block !important;
        width: 150px;
        min-width: 150px;
    }

    .as-initialize-step-3-container {
        display: flex; 
        flex-wrap: wrap;

        .as-initialize-step-3-left {
            flex: 1; 
            margin-right: 20px;
        }

        .as-initialize-step-3-right {
            width: 300px;
        }
    }

    .submit-button {
        float: right;
    }

    .as-select-days-error {
        color: $redBase !important;
    }

</style>