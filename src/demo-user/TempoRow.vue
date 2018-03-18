<template>
    <tr class='as-tempo-row'>
        <td>{{ tempoRow.name }}</td>
        <td v-for="(tempoCol, colIndex) in tempoRow.inputs">
            <div class='as-tempo-col'>
                <v-edit-dialog
                    v-for="(tempoItem, itemIndex) in tempoCol" :key="itemIndex"
                    :return-value="tempoRow.inputs[colIndex][itemIndex]"
                >{{ tempoRow.inputs[colIndex][itemIndex] ? tempoRow.inputs[colIndex][itemIndex] : '\u2014' }}
                    <v-text-field
                    slot="input"
                    label="Edit"
                    v-model="tempoRow.inputs[colIndex][itemIndex]"
                    mask="#"
                    single-line
                    ></v-text-field>
                    <div class="as-tempo-divider" v-if="itemIndex < 2"></div>
                </v-edit-dialog>
            </div>
        </td>
    </tr>
</template>

<script>
    export default {
        props: {
            tempoRow: {
                type: Object,
                required: true
            }
        }
    };

</script>

<style lang="scss">
    .as-tempo-row {
        .as-tempo-col {
            display: flex;
            width: 100px;
            flex-direction: row !important; 
        }
    }
    .as-tempo-divider {
        height: 15px; 
        width: 2px !important; 
        background-size: 1px 2px; 
        background-image: linear-gradient(to bottom, black 50%, transparent 50%);
        background-repeat: repeat-y; 
        margin: 0 12px;
    }

</style>