<template>
    <tr>
        <td>{{ RPERow.name }}</td>
        <td v-for="(RPEInput, index) in RPERow.inputs">
            <v-select
                auto
                :items="RPEOptions"
                label="Select"
                v-model="RPERow.inputs[index].value"
                single-line
            ></v-select>
            <p>
                {{ RPERow.inputs[index].suggested }} *
            </p>
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