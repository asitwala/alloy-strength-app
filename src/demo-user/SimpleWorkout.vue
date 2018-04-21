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
        <td>{{subworkout.name}}</td>
        <td>                        
            <div v-for="Cell in subworkout.dataTableItems[0].inputs" :key="Cell.code">
                <span v-if="Cell.status == 'Fixed'">{{Cell.value}}</span>
                <input v-if="Cell.status =='Filled'" type="text" style="border: 1px solid black; float: right;"
                v-model="Cell.value" v-bind:name="Cell.code">
                <input v-if="Cell.status =='Empty'" type="text" style="border: 1px solid black; float: right;"
                v-model="Cell.value" placeholder="Enter Reps" v-bind:name="Cell.code">
            </div>
        </td>
        <td>                        
            <div v-for="Cell in subworkout.dataTableItems[1].inputs" :key="Cell.code">
                <span v-if="Cell.status == 'Fixed'">{{Cell.value}}</span>
                <v-text-field v-else-if="Cell.status === 'Filled'"
                    solo v-model="Cell.value"></v-text-field>
                <v-text-field v-else-if="Cell.status === 'Empty'"
                    label="Enter Weight"
                    solo v-model="Cell.value"></v-text-field>
            </div>
        </td>
        <td>                        
            <div v-for="Cell in subworkout.dataTableItems[2].inputs" :key="Cell.code">
                <span v-if="Cell.status == 'Fixed'">{{Cell.value}}</span>
                <input v-if="Cell.status =='Filled'" type="text" style="border: 1px solid black; float: right;"
                v-model="Cell.value" v-bind:name="Cell.code">
                <input v-if="Cell.status =='Empty'" type="text" style="border: 1px solid black; float: right;"
                v-model="Cell.value" placeholder="Enter RPE" v-bind:name="Cell.code">
            </div>
        </td>
        <td>                        
            <div v-for="Cell in subworkout.dataTableItems[3].inputs" :key="Cell.code">
                <span v-if="Cell.status == 'Fixed'">{{Cell.stringValue}}</span>
                <input v-if="Cell.status =='Filled'" type="text" style="border: 1px solid black; float: right;"
                v-model="Cell.value" v-bind:name="Cell.code">
                <input v-if="Cell.status =='Empty'" type="text" style="border: 1px solid black; float: right;"
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
        }
    };
</script>

<style lang="scss">

    table.as-workout-simple-view {
        border-collapse: collapse;
        width: 100%;
        flex: 1; 

        td, th {
            border: 1px solid #ddd;
            padding: 8px;
        }
    }

</style>