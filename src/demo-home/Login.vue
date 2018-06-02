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
                    </v-form>
                </template>
                <template slot="card-footer">
                    <v-btn color="primary" @click="loginSubmit">Submit</v-btn>
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
                ]
            };
        }, 
        methods: {
            openLoginModal() {
                this.username = '';
                this.password = ''; 
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
                        this.closeLoginModal();

                        // Handle routing based on type of user 
                        let isAdmin = loginResponse.data.User.isAdmin; 
                        let hasWorkouts = loginResponse.data.hasWorkouts; 

                        if (isAdmin && !hasWorkouts) {
                            this.$router.push({ name: 'AdminSetLevels' }); // admin to set level 
                        } else if (!isAdmin && !hasWorkouts) {
                            this.$router.push({ name: 'SetLevels' }); // beta user to set level 
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

  @import '~@/demo-common/styles/transitions';


</style>