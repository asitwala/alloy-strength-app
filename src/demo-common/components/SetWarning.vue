<template>

    <div class="as-set-warning">
        <v-dialog v-model="visible" max-width="290" persistent>
            <v-card>
            <v-card-text>{{ text }}</v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" flat="flat" @click.native="closeWarning">Ok</v-btn>
            </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>

export default {
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        text: {
            type: String,
            default: ''
        }
    },
    methods: {
        closeWarning() {
            this.$emit('close');
        }
    }
};

</script>


<style lang="scss">


</style>