<template>
    <tr>
        <td>{{ weightRow.name }}</td>
        <td v-for="(weightInput, index) in weightRow.inputs"
            :class="[{'as-editable-weight-row': isEditable(weightRow.inputs[index])},
                {'as-alloy-weight-row': weightRow.inputs[index].alloy }]">
            <div v-if="weightRow.inputs[index].status === 'Fixed'">
                {{ weightRow.inputs[index].value }}
            </div>
            <v-edit-dialog
                v-else
                :return-value="weightRow.inputs[index].value"
            >{{ weightRow.inputs[index].value ? weightRow.inputs[index].value : '\u2014' }}
                <v-text-field
                slot="input"
                label="Edit"
                v-model="weightRow.inputs[index].value"
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
            weightRow: {
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

    .as-editable-weight-row {
        background-color: $lightBlueLighten2;
        border-left: 1px solid white; 
    }

    .as-alloy-weight-row {
        background-color: $orangeLighten2;
        border-left: 1px solid white; 
    }

</style>