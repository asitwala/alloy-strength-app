<template>
    <div class="as-set-levels" style="height: 100%;">

        <!-- Loading icon -->
        <div class="as-loading" v-if="loading">
            <v-progress-circular indeterminate color="primary"/>
        </div>
    
        <transition name="as-fade">
            <div class="as-initialize-step-3" v-if="!loading">
                <div class="as-initialize-step-3-container">
                    <div class="as-initialize-step-3-left">

                        <h1 class="as-set-levels-header">{{ title }}</h1>

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
                        <p>We recommend spacing out your workouts throughout the week so that you have at least 1 day of rest between each workout if possible (e.g. Monday, Wednesday, Friday for a 3-day schedule or Tuesday, Thursday, Saturday, Sunday for a 4-day schedule).</p>
                        
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
                    @click="postWorkouts()">Submit</v-btn>
            </div>
        </transition>
    </div>

</template>

<script>
    import UsersService from '@/services/UsersService'; 
    import moment from 'moment'; 
    export default {
        props: {
            givenTitle: {
                type: String,
                default: ''
            },
            reschedule: {
                type: Boolean,
                default: false
            },
            givenLevel: {
                type: Number,
                default: null
            },
            givenBlockNum: {
                type: Number,
                default: null
            }
        },
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
                level: '',

                loading: false
            }
        },
        mounted() {
            if (Number(this.givenLevel) > 0) {
                this.level = this.givenLevel; 
            } else {
                if (this.$session.has('user')) {
                    this.level = this.$session.get('user').level;
                }
            }
        },
        methods: {
            postWorkouts() {
                if (this.selectedDaysLength !== this.numWorkoutDays) {
                    this.validSelectedDays = false; 
                } else {
                    this.validSelectedDays = true;
                }

                console.log('Valid selected days', this.validSelectedDays);

                if (this.validSelectedDays) {
                    this.loading = true; 
                    let daysList = []; 
                    this.selectedDays.forEach(day => {
                        daysList.push(this.days.indexOf(day));
                    })

                    // If we want to rescheule
                    if (this.reschedule) {
                        let params = {
                            restartDate: this.startDateCalendar,
                            DoW: daysList
                        }

                        return UsersService.rescheduleWorkouts(this.$session.get('user').id, params).then(() => {
                            this.$router.push({name: 'Workout'});
                            this.loading = false; 
                        });
                    } else {
                        let params = {
                            startDate: this.startDateCalendar,
                            daysList: daysList
                        };
            
                        return UsersService.adminGenerateWorkouts(this.$session.get('user').id, params).then(()=> {
                            this.$session.set("viewingWID", 1);
                            this.$router.push({name: 'Workout'});
                            this.loading = false;
                        });
                    }
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
            },
            givenLevel: function(newValue) {
                if (Number(newValue) > 0) {
                    this.level = newValue; 
                }
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

                    let blockNum = null;

                    if (this.givenBlockNum > 0) {
                        blockNum = this.givenBlockNum;
                    } else {
                        blockNum = this.$session.get('user').blockNum; 
                    }
             
                    if (blockNum === 1) {
                        return `\u2014 Block ${blockNum}: Volume`; 
                    } else if (blockNum === 2) {
                        return `\u2014 Block ${blockNum}: Strength/Power`; 
                    }
                } else {
                    return ''; 
                }
            },
            title() {
                return this.givenTitle ? this.givenTitle : `You've been placed at Level ${this.level} ${this.blockText}!`;
            }
        }
    };
</script>

<style lang="scss">

    @import "~@/demo-common/styles/colors";

    .as-set-levels {
        padding: 20px;
        height: 100%;

        min-height: 400px;
        position: relative;

        .as-loading {
            position: absolute;
            right: 50%;
        }
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