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
            <tr v-for="subworkout in subworkouts" :key="subworkout.name">
                <td>
                    {{subworkout.type}}
                    <input v-if="subworkout.hasButton" type="submit" 
                    v-bind:value="subworkout.buttonDisplay" 
                    v-bind:name="subworkout.buttonName" 
                    @click="updateSpecial(subworkout.number, subworkout.buttonName)"
                    style="margin-top:5px; border: 1px solid black !important;"/>
                </td>
                <td>
                <span>{{subworkout.name}}</span>
                <span>{{subworkout.describer}}</span>
                <br>
                <a v-if="subworkout.hasVideo" @click="goToVideo(subworkout.selectedVideo)"><b>Watch Video</b></a></td>
                <td>                        
                    <div v-for="Cell in subworkout.dataTableItems[0].inputs" :key="Cell.code">
                        <span v-if="Cell.status == 'Fixed'">{{Cell.value}}</span>
                        <input v-if="Cell.status =='Filled'" type="text" style="border: 1px solid black;"
                        v-model="Cell.value" v-bind:name="Cell.code">
                        <input v-if="Cell.status =='Empty'" type="text" style="border: 1px solid black;"
                        v-model="Cell.value" placeholder="Enter Reps" v-bind:name="Cell.code">
                    </div>
                </td>
                <td>                        
                    <div v-for="Cell in subworkout.dataTableItems[1].inputs" :key="Cell.code">
                        <span v-if="Cell.status == 'Fixed'">{{Cell.value}}</span>
                        <input v-if="Cell.status =='Filled'" type="text" style="border: 1px solid black; padding-left:5px;"
                        v-model="Cell.value" placeholder="Enter Weight" v-bind:name="Cell.code" 
                        defaultValue="Cell.value">
                        <input v-if="Cell.status =='Empty'" type="text" style="border: 1px solid black; padding-left:5px;"
                        v-model="Cell.value" placeholder="Enter Weight" v-bind:name="Cell.code">
                    </div>
                </td>
                <td>                        
                    <div v-for="Cell in subworkout.dataTableItems[2].inputs" :key="Cell.code">
                        <span v-if="Cell.status == 'Fixed'">{{Cell.value}}                            
                        </span>
                        
                        <select v-model="Cell.value" v-if="Cell.status =='Filled'" style ="webkit-appearance: menulist; border: 1px solid black;">
                            <option :value="Cell.value">{{Cell.value}}</option>
                            <option :value="option" v-for="option in subworkout.RPEOptions" :key="option">{{option}}</option>
                        </select>
                        <select v-model="Cell.value" defaultValue="Select RPE" 
                        v-if="Cell.status =='Empty'" style ="webkit-appearance: menulist; border: 1px solid black;">
                            <option :value="null" disabled>Select RPE</option>
                            <option :value="option" v-for="option in subworkout.RPEOptions" :key="option">{{option}}</option>
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
            subworkouts: {
                type: Array, 
                default: () => []
            }
        },
        methods: {
            goToVideo(video) {
                this.$router.push({name: "Videos", params: {videoFromWorkout: video}});
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
                // let type = req.body.specialType;
                this.subworkouts.forEach((subworkout, subworkoutIndex) => {
                    subworkout.dataTableItems.forEach((row, rowIndex) => {
                        // if (rowIndex == patternNumber - 1 && subworkout.) {
                        //     let RPECode
                        // }
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
        }
    };
</script>

<style lang="scss">

    @import "~@/demo-common/styles/colors";

    .as-workout-simple-view-container {
        flex: 1;
        min-width: 400px;
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