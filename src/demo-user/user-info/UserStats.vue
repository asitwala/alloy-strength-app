<template>
<div class="as-user-stats">
    <div class="as-user-stats-header">
        <h2> Level 2 </h2>
        <p class="as-user-stats-level-remaining"> out of 25 </p>
        <v-progress-circular
            :size="100"
            :width="15"
            :rotate="360"
            :value="levelProgress"
            color="primary"
        >
        
        {{ levelProgress }}%
        </v-progress-circular>
        
    </div>
    <p class="as-user-stats-progress-text">{{ levelProgress }}% complete </p>
    <v-progress-linear v-model="levelProgress"/>
    <v-card class="as-user-stats-table">
        <v-card-title>
            <v-data-table
                
                :headers="exerciseTableHeaders"
                :items="exerciseTableItems"
                hide-actions
            >
                <template slot="items" slot-scope="props">
                    <td> {{ props.item.exerciseType }}</td>
                    <td> {{ props.item.exerciseName }}</td>
                    <td> {{ props.item.max }}</td>
                    <td :class="alloyResultClasses(props.item.alloyResult)"> {{ props.item.alloyResult }}</td>
                    <td> {{ props.item.lastSet }}</td>
                </template>
            </v-data-table>    
        </v-card-title>
    </v-card>
</div>
</template>

<script>

export default {
    data() {
        return {
            level: 2,
            exerciseTableHeaders: [
                { text: 'Exercise Type', value: 'exerciseType' },
                { text: 'Exercise Name', value: 'exerciseName' },
                { text: 'Max', value: 'max' },
                { text: 'Alloy Result', value: 'alloyResult' },
                { text: 'Last Set', value: 'lastSet' }
            ],
            exerciseTableItems: [
                {
                    value: false,
                    exerciseType: 'Squat',
                    exerciseName: 'Goblet Box Squat',
                    max: '154',
                    alloyResult: 'FAILED',
                    lastSet: '3 Repx x 154 lbs @ 10 RPE'
                },
                {
                    value: false,
                    exerciseType: 'Hinge',
                    exerciseName: 'DB Pause RDL',
                    max: '164',
                    alloyResult: 'PASSED',
                    lastSet: ''
                },
                {
                    value: false,
                    exerciseType: 'LB Uni Push',
                    exerciseName: 'DB Reverse Lunge',
                    max: '0',
                    alloyResult: 'PASSED',
                    lastSet: '\u2014'
                },
                {
                    value: false,
                    exerciseType: 'Carry',
                    exerciseName: 'Suitcase Carry',
                    max: '\u2014',
                    alloyResult: '\u2014',
                    lastSet: '\u2014'
                },
                {
                    value: false,
                    exerciseType: 'Ant Chain',
                    exerciseName: 'Reverse Crunch',
                    max: '\u2014',
                    alloyResult: '\u2014',
                    lastSet: '\u2014'
                }
            ]

        };
    },
    methods: {
        alloyResultClasses(alloyResult) {
            return {
                'as-alloy-result-failed': alloyResult === 'FAILED',
                'as-alloy-result-passed': alloyResult === 'PASSED'
            }
        }
    },
    computed: {
        levelProgress() {
            return ((this.level / 25) * 100);
        }
    }

};

</script>

<style lang="scss">

    @import '~@/demo-common/styles/colors';

    .as-user-stats {
        width: 85%; 
        margin: 0 auto;
    }

    .as-user-stats-header {
        margin-top: 15px;
        display: flex; 
        justify-content: flex-start;
    }

    .as-user-stats-level-remaining {
        margin-left: 5px;
        line-height: 31px;
        height: 31px;
        margin-top: 2px;
    }

    .as-user-stats-progress-text {
        color: $blueBase;
    }

    .as-user-stats-table {
        margin: 15px 0 25px;

        .card__title {
            padding: 0;
            
            > div {
                width: 100%;
            }
        }

        .as-alloy-result-failed {
            background-color: $redBase;
        }

        .as-alloy-result-passed {
            background-color: $greenAccent3; 
        }

    }

</style>