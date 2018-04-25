<template>
    <div class="admin-set-levels">
        <div class="as-initialize-step-3">
            <div class="as-initialize-step-3-container">
                <div class="as-initialize-step-3-left">

                    <h3>Select a level</h3>
                    <v-select 
                        auto
                        :items="levels"
                        :label="level ? level : `Level`"
                        v-model="level"
                        single-line/>
                    
                    <div v-if="level >= 11">
                        <h3>Select a Block Number</h3>
                        <v-select 
                            auto
                            :items="blockNums"
                            :label="blockNum ? blockNum : `Block Number`"
                            v-model="blockNum"
                            single-line/>
                    </div>

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

                
                    <h3 class="as-initialize-step-3-select-days">Select 3-4 days you'd like to work out on.</h3>
                    <p>3 days if Level < 6 and 4 days if Level >= 6</p>
                    
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
                level: '',
                levels: Array.from({length: 25}, (v, k) => k+1),
                blockNum: '0',
                blockNums: ['1', '2']
            }
        },
        methods: {
            generateWorkouts() {

                let daysList = []; 
                this.selectedDays.forEach(day => {
                    daysList.push(this.days.indexOf(day));
                })
                let params = {
                    startDate: this.startDateCalendar,
                    daysList: daysList,
                    newLevel: this.level,
                    blockNum: parseInt(this.blockNum)
                };
    
                return UsersService.adminGenerateWorkouts(this.$session.get('user').id, params).then(()=> {
                    this.$router.push({name: 'Workout'});
                });
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

    .admin-set-levels {
        padding: 20px;
        height: 100%;
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

</style>