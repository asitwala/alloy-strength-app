<template>
    <div class="as-signup">
        <v-btn color="primary" @click.stop="openSignupModal">Sign Up</v-btn>
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
                            v-model="name"
                            label="Name"
                            type="text"
                        />
                        <v-text-field
                            v-model="email"
                            label="Email"
                            type="text"
                        />
                        <v-text-field
                            v-model="password"
                            label="Password"
                            :append-icon="signupVisibility1 ? 'visibility' : 'visibility_off'"
                            :append-icon-cb="() => (signupVisibility1 = !signupVisibility1)"
                            :type="signupVisibility1 ? 'password' : 'text'"
                        />
                        <v-text-field
                            v-model="confirmPassword"
                            label="Confirm Password"
                            :append-icon="signupVisibility2 ? 'visibility' : 'visibility_off'"
                            :append-icon-cb="() => (signupVisibility2 = !signupVisibility2)"
                            :type="signupVisibility2 ? 'password' : 'text'"
                        />
                    </v-form>
                </template>
                <template slot="card-footer">
                    <v-btn color="primary" @click="signupSubmit">Submit</v-btn>
                </template>
            </as-modal-card>
        </v-dialog>
    </div>

</template>


<script>

    import UsersService from '@/services/UsersService'; 

    import AuthCard from '@/demo-common/components/AuthCard'; 

    export default {
        components: {
            'as-modal-card': AuthCard
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
                signupVisibility2: true

                // rules
            };
        }, 
        methods: {
            openSignupModal() {
                this.name = '';
                this.email = '';
                this.password = '';
                this.confirmPassword = ''; 
                this.showSignupModal = true; 
            },
            closeSignupModal() {
                this.showSignupModal = false;
            },
            signupSubmit() {
                let params = {
                    P1: this.password,
                    P2: this.password,
                    username: this.email
                };

                UsersService.signupUser(params).then(response => {
                   let userId = response.data.newUser.id;

                   UsersService.sendEmailConfirmation(userId).then(response => {
                       console.log('SUCCESS', response);
                   });
                });
            }
        }
    };
</script>


<style lang="scss">

</style>