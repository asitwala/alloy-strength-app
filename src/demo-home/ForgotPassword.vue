
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
                    <h3>Forgot your password?</h3>
                </template>
                <template slot="card-body">
                    <div class="as-forgot-password">
                        <div class="as-forgot-container">
                            <h2 style="margin-top: 4px; margin-bottom: 12px;">No worries! We're on it!</h2>

                            <h4>STEP 1</h4>
                            <v-form ref="FPForm" v-model="validFPForm" lazy-validation>
                                <v-text-field
                                    label="Please enter your email"
                                    v-model="email"
                                    type="text"
                                    :rules="emailRules">
                                </v-text-field>
                            </v-form>
                     
                            <h4>STEP 2</h4>
                            <p style="margin-bottom: 0px !important">
                                Please click the button below to generate a temporary password that will be sent to your email.
                            </p>
                            <div style="display: flex; flex-wrap: wrap; align-items: center;">
                                <v-btn style="margin-left: 0px !important; margin-bottom: 24px;" 
                                color="primary" :disabled="buttonInactive" @click="sendFPEmail">Send Email</v-btn>
                                <p v-if="sentEmail" style="margin-bottom: 24px;">An email was sent!</p>
                            </div>
                        

                            <h4>STEP 3</h4>
                            <p style="margin-bottom: 0px !important;">
                                Once you receive this temporary password, log into Electrum Performance and visit your 
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
    import emailRegex from '@/demo-common/mixins/emailRegex'; 
    import AuthCard from '@/demo-common/components/AuthCard'; 

    import UsersService from '@/services/UsersService'; 

    export default {
        components: {
            'as-modal-card': AuthCard
        },
        data() {
            return {
                showFPModal: true,
                sentEmail: false, 
                email: '',
                
                // rules
                emailRules: [
                    v => !this.invalidEmail || 'Invalid email. Please try again.'
                ],

                validFPForm: true,
                invalidEmail: false
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
                this.invalidEmail = !emailRegex.test(this.email);

                if (this.$refs.FPForm.validate()) {
                    UsersService.forgotPassword({email: this.email}).then(() => {
                        this.sentEmail = true; 
                    });
                }
            }
        },
        computed: {
            buttonInactive() {
                return (this.email === '' || this.sentEmail); 
            }
        },
        watch: {
            email: function () {
                if (this.invalidEmail) {
                    this.invalidEmail = false; 
                    this.$refs.FPForm.validate(); 
                }
            }
        }
    };
</script>

<style lang="scss">

    .as-forgot-password {
        min-height: 200px;
        display: flex;
        align-items: center;

        &-container {
            min-width: 250px;
            max-width: 600px;
            margin: 0 auto;
        }
    }
</style>
