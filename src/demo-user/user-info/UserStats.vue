<template>
<div class="as-user-stats">

     <!-- Loading icon -->
    <div class="as-loading" v-if="loading">
        <v-progress-circular indeterminate color="primary"/>
    </div>

    <transition name="as-fade">
        <div class="as-user-stats-actual-content" v-if="!loading">
            <div class="as-user-stats-header">
                <h1>Your Workout Stats for Level {{ level }} {{ blockText }}</h1>
                <div class="as-user-stats-meta">
                    <v-progress-circular
                        :size="125"
                        :width="15"
                        :rotate="360"
                        :value="levelProgress"
                        color="primary"
                        class="as-user-stats-meta-diagram"
                    >
                    <div class="as-user-stats-meta-diagram-text">
                        <p class="as-user-stats-meta-diagram-text-level"><b>Level {{ level }}</b></p>
                        <v-divider class="as-user-stats-meta-diagram-text-divider"/>
                        <p class="as-user-stats-meta-diagram-text-percent">{{ levelProgress }}% complete</p>
                    </div>
                    
                    </v-progress-circular>
                    <div class="as-user-stats-meta-text">
                        <p><b>Workouts Completed:</b> {{ completed }} out of {{ total }} ({{ levelProgress }}%)</p>
                    </div>
                </div>
            </div>
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
    </transition>

</div>
</template>

<script>

import StatsService from '@/services/StatsService'; 

export default {
    data() {
        return {
            userId: 1,
            level: 0,
            blockNum: 0,
            exerciseTableHeaders: [
                { text: 'Exercise Type', value: 'exerciseType' },
                { text: 'Exercise Name', value: 'exerciseName' },
                { text: 'Max', value: 'max' },
                { text: 'Alloy Result', value: 'alloyResult' },
                { text: 'Last Set', value: 'lastSet' }
            ],
            exerciseTableItems: [],
            levelProgress: 0,
            completed: 0,
            total: 0,

            loading: false
        };
    },
    mounted() {
        this.loading = true; 
        this.fetchStatsInfo().finally(() => {
            this.loading = false;
        }); 
    },
    methods: {
        fetchStatsInfo() {
            this.userId = this.$session.get('user').id; 

            return StatsService.fetchStatsInfo(this.userId).then(response => {
                if (this.validAccessLevelGM(response.data.accessLevel)) {
                    this.handleAccessLevelGM(response.data.accessLevel);
                }
                this.level = response.data.level; 
                this.blockNum = response.data.blockNum;
                this.exerciseTableItems = response.data.exerciseTableItems;
                this.levelProgress = parseFloat(response.data.percentComplete); 
                this.completed = response.data.nWorkoutsComplete; 
                this.total = response.data.nWorkouts; 
            });
        },
        alloyResultClasses(alloyResult) {
            return {
                'as-alloy-result-failed': alloyResult === 'FAILED',
                'as-alloy-result-passed': alloyResult === 'PASSED'
            }
        }
    },
    computed: {
        blockText() {
            if (this.level > 10) {
                if (this.blockNum === 1) {
                    return `\u2014 Block ${this.blockNum}: Volume`; 
                } else if (this.blockNum === 2) {
                    return `\u2014 Block ${this.blockNum}: Strength/Power`; 
                }
            } else {
                return ''; 
            }
        }
    }
};

</script>

<style lang="scss">

    @import '~@/demo-common/styles/colors';

    .as-user-stats {
        width: 85%; 
        margin: 0 auto;
        height: 100%;
    }

    .as-user-stats-header {
        margin-top: 15px;
    }

    .as-user-stats-meta {
        display: flex;
        margin-top: 15px;
         

        &-diagram {
            margin-right: 15px;
            margin-bottom: 5px;

            &-text {
                &-level {
                    text-align: center;
                    line-height: 0px;
                    margin-top: 25px;
                }

                &-divider {
                    width: 80%; 
                    margin: 0 auto;
                }

                &-percent {
                    text-align: center;
                }
            }
        }

        &-text {
            margin-top: 25px;

            p {
                color: black;
                line-height: 18px;
            }
        }
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