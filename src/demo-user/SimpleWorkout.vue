<template>
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
        <td>{{subworkout.type}}</td>
        <td>
        <span>{{subworkout.name}}</span>
        <span>{{subworkout.describer}}</span>
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
                <span v-if="Cell.status == 'Fixed'">{{Cell.value}}</span>
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

</template>

<script>
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
            }
        }
    };
</script>

<style lang="scss">

    table.as-workout-simple-view {
        width: 100% !important;
        border-collapse: collapse;
        flex: 1; 

        td, th {
            border: 1px solid #ddd;
            padding: 8px;
            min-width: 100px;
            text-align: center;

            // &:nth-of-type(1) {
            //     min-width: 100px !important;
            // }
            // &:nth-of-type(2) {
            //     min-width: 150px !important;
            // }
            // &:nth-of-type(3) {
            //     min-width: 100px !important;
            //     max-width: 100px !important;

            //     input {
            //         min-width: 50px !important;
            //         max-width: 50px !important;
            //     }
            // }
            
        }
    }

</style>