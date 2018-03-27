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
                class="as-workout-date-back-btn"
                fab 
                small
                color="primary">
                <v-icon>fa-angle-left</v-icon>
            </v-btn>

            <v-select
                class="body-1"
                :items="workoutDates"
                v-model="selectedWorkoutDate"
                label="Select workout dates"
                single-line
            ></v-select>

            <v-btn
                class="as-workout-date-next-btn"
                fab 
                small
                color="primary">
                <v-icon>fa-angle-right</v-icon>
            </v-btn>
        </div>

    </div>

    <div class='as-subworkout-container'>
        <p class="as-subworkout-suggested-disclaimer">* = suggested value</p>
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
        async fetchWorkoutInfo() {
            let response = await WorkoutService.fetchWorkoutInfo();
            this.subworkouts = response.data.subworkouts;
            //this.subworkouts = this.subworkoutsOld;
            this.date = response.data.date;
        }
    },
    data() {
        return {
            date: '',
            selectedWorkoutDate: '',
            subworkouts: [],
            workoutDates: [
                "Week 1: Day 1  \u2014  March 9, 2018",
                "Week 1: Day 2  \u2014  March 12, 2018",
                "Week 1: Day 3  \u2014  March 15, 2018",
                "Week 2: Day 1  \u2014  March 18, 2018",
                "Week 2: Day 2  \u2014  March 21, 2018",
            ],
            subworkoutsOld: [
                {
                    name: 'Goblet Box Squat',
                    RPEOptions: [
                        "1", 
                        "2", 
                        "3", 
                        "4",
                        "5-6", 
                        "7", 
                        "8", 
                        "9-10"
                    ],
                    dataTableItems: [
                        {
                            value: false,
                            id: 1, 
                            name: 'Reps/Time(s)',
                            inputs: ['', '', '', '']
                        },
                        {
                            value: false,
                            id: 2,
                            name: 'Weights',
                            filledSets: [145, 150, 160],
                            inputs: ['', '', '', ''],
                            editable: false,
                        },
                        {
                            value: false,
                            id: 3,
                            name: 'RPE',
                            inputs: ['', '', '', '']
                        },
                        {
                            value: false,
                            id: 4,
                            name: 'Tempo',
                            inputs: [
                                ['', '', ''],
                                ['', '', ''],
                                ['', '', ''],
                                ['', '', '']
                            ]
                        }
                    ],
                },
                {
                    name: 'DB Seated Overhead Press',
                    RPEOptions: [
                        "1", 
                        "2", 
                        "3", 
                        "4",
                        "5-6", 
                        "7", 
                        "8", 
                        "9-10"
                    ],
                    dataTableItems: [
                        {
                            value: false,
                            id: 1, 
                            name: 'Reps/Time(s)',
                            inputs: ['', '', '', '']
                        },
                        {
                            value: false,
                            id: 2,
                            name: 'Weights',
                            inputs: ['', '', '', '']
                        },
                        {
                            value: false,
                            id: 3,
                            name: 'RPE',
                            inputs: ['', '', '', '']
                        },
                        {
                            value: false,
                            id: 4,
                            name: 'Tempo',
                            inputs: [
                                ['', '', ''],
                                ['', '', ''],
                                ['', '', ''],
                                ['', '', '']
                            ]
                        }
                    ],  
                },
                {
                    name: 'DB Pause RDL',
                    RPEOptions: [
                        "1",  
                        "2", 
                        "3", 
                        "4",
                        "5-6", 
                        "7", 
                        "8", 
                        "9-10"
                    ],
                    dataTableItems: [
                        {
                            value: false,
                            id: 1, 
                            name: 'Reps/Time(s)',
                            inputs: ['', '', '', '']
                        },
                        {
                            value: false,
                            id: 2,
                            name: 'Weights',
                            inputs: ['', '', '', '']
                        },
                        {
                            value: false,
                            id: 3,
                            name: 'RPE',
                            inputs: ['', '', '', '']
                        },
                        {
                            value: false,
                            id: 4,
                            name: 'Tempo',
                            inputs: [
                                ['', '', ''],
                                ['', '', ''],
                                ['', '', ''],
                                ['', '', '']
                            ]
                        }
                    ],
                },
                {
                    name: 'CC Neutral Row',
                    RPEOptions: [
                        "1", 
                        "2", 
                        "3", 
                        "4",
                        "5-6", 
                        "7", 
                        "8", 
                        "9-10"
                    ],
                    dataTableItems: [
                        {
                            value: false,
                            id: 1, 
                            name: 'Reps/Time(s)',
                            inputs: ['', '', '', '']
                        },
                        {
                            value: false,
                            id: 2,
                            name: 'Weights',
                            inputs: ['', '', '', '']
                        },
                        {
                            value: false,
                            id: 3,
                            name: 'RPE',
                            inputs: ['', '', '', '']
                        },
                        {
                            value: false,
                            id: 4,
                            name: 'Tempo',
                            inputs: [
                                ['', '', ''],
                                ['', '', ''],
                                ['', '', ''],
                                ['', '', '']
                            ]
                        }
                    ]
                },
                {
                    name: 'Reverse Crunch',
                    RPEOptions: [
                        "1", 
                        "2", 
                        "3", 
                        "4",
                        "5-6", 
                        "7", 
                        "8", 
                        "9-10"
                    ],
                    dataTableItems: [
                        {
                            value: false,
                            id: 1, 
                            name: 'Reps/Time(s)',
                            inputs: ['', '', '', '']
                        },
                        {
                            value: false,
                            id: 2,
                            name: 'Weights',
                            inputs: ['', '', '', '']
                        },
                        {
                            value: false,
                            id: 3,
                            name: 'RPE',
                            inputs: ['', '', '', '']
                        },
                        {
                            value: false,
                            id: 4,
                            name: 'Tempo',
                            inputs: [
                                ['', '', ''],
                                ['', '', ''],
                                ['', '', ''],
                                ['', '', '']
                            ]
                        }
                    ],
                }
            ]
        };
    }
};

</script>

<style lang="scss">
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

        .as-subworkout-container {
            width: 60%;
            min-width: 400px;
        }
    }
</style>