<template>
    <div class="as-login">
        <v-btn color="primary" @click.stop="openLoginModal">Log In</v-btn>
        <v-dialog
            v-model="showLoginModal"
            max-width="750px"
            transition="as-fade"
            :persistent="true"
            scrollable
            >
            <as-modal-card @close="closeLoginModal">
                <template slot="card-header">
                    <h3>LOG IN</h3>
                </template>
                <template slot="card-body">
                    <v-form ref="loginForm" v-model="validLoginForm" lazy-validation>
                        <v-text-field
                            v-model="username"
                            label="Username"
                            type="text"
                            :rules="usernameRules"
                        />
                        <v-text-field
                            v-model="password"
                            label="Password"
                            :append-icon="loginVisibility ? 'visibility' : 'visibility_off'"
                            :append-icon-cb="() => (loginVisibility = !loginVisibility)"
                            :type="loginVisibility ? 'password' : 'text'"
                            :rules="passwordRules"
                        />
                        <p class="as-forgot-password-link" @click="goToForgotPassword()">Forgot Password?</p>
                    </v-form>
                </template>
                <template slot="card-footer">
                    <v-btn color="primary" @click="loginSubmit">Submit</v-btn>
                </template>
            </as-modal-card>
        </v-dialog>


        <transition name="as-fade" mode="out-in">
            <as-forgot-password v-if="forgotPassword">
            
            </as-forgot-password>
        </transition>
    </div>
</template>


<script>

    import UsersService from '@/services/UsersService'; 

    import AuthCard from '@/demo-common/components/AuthCard'; 
    import ForgotPassword from '@/demo-home/ForgotPassword'; 

    export default {
        components: {
            'as-modal-card': AuthCard,
            'as-forgot-password': ForgotPassword
        },
        data() {
            return {
                showLoginModal: false,
                username: '',
                password: '',
                loginVisibility: true,
                usernameNeeded: false,
                passwordNeeded: false,
                validLoginForm: true,
                invalidUser: false,
                invalidPassword: false,

                // rules
                usernameRules: [
                    v => !this.usernameNeeded || !!v || 'Username is required',
                    v => !this.invalidUser || 'User could not be found'
                ],
                passwordRules: [
                    v => !this.passwordNeeded || !!v || 'Password is required',
                    v => !this.invalidPassword || 'Password is invalid'
                ],

                // forgot password
                forgotPassword: false
            };
        }, 
        methods: {
            goToForgotPassword() {
                this.showLoginModal = false; 
                this.forgotPassword = true; 
            },
            openLoginModal() {
                this.username = '';
                this.password = ''; 
                this.forgotPassword = false; 

                this.loginVisibility = true;
                this.usernameNeeded = false;
                this.passwordNeeded = false;
                this.validLoginForm = true;
                this.invalidUser = false;
                this.invalidPassword = false;
                this.$refs.loginForm.validate();

                this.showLoginModal = true;
            },
            closeLoginModal() {
                this.showLoginModal = false;
            },
            async loginSubmit() {
                var postBody = {};
                postBody.username = this.username;
                postBody.password = this.password;

                this.usernameNeeded = this.username === ""; 
                this.passwordNeeded = this.password === ""; 

                if (this.usernameNeeded || this.passwordNeeded) {
                    this.$refs.loginForm.validate();
                } else {
                    var loginResponse = await UsersService.loginUser(postBody);
                }

                if (loginResponse.data.Found && !loginResponse.data.Success) { // invalid password
                    this.invalidPassword = true;
                    this.$refs.loginForm.validate();
                } else if (!loginResponse.data.Found && !loginResponse.data.Success) { // invalid user
                    this.invalidUser = true; 
                    this.$refs.loginForm.validate();
                } else if (loginResponse.data.Found) {
                    this.invalidPassword = false; 
                    this.$session.set("userFound", true);

                    if (loginResponse.data.Success) {
                        this.$session.set("user", loginResponse.data.User);
                        this.$session.set("viewingWID", loginResponse.data.User.currentWorkoutID);

                        // Manually set accessLevel here for nav sidebar purposes
                        this.setAccessLevelGM(loginResponse.data.accessInfo.accessLevel); 
                        
                        this.closeLoginModal();

                        // Handle routing based on type of user 
                        let isAdmin = loginResponse.data.User.isAdmin; 
                        let hasWorkouts = loginResponse.data.hasWorkouts; 

                        if (isAdmin && !hasWorkouts) {
                            this.$router.push({ name: 'AdminSetLevels' }); // admin to set level 
                        } else if (!isAdmin && !hasWorkouts) {
                            this.$router.push({ name: 'Initialize' }); // beta user to set level 
                        } else {
                            this.$router.push({ name: 'Workout' }); // otherwise, take to workouts page 
                        }
                    }
                }
            },
        },
        watch: {
            password: function() {
                if (this.invalidPassword) {
                    this.invalidPassword = false; 
                    this.$refs.loginForm.validate();
                }
            },
            username: function() {
                if (this.invalidUser) {
                    this.invalidUser = false;
                    this.$refs.loginForm.validate();
                }
            }
        }
    };
</script>


<style lang="scss">

    @import '~@/demo-common/styles/colors';
    @import '~@/demo-common/styles/transitions';

    .as-forgot-password-link {
        color: $blueDarken1;
        margin-bottom: 0px;
        cursor: pointer;
        display: inline-block;
    }




</style>