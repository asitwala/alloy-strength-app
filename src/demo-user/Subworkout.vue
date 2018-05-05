<template>
    <div class="as-subworkout">
        <v-expansion-panel>
            <v-expansion-panel-content>
                <div slot="header" class="as-subworkout-header">
                    <div class="header-container">
                        <v-chip label color="blue darken-4" 
                            text-color="white"
                            style="font-weight:bold;margin-left: 0px">
                            {{ type.toUpperCase() }}
                        </v-chip>
                        <h3 class="as-subworkout-name">{{ name }}</h3>
                        <h4 class="as-subworkout-special-set-name" 
                            :class="dynamicColorClasses"
                            v-if="specialDescriber">{{ specialDescriber }}</h4>
                        <v-tooltip bottom v-if="hasVideo">
                            <v-icon 
                                class="video-icon" 
                                small
                                slot="activator"
                                @click.stop="goToVideo()"
                                >fa-video-camera
                            </v-icon>
                            <span>Watch Video</span>
                        </v-tooltip>
                    </div>
                    <div class="header-exercise-description">
                        <p>{{ describer }}</p>
                        <div class="suggested-weight-string" v-if="suggestedWeightString">
                            <p> | {{ suggestedWeightString }} </p>
                        </div>
                    </div>
                </div>
                <v-card>
                    <v-data-table
                        class="as-subworkout-table"
                        hide-actions
                        :headers="headers"
                        :items="dataTableItems"
                        >
                        <template slot="items" slot-scope="props">
                            <as-rep-row v-if="props.item.id===1"
                                :rep-row="props.item"/>

                            <as-weight-row v-else-if="props.item.id===2"
                                :weight-row="props.item"/>

                            <as-RPE-row v-else-if="props.item.id===3"
                                :RPERow="props.item"
                                :RPEOptions="RPEOptions"/>
                            
                            <as-tempo-row v-else-if="props.item.id===4"
                                :tempo-row="props.item"/>

                        </template>
                    </v-data-table>

                    <v-card-actions>
                        <div class="get-next-set" v-if="hasButton">
                            <v-btn class="get-next-set-button" 
                                @click="getNextSet"
                                color=primary small>{{ buttonDisplay }}</v-btn>
                        </div>
                    </v-card-actions>
                </v-card>

            </v-expansion-panel-content>
        </v-expansion-panel>
    </div>
</template>

<script>

// TODO -- figure out what's the issue with imports 
let RepsRow = require('./RepsRow.vue').default;
let WeightsRow = require('./WeightsRow.vue').default;
let RPERow = require('./RPERow.vue').default; 
let TempoRow = require('./TempoRow.vue').default; 

export default {
    components: {
        'as-rep-row': RepsRow,
        'as-weight-row': WeightsRow,
        'as-RPE-row': RPERow,
        'as-tempo-row': TempoRow
    },
    props: {
        type: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        describer: {
            type: String,
            required: true
        },
        suggestedWeightString: {
            type: String
        },
        specialClass: {
            type: String
        },
        specialDescriber: {
            type: String
        },
        video: {
            type: Object, 
            required: false
        },
        RPEOptions: {
            type: Array,
            required: true
        },
        dataTableItems: {
            type: Array,
            required: true
        },
        number: {
            type: Number
        },
        hasButton: {
            type: Boolean
        },
        buttonName: {
            type: String
        },
        buttonDisplay: {
            type: String,
        },
        headers: {
            type: Array,
            required: true
        }
    },
    methods: {
        goToVideo() {
            this.$router.push({name: "Videos", params: {videoFromWorkout: this.video}});
        },
        getNextSet() {
            this.$emit('refresh', {patternNumber: this.number, buttonName: this.buttonName});
        }   
    },
    computed: {
        hasVideo() {
            return Object.keys(this.video).length > 0; 
        },
        dynamicColorClasses() {
            return {
                'as-strength-stop': (this.specialClass === 'stop'),
                'as-strength-drop': (this.specialClass === 'drop'),
                'as-alloy': (this.specialClass === 'alloy')
            };
        }
    }
};

</script>

<style lang="scss">

    @import '~@/demo-common/styles/colors';

    .as-subworkout {
        width: 100%;
        margin-bottom: 20px;

        &-table {
            tr {
                &:hover {
                    background: transparent !important;
                }
            }
        }
        
        &-name {
            margin: 0px 8px 0px 12px;
            font-size: 20px;
        }

        .expansion-panel__header {
            //background-color: $blueDarken2;
            background-color: $greyLighten2;
            padding-left: 12px;
            padding-top: 12px;
            //background-color: $blueGreyDarken3;
            //color: white; 
        }

        .as-video-button {
            margin: 6px 0px;

            .btn__content {
                background-color: $lightBlueDarken3;
                color: white;
            }
        }

        &-header {
            .header-container {
                display: flex;
                height: 30px;
                align-items: center;

                .video-icon {
                    color: $lightBlueDarken3;
                    padding: 2px 8px;
                }

                .header-divider {
                    margin: 0px 8px;
                }
            }

            .header-exercise-description {
                margin-bottom: 0px !important;
                padding-left: 12px;
                padding-top: 12px;
                display: flex;
                align-items: center;

                .suggested-weight-string {
                    margin-left: 4px;
                }
            }
        }

        .expansion-panel {
            margin-bottom: 20px;
        }

        .small-dialog {
            display: block !important; 
        }
    }

    .get-next-set {
        width: 100%; 
        .get-next-set-button {
            float: right;
        }
    }

    .as-strength-stop {
        color: #1976d2 !important;
    }

    .as-strength-drop {
        color: #4caf50 !important;
    }

    .as-alloy {
        color: red !important;
    }


</style>
