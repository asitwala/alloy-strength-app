<template>
    <tr>
        <td>{{ repRow.name }}</td>
        <td v-for="(repInput, index) in repRow.inputs">
            <v-edit-dialog
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
        }
    };

</script>

<style lang="scss">

</style>