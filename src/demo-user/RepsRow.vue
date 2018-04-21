<template>
    <tr>
        <td>{{ repRow.name }}</td>
        <td v-for="(repInput, index) in repRow.inputs"
            :class="[{'as-editable-rep-row': isEditable(repRow.inputs[index])},
                {'as-alloy-rep-row': repRow.inputs[index].alloy}]">
            <div v-if="repRow.inputs[index].status === 'Fixed'">
                {{ repRow.inputs[index].value }}
            </div>
            <v-edit-dialog
                v-else
                :return-value="repRow.inputs[index].value"
            >{{ repRow.inputs[index].value ? repRow.inputs[index].value : '\u2014' }}
                <v-text-field
                slot="input"
                label="Edit"
                v-model="repRow.inputs[index].value"
                mask="###"
                single-line
                ></v-text-field>
            </v-edit-dialog>
        </td>
    </tr>
</template>

<script>
    export default {
        props: {
            repRow: {
                type: Object,
                required: true
            }
        },
        methods: {
            isEditable(obj) {
                return obj.status === 'Empty' || obj.status === 'Filled';
            }
        }
    };

</script>

<style lang="scss">
    @import '~@/demo-common/styles/colors'; 

    .as-editable-rep-row {
        background-color: $blueLighten4;
        border-left: 1px solid white; 
    }

    .as-alloy-rep-row {
        background-color: $blueGreyBase;
        color: white !important;
        border-left: 1px solid white; 
    }

</style>