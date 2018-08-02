<template>
    <div class="as-signup">
        <v-btn color="green" style="color: white !important;" @click.stop="openSignupModal">Sign Up</v-btn>
        <v-dialog
            v-model="showSignupModal"
            max-width="750px"
            transition="as-fade"
            :persistent="true"
            scrollable
            >
            <as-modal-card @close="closeSignupModal">
                <template slot="card-header">
                    <h3>SIGN UP</h3>
                </template>
                <template slot="card-body">
                    <v-form ref="signupForm" v-model="validSignupForm" lazy-validation>
                        <v-text-field
                            color="green"
                            v-model="name"
                            label="Name"
                            type="text"
                            :rules="nameRules"
                        />
                        <v-text-field
                            color="green"
                            v-model="email"
                            label="Email"
                            type="text"
                            :rules="emailRules"
                        />
                        <v-text-field
                            color="green"
                            v-model="password"
                            label="Password"
                            :append-icon="signupVisibility1 ? 'visibility' : 'visibility_off'"
                            :append-icon-cb="() => (signupVisibility1 = !signupVisibility1)"
                            :type="signupVisibility1 ? 'password' : 'text'"
                            :rules="passwordRules"
                        />
                        <v-text-field
                            color="green"
                            v-model="confirmPassword"
                            label="Confirm Password"
                            :append-icon="signupVisibility2 ? 'visibility' : 'visibility_off'"
                            :append-icon-cb="() => (signupVisibility2 = !signupVisibility2)"
                            :type="signupVisibility2 ? 'password' : 'text'"
                            :rules="confirmPasswordRules"
                        />
                    </v-form>
                </template>
                <template slot="card-footer">
                    <v-btn color="green white--text" @click="signupSubmit">Submit</v-btn>
                </template>
            </as-modal-card>
        </v-dialog>

        <transition name="as-fade" mode="out-in">
            <as-confirmation v-if="signupSuccess">
            </as-confirmation>
        </transition>


    </div>

</template>


<script>

    import emailRegex from '@/demo-common/mixins/emailRegex'; 

    import UsersService from '@/services/UsersService'; 

    import AuthCardGreen from '@/demo-common/components/AuthCardGreen'; 
    import SignupConfirmation from '@/demo-home/SignupConfirmation';

    export default {
        components: {
            'as-modal-card': AuthCardGreen,
            'as-confirmation': SignupConfirmation
        },
        data() {
            return {
                showSignupModal: false,
                validSignupForm: true,

                // inputs 
                name: '',
                email: '',
                password: '',
                confirmPassword: '',


                // visibility
                signupVisibility1: true,
                signupVisibility2: true,

                signupSuccess: false,

                // rules
                invalidEmail: false,
                passwordsDoNotMatch: false,
                nameEntered: true,
                emailEntered: true,
                passwordEntered: true,
                confirmPasswordEntered: true,
                passwordMinimumLength: true,

                nameRules: [
                    v => this.nameEntered || 'Name is required.'
                ],

                emailRules: [
                    v => this.emailEntered || 'Email is required.',
                    v => !this.invalidEmail || 'Invalid email format. Please try again.'
                ],
                passwordRules: [
                    v => this.passwordEntered || 'Password is required.',
                    v => this.passwordMinimumLength || 'Password must contain at least 8 characters.',
                    v => !this.passwordsDoNotMatch || 'Passwords do not match.'
                ],
                confirmPasswordRules: [
                    v => this.confirmPasswordEntered || 'Password confirmation is required.'
                ]
            };
        }, 
        methods: {
            openSignupModal() {
                this.signupSuccess = false; 
                this.name = '';
                this.email = '';
                this.password = '';
                this.confirmPassword = ''; 
                this.showSignupModal = true; 
                this.invalidEmail = false;
                this.passwordsDoNotMatch = false;

                this.nameEntered = true;
                this.emailEntered = true;
                this.passwordEntered = true;
                this.confirmPasswordEntered = true;

                this.$refs.signupForm.validate();
            },
            closeSignupModal() {
                this.showSignupModal = false;
            },
            signupSubmit() {
                // Check email and passwords
                this.invalidEmail = !emailRegex.test(this.email);
                this.passwordsDoNotMatch = (this.password !== this.confirmPassword);
                this.nameEntered = (this.name !== ''); 
                this.emailEntered = (this.email !== ''); 
                this.passwordEntered = (this.password !== ''); 
                this.confirmPasswordEntered = (this.confirmPassword !== ''); 
                this.passwordMinimumLength = (this.password.length >= 8);

                if (this.$refs.signupForm.validate()) {
                    let params = {
                        name: this.name,
                        P1: this.password,
                        P2: this.password,
                        username: this.email
                    };

                    this.closeSignupModal();

                    UsersService.signupUser(params).then(response => {
                        let userId = response.data.newUser.id;

                        UsersService.sendEmailConfirmation(userId).then(response => {
                            this.signupSuccess = true;
                        });
                    });
                }
            }
        },
        watch: {
            name: function () {
                if (!this.nameEntered) {
                    this.nameEntered = true; 
                    this.$refs.signupForm.validate(); 
                }
            },
            email: function () {
                if (!this.emailEntered) {
                    this.emailEntered = true; 
                    this.$refs.signupForm.validate(); 
                }

                if (this.invalidEmail) {
                    this.invalidEmail = false;
                    this.$refs.signupForm.validate(); 
                }
            }, 
            password: function () {
                if (!this.passwordEntered) {
                    this.passwordEntered = true;             
                    this.$refs.signupForm.validate();
                }

                if (!this.passwordMinimumLength) {
                    this.passwordMinimumLength = true; 
                    this.$refs.signupForm.validate();
                }

                if (this.passwordsDoNotMatch) {
                    this.passwordsDoNotMatch = false; 
                    this.$refs.signupForm.validate(); 
                }
            },
            confirmPassword: function () {
                if (!this.confirmPasswordEntered) {
                    this.confirmPasswordEntered = true; 
                    this.$refs.signupForm.validate(); 
                }

                if (this.passwordsDoNotMatch) {
                    this.passwordsDoNotMatch = false; 
                    this.$refs.signupForm.validate(); 
                }
            }
        }
    };
</script>


<style lang="scss">

</style>