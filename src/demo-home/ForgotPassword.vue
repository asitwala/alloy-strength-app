
<template>
    <div>
        <v-dialog
            v-model="showFPModal"
            max-width="750px"
            :persistent="true"
            transition="as-fade"
            scrollable
            >
            <as-modal-card @close="closeFPModal">
                <template slot="card-header">
                    <h3>Forgot your password? No worries, we're on it!</h3>
                </template>
                <template slot="card-body">
                    <div class="as-forgot-password">
                        <div class="as-forgot-container">
                            <p style="margin-bottom: 4px !important">
                                Please click the button below to generate a temporary password that will be sent to your email.
                            </p>

                            <v-btn color="primary" :disabled="sendEmailButtonClicked" @click="sendFPEmail">Send Email</v-btn>

                            <p style="margin-top: 4px; margin-bottom: 0px !important;">
                                Once you receive this temporary password, log into Alloy Strength and visit your 
                                    <strong>Profile</strong> page to change your password.
                            </p>
                        </div>
                    </div>
                </template>
                <template slot="card-footer">
                    <v-btn color="primary" @click="closeFPModal">Close</v-btn>
                </template>
            </as-modal-card>
        </v-dialog>
    </div>
</template>

<script>
    import AuthCard from '@/demo-common/components/AuthCard'; 
    export default {
        components: {
            'as-modal-card': AuthCard
        },
        props: {
            email: {
                type: String
            }
        },
        data() {
            return {
                showFPModal: true,
                sendEmailButtonClicked: false
            };
        }, 
        methods: {
            openFPModal() {
                this.showFPModal = true; 
            },
            closeFPModal() {
                this.showFPModal = false;
            },
            sendFPEmail() {
                console.log('I get here!');
                this.sendEmailButtonClicked = true; 
            }
        }
    };
</script>

<style lang="scss">

    .as-forgot-password {
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
