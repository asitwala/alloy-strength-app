<template>
    <tr>
        <td>{{ RPERow.name }}</td>
        <td v-for="(RPEInput, index) in RPERow.inputs">
            <v-select
                :items="RPEOptions"
                v-model="RPERow.inputs[index]"
                label="Select"
                single-line
            ></v-select>
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
        }
    };

</script>

<style lang="scss">

</style>