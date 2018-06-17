<template>
    <div>
        <v-dialog
            v-model="showConfirmationModal"
            max-width="750px"
            :persistent="true"
            transition="as-fade"
            scrollable
            >
            <as-modal-card @close="closeConfirmationModal">
                <template slot="card-header">
                    <h3>You've Signed Up!</h3>
                </template>
                <template slot="card-body">
                    <div class="as-signup-confirmation">
                        <div class="as-signup-confirmation-container">
                            <h1>Congratulations!</h1>
                            <p style="margin-bottom: 0px !important;">You have successfully signed up for Alloy Strength!</p>
                            <p>Please check your email after a few minutes for instructions on 
                                <strong>how to activate your account</strong>.
                            </p>
                        </div>
                    </div>
                </template>
                <template slot="card-footer">
                    <v-btn color="green white--text" @click="closeConfirmationModal">Ok</v-btn>
                </template>
            </as-modal-card>
        </v-dialog>
    </div>
</template>

<script>
    import AuthCardGreen from '@/demo-common/components/AuthCardGreen'; 
    export default {
        components: {
            'as-modal-card': AuthCardGreen
        },
        data() {
            return {
                showConfirmationModal: true,
            };
        }, 
        methods: {
            openConfirmationModal() {
                this.showConfirmationModal = true; 
            },
            closeConfirmationModal() {
                this.showConfirmationModal = false;
            }
        }
    };
</script>

<style lang="scss">

    .as-signup-confirmation {
        min-height: 200px;
        display: flex;
        align-items: center;
        text-align: center;

        &-container {
            min-width: 250px;
            max-width: 600px;
            margin: 0 auto;
        }
    }
</style>
