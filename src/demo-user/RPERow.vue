<template>
    <tr>
        <td>{{ RPERow.name }}</td>
        <td v-for="(RPEInput, index) in RPERow.inputs"
            :class="{'as-editable-RPE-row': isEditable(RPERow.inputs[index])}">
            <div v-if="RPERow.inputs[index].status === 'Fixed'">
                {{ RPERow.inputs[index].value }}
            </div>
            <div class="as-RPE-options"
                v-else>
                <v-select
                auto
                :items="RPEOptions"
                label="RPE"
                v-model="RPERow.inputs[index].value"
                single-line
                ></v-select>
                <p class="as-RPE-suggested">
                    ({{ RPERow.inputs[index].suggested }})
                </p>
            </div>
        </td>
    </tr>
</template>

<script>
    export default {
        props: {
            RPERow: {
                type: Object,
                required: true
            },
            RPEOptions: {
                type: Array,
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

    .as-editable-RPE-row {
        background-color: $lightBlueLighten2;
        border-left: 1px solid white; 
    }

    .as-RPE-options {
        display: flex; 
        justify-content: space-between;
    }

    .as-RPE-suggested {
        padding-top: 22px;
        margin-left: 8px;
        font-size: 14px;
    }

</style>