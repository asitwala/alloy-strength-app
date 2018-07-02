<template>
    <div class="as-workout-simple-view-container">
        <table class="as-workout-simple-view">
            <tr>
                <th>Pattern</th>
                <th>Exercise</th> 
                <th>Reps</th>
                <th>Weight</th>
                <th>RPE</th>
                <th>Tempo</th>
            </tr>
            <tr v-for="subworkout in subworkouts" :key="subworkout.number">
                <td>
                    {{subworkout.type}}
                    <span v-if="subworkout.specialDescriber && subworkout.class == 'stop'" style="color:#1976d2;">
                    <br/><b>{{subworkout.specialDescriber}}</b></span>
                    
                    <span v-if="subworkout.specialDescriber && subworkout.class == 'drop'" style="color:#4caf50;">
                    <br/><b>{{subworkout.specialDescriber}}</b></span>

                    <span v-if="subworkout.specialDescriber && subworkout.class == 'alloy'" style="color:red;">
                    <br/><b>{{subworkout.specialDescriber}} ({{subworkout.alloyReps}}+)</b></span>
                    
                    <span style="font-size:12px;"><br/><b>{{subworkout.describer}}</b></span>
                </td>
                <td>
                <span>{{subworkout.name}} 
                    <!-- {{subworkout.class}} -->
                </span>
                    <p v-if="subworkout.class == 'bodyweight'" style="margin-bottom: 0px !important">
                        <b>Bodyweight Exercise</b>
                    </p>
                    <p v-if="subworkout.simpleWeightString" style="margin-bottom: 0px !important">
                        <b>{{ subworkout.simpleWeightString }}</b>
                    </p>

                    <v-btn v-if="subworkout.hasButton && !notEditable"
                        small
                        color="primary"
                        @click="showSetWarning(subworkout.number, subworkout.buttonName, subworkout.warnNextSet, subworkout.warningText)"
                    >{{ subworkout.buttonDisplay }}</v-btn>

                    <p><a v-if="subworkout.hasVideo" @click="goToVideo(subworkout.selectedVideo)"><b>Watch Video</b></a></p>
                </td>
                <td>                        
                    <div v-for="Cell in subworkout.dataTableItems[0].inputs" :key="Cell.code">
                        <span v-if="Cell.status == 'Fixed'">{{Cell.value}}</span>
                        <input v-if="Cell.status =='Filled'" type="text" style="border: 1px solid black;"
                        v-model="Cell.value" v-bind:name="Cell.code">
                        <input v-if="Cell.status =='Empty' && (!Cell.alloy)" type="text" style="border: 1px solid black;"
                        v-model="Cell.value" placeholder="Enter Reps" v-bind:name="Cell.code">
                        <input v-if="Cell.status =='Empty' && Cell.alloy" type="text" style="border: 1px solid black;"
                        v-model="Cell.value" :placeholder="subworkout.alloyReps + '+'" v-bind:name="Cell.code">
                    </div>
                </td>
                <td>                        
                    <div v-for="Cell in subworkout.dataTableItems[1].inputs" :key="Cell.code">
                        <span v-if="Cell.status == 'Fixed'">{{Cell.value}}</span>
                        <input v-if="Cell.status =='Filled'" type="text" style="border: 1px solid black; padding-left:5px;"
                        v-model="Cell.value" :placeholder="'Suggested: ' + Cell.suggestedWeight + ' lbs'" v-bind:name="Cell.code" 
                        defaultValue="Cell.value">
                        <input v-if="Cell.status =='Empty'" type="text" style="border: 1px solid black; padding-left:5px;"
                        v-model="Cell.value" :placeholder="'Suggested: ' + Cell.suggestedWeight + ' lbs'" v-bind:name="Cell.code">
                    </div>
                </td>
                <td>                        
                    <div v-for="Cell in subworkout.dataTableItems[2].inputs" :key="Cell.code">
                        <span v-if="Cell.status == 'Fixed'">{{Cell.value}}                            
                        </span>
                        
                        <select v-model="Cell.value" v-if="Cell.status =='Filled'" 
                        style ="webkit-appearance: menulist; border: 1px solid black;">
                            <option :value="Cell.value">{{Cell.value}}</option>
                            <option :value="option" v-for="option in subworkout.RPEOptions" :key="option">{{option}}</option>
                        </select>
                        <select v-model="Cell.value" defaultValue="Select RPE" 
                            v-if="Cell.status =='Empty'" style ="webkit-appearance: menulist; border: 1px solid black;">
                            <option :value="null" disabled v-if="Cell.suggested">Select RPE ({{Cell.suggested}})</option>
                            <option :value="null" disabled v-if="!Cell.suggested">Select RPE</option>
                            <option :value="option" v-for="option in subworkout.RPEOptions" :key="option">
                                <span v-if="Cell.suggested ? formatRPESelectSuggested(option, Cell.suggested) : false">{{option}} (suggested)</span>
                                <span v-else>{{option}}</span>
                                </option>
                        </select>
                    </div>
                </td>
                <td>                        
                    <div v-for="Cell in subworkout.dataTableItems[3].inputs" :key="Cell.code">
                        <span v-if="Cell.status == 'Fixed'">{{Cell.stringValue}}</span>
                        <input v-if="Cell.status =='Filled'" type="text" style="border: 1px solid black;"
                        v-model="Cell.value" v-bind:name="Cell.code">
                        <input v-if="Cell.status =='Empty'" type="text" style="border: 1px solid black;"
                        v-model="Cell.value" placeholder="Enter Tempo" v-bind:name="Cell.code">                            
                    </div>
                </td>
            </tr>
        </table>
    </div>


</template>

<script>
    import WorkoutService from '@/services/WorkoutService';
    export default {
        props: {
            notEditable: {
                type: Boolean
            },
            subworkouts: {
                type: Array, 
                default: () => []
            },
            setWarningOk: {
                type: Boolean
            }
        },
        data() {
            return {
                patternNumber: null,
                buttonName: null
            };
        },
        methods: {
            formatRPESelectSuggested(option, suggested) {
                if (suggested) {
                    let case1 = suggested; 
                    let split = suggested.split('-');
                    let case2 = split.length > 1; 
                    let case3 = parseFloat(option) >= split[0];
                    let case4 = parseFloat(option) <= split[1];

                    return option === (case1 || case2 && case3 && case4);
                }
            },
            goToVideo(video) {
                this.$router.push({name: "Videos", params: {videoFromWorkout: video}});
            },
            showSetWarning(patternNumber, buttonName, warnNextSet, warningText) {
                if (warnNextSet) {
                    this.patternNumber = patternNumber;
                    this.buttonName = buttonName; 

                    let warningInfo = {
                        warnNextSet: warnNextSet,
                        warningText: warningText
                    }

                    this.$emit('showWarning', warningInfo);
                    
                } else {
                    this.updateSpecial(patternNumber, buttonName);
                }
            },
            updateSpecial(patternNumber, buttonName) {
                let userId = this.$session.get("user").id;
                let vWID = this.$session.get("viewingWID");
                let tempKey = '';
                let tempValue = '';  
                let body = {};
                let splitCode = buttonName.split("|");
                body.specialType = splitCode[1];
                body.patternNum = splitCode[2];
                this.subworkouts.forEach((subworkout, subworkoutIndex) => {
                    subworkout.dataTableItems.forEach((row, rowIndex) => {
                        row.inputs.forEach((input, inputIndex) => {
                            if (input && (input.status === 'Empty' || input.status === 'Filled')) {
                                tempKey = input.code
                                tempValue = input.value ? `${input.value}` : '';
                                body[tempKey] = tempValue; 
                            }
                        });
                    });
                });
                
                WorkoutService.updateSpecial(userId, vWID, patternNumber, body).then((response) => {
                    if (response) {
                        this.$emit('refresh'); 
                    }
                });
            }
        },
        watch: {
            setWarningOk: function(newVal) {
                if (newVal) {
                    this.updateSpecial(this.patternNumber, this.buttonName);
                }
            }
        }
    };
</script>

<style lang="scss">

    @import "~@/demo-common/styles/colors";

    .as-workout-simple-view-container {
        flex: 1;
        min-width: 735px;
        margin-top: 16px;
    }

    table.as-workout-simple-view {
        width: 100%;
        border-collapse: collapse;
        table-layout: fixed;
        overflow: auto;
        
        td, th {
            border: 1px solid #ddd;
            min-width: 100px;
            overflow: auto;
            padding: 0 1px;
            text-align: center;

            input:not(:first-child), select:not(:first-child), div:not(:first-child), span:not(:first-child) {
                margin-top: 1px;
            }

            input:first-child, select:first-child, div:first-child, span:first-child {
                // border-top: 1px solid white;
            }

            input, select, div, span {
                width: 100%;
                height: 24px !important;
                text-align: center !important;
            }

            input {
                border-radius: 5px;
            }

            select {
            }

            input, select {
                border: 0px solid white !important;
                background-color: $blueLighten4 !important;
            }
        }

        td:nth-of-type(1), td:nth-of-type(2) {
            padding: 0 8px;
        }

        th {
            padding: 8px;
        }
    }

</style>