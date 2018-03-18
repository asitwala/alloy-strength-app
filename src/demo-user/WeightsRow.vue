<template>
    <tr>
        <td>{{ weightRow.name }}</td>
        <td v-for="(weightInput, index) in weightRow.inputs">
            <v-edit-dialog
                :return-value="weightRow.inputs[index]"
            >{{ weightRow.inputs[index] ? weightRow.inputs[index] : '\u2014' }}
                <v-text-field
                slot="input"
                label="Edit"
                v-model="weightRow.inputs[index]"
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
        }
    };

</script>

<style lang="scss">

</style>