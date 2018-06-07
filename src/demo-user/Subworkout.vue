<template>
    <div class="as-subworkout">
        <v-expansion-panel>
            <v-expansion-panel-content>
                <div slot="header" class="as-subworkout-header">
                    <div class="header-container-block" style="display:block">
                        <div class="header-container">
                            <v-chip label color="blue darken-4" 
                                text-color="white"
                                style="font-weight:bold;margin-left: 0px; margin-right:12px;margin-bottom: 12px;">
                                {{ type.toUpperCase() }}
                            </v-chip>
                            <h3 class="as-subworkout-name" style="line-height:20px !important;margin-left: 0px !important; margin-bottom:12px;">{{ name }}</h3>
                            <h4 class="as-subworkout-special-set-name" 
                                style="margin-bottom: 12px; margin-top: 2px"
                                :class="dynamicColorClasses"
                                v-if="specialDescriber">{{ specialDescriber }}</h4>
                            <v-tooltip bottom v-if="hasVideo">
                                <v-icon 
                                    class="as-video-icon" 
                                    small
                                    slot="activator"
                                    @click.stop="goToVideo()"
                                    >fa-video-camera
                                </v-icon>
                                <span>Watch Video</span>
                            </v-tooltip>
                        </div>
                    </div>
                    <div class="header-description-block" style="display:block">
                        <div class="header-exercise-description">
                            <p style="padding-right: 12px;">{{ describer }}</p>
                            <div class="suggested-weight-string" v-if="suggestedWeightString">
                                <p style="padding-left: 12px; border-left: 1px solid #aaa">{{ suggestedWeightString }} </p>
                            </div>
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
                        <div class="get-next-set" v-if="hasButton && !notEditable">
                            <v-btn class="get-next-set-button" 
                                @click="showSetWarning"
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
        notEditable: {
            type: Boolean
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
        },
        warnNextSet: {
            type: Boolean
        },
        warningText: {
            type: String
        },
        setWarningOk: {
            type: Boolean
        }
    },
    methods: {
        goToVideo() {
            this.$router.push({name: "Videos", params: {videoFromWorkout: this.video}});
        },
        getNextSet() {
            this.$emit('refresh', {patternNumber: this.number, buttonName: this.buttonName});
        },
        showSetWarning() {
            if (this.warnNextSet) {
                let warningInfo = {
                    warnNextSet: this.warnNextSet,
                    warningText: this.warningText
                };
                this.$emit('showWarning', warningInfo);
            } else {
                this.getNextSet();
            }
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
    },
    watch: {
        setWarningOk: function(newVal) {
            if (newVal && this.warnNextSet) {
                this.getNextSet();
            }
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

        .as-video-icon {
            margin-left: 6px;
            margin-right: 6px;
            margin-bottom: 12px;
        }

        &-header {
            .header-container {
                display: flex;
                flex-wrap: wrap;
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
