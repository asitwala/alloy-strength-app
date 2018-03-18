<template>
 <div class="as-workout">
    <div class="as-date-picker">
        <v-date-picker
            width="300"
            v-model="date"
        />
    </div>

    <div class='as-subworkout-container'>
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

export default {
    components: {
        'as-subworkout': Subworkout
    },
    data() {
        return {
            date: null,

            subworkouts: [
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
        margin-top: 20px;

        .as-date-picker {
            margin-bottom: 20px; 
        }

        .as-subworkout-container {
            width: 60%;
            min-width: 400px;
        }
    }
</style>