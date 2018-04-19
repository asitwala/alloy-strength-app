<template>
<div id="simpleTable" v-if="simpleView">
            <form id="simpleViewForm">
                <table style="width:100%; margin-top:10px; margin-bottom:10px;">
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
                    <td class="dividedCell" style="padding:0px !important; position: relative;">                        
                        <div v-for="Cell in subworkout.dataTableItems[0].inputs" :key="Cell.code" style="border:solid 1px black; padding-left:5px;">
                            {{Cell.code}}
                            <span v-if="Cell.status == 'Fixed'">{{Cell.value}}</span>
                            <input v-if="Cell.status =='Filled'" type="text" style="border: 1px solid black; float: right;"
                            v-model="Cell.value" v-bind:name="Cell.code">
                            <input v-if="Cell.status =='Empty'" type="text" style="border: 1px solid black; float: right;"
                            v-model="Cell.value" placeholder="Enter Reps" v-bind:name="Cell.code">
                        </div>
                    </td>
                    <td class="dividedCell" style="padding:0px !important; position: relative;">                        
                        <div v-for="Cell in subworkout.dataTableItems[1].inputs" :key="Cell.code" style="border:solid 1px black; padding-left:5px;">
                            {{Cell.code}}
                            <span v-if="Cell.status == 'Fixed'">{{Cell.value}}</span>
                            <input v-if="Cell.status =='Filled'" type="text" style="border: 1px solid black; float: right;"
                            v-model="Cell.value" v-bind:name="Cell.code">
                            <input v-if="Cell.status =='Empty'" type="text" style="border: 1px solid black; float: right;"
                            v-model="Cell.value" placeholder="Enter Weight" v-bind:name="Cell.code">
                        </div>
                    </td>
                    <td class="dividedCell" style="padding:0px !important; position: relative;">                        
                        <div v-for="Cell in subworkout.dataTableItems[2].inputs" :key="Cell.code" style="border:solid 1px black; padding-left:5px;">
                            {{Cell.code}}
                            <span v-if="Cell.status == 'Fixed'">{{Cell.value}}</span>
                            <input v-if="Cell.status =='Filled'" type="text" style="border: 1px solid black; float: right;"
                            v-model="Cell.value" v-bind:name="Cell.code">
                            <input v-if="Cell.status =='Empty'" type="text" style="border: 1px solid black; float: right;"
                            v-model="Cell.value" placeholder="Enter RPE" v-bind:name="Cell.code">
                        </div>
                    </td>
                    <td class="dividedCell" style="padding:0px !important; position: relative;">                        
                        <div v-for="Cell in subworkout.dataTableItems[3].inputs" :key="Cell.code" style="border:solid 1px black; padding-left:5px;">
                            {{Cell.code}}
                            <span v-if="Cell.status == 'Fixed'">{{Cell.stringValue}}</span>
                            <input v-if="Cell.status =='Filled'" type="text" style="border: 1px solid black; float: right;"
                            v-model="Cell.value" v-bind:name="Cell.code">
                            <input v-if="Cell.status =='Empty'" type="text" style="border: 1px solid black; float: right;"
                            v-model="Cell.value" placeholder="Enter Tempo" v-bind:name="Cell.code">                            
                        </div>
                    </td>
                </tr>
                </table>
            </form>
        </div>

</template>

<script>
    export default {
        props: {
            subworkouts: 
                type: Array 
                default: () => []
            }
        }
    };
</script>

<style lang="scss">

</style>