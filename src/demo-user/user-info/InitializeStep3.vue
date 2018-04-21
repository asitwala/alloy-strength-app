<template>
    <div class="as-initialize-step-3">
        <h2>You've been placed at LEVEL {{ level }}</h2>
        <h2>You're almost there! All that's left is to select your workout days.</h2>

        <div class="as-initialize-step-3-container">
            <div class="as-initialize-step-3-left">
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

                <h3 class="as-initialize-step-3-select-days">Select {{ numWorkoutDays }} days you'd like to work out on</h3>
                
                <div class="as-initialize-step-3-days">
                    <div class="as-initialize-step-3-day"
                        v-for="day in days" :key="day">
                        <v-checkbox 
                            color="primary"
                            :label="day" v-model="selectedDays" :value="day">
                        </v-checkbox>
                    </div>
                </div>
            </div>
            <div class="as-initialize-step-3-right">
                <v-date-picker v-model="startDateCalendar"></v-date-picker>
            </div>
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
                level: this.$session.get('user').level
            }
        },
        methods: {
            generateWorkouts() {
                let params = {
                    startDate: this.startDateCalendar,
                    workoutLevel: this.$session.get('user').level,
                    workoutBlock: this.$session.get('user').blockNum
                };
                this.selectedDays.forEach((selectedDay, index) => {
                    params[`Day-${index + 1}`] = this.days.indexOf(selectedDay);
                });
    
                return UsersService.generateWorkouts(this.$session.get('user').id, params);
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
            },
            calculateDays() {
                //moment(this.startdate, "YYYY-MM-DD").add('days', 5);
                //
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
            }
        }
    };
</script>

<style lang="scss">

    .as-initialize-step-3 {
        h2:nth-of-type(2) {
            margin-bottom: 16px; 
        }
    }

    .as-initialize-step-3-select-days {
        padding-bottom: 16px;
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

</style>