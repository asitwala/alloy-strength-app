<template>
    <div class="as-profile">
        <div class="as-profile-dynamic">
            <h1>Profile</h1>
            
            <v-divider/>
            <v-form>
                <p class="as-profile-desc">Here's where you can view and update your personal information, change your password, and view some of your workout stats.</p>
                <v-expansion-panel class="as-user-panel">
                    <v-expansion-panel-content>
                        <div slot="header" class="as-user-options-header">
                            <h2>User Information</h2>
                        </div>
                        <v-card class="as-user-options">
                            <v-card-text>
                                <v-text-field
                                    v-model="name"
                                    label="Name"
                                />
                                <v-text-field
                                    v-model="username"
                                    label="Username"
                                />
                            </v-card-text>
                        </v-card>
                    </v-expansion-panel-content>
                </v-expansion-panel>
                
                <v-expansion-panel class="as-password-panel">
                    <v-expansion-panel-content>
                        <div slot="header" class="as-password-options-header">
                            <h2>Change Password</h2>
                        </div>

                        <v-card class="as-password-options">
                            <v-card-text>
                                <v-form 
                                    lazy-validation
                                    ref="passwordForm"
                                    v-model="validPasswordForm">
                                    <v-text-field
                                        v-model="oldPassword"
                                        :rules="oldPasswordRules"
                                        label="Old Password"
                                        type="password"
                                    />

                                    <v-text-field
                                        v-model="newPassword"
                                        label="New Password"
                                        :rules="newPasswordRules"
                                    />

                                    <v-text-field
                                        v-model="newPasswordAgain"
                                        :rules="newPasswordAgainRules"
                                        label="Confirm New Password"
                                    />
                                </v-form>
                            </v-card-text>

                            <v-card-actions>
                                <div class="as-profile-card-actions">
                                    <v-btn
                                        :disabled="!validPasswordForm"
                                        color="primary"
                                        @click="changeUserPassword"
                                        class="as-change-password">Change
                                    </v-btn>
                                </div>
                            </v-card-actions>
                        </v-card>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-form>
        </div>

        <div class="as-profile-static">
            <h2 class="as-profile-level-info">Level {{ level }} {{ blockText }} </h2>
            <v-divider/>

            <div class="as-profile-level-progress">
                <v-progress-linear v-model="levelProgress" class="as-profile-level-progress-bar"/>
                <p>{{ progressText}}</p>
            </div>

            <div class="as-no-last-workout" v-if="!lastWorkoutCompleted">
                <h3>{{ noWorkoutMessage }}</h3>
            </div>
            <div class="as-last-workout" v-else>
                <as-last-workout :subworkouts="subworkouts">
                </as-last-workout>
            </div>
        </div>
    </div>
</template>

<script>

import SimpleWorkout from '@/demo-user/SimpleWorkout'; 
import UsersService from '@/services/UsersService'; 

export default {
    components: {
        'as-last-workout': SimpleWorkout
    },
    data() {
        return {
            validPasswordForm: false,
            subworkouts: [],
            newPasswordAgain: '',
            newPasswordAgainRules: [
                v => !!v || 'You must retype your new password to confirm your change.',
                v => v === this.newPassword || 'The new passwords must match.'
            ],
            newPassword: '',
            newPasswordRules: [
                v => !!v || 'A new password is required.'
            ],
            oldPassword: '',
            oldPasswordRules: [
                v => !!v || 'Your old password is required.'
            ],
            name: '',
            username: '',
            active: null,
            sections: [
                'Last Workout Summary', 
            ],
            level: 0,
            blockNum: 0,
            levelProgress: 0,
            progressText: '',
            username: '',

            lastWorkoutCompleted: false,
            noWorkoutMessage: 'You have no completed workouts!'
        }
    },
    mounted() {
        this.level = this.$session.get('user').level; 
        this.fetchLastWorkout();
        this.fetchProfileInfo();
    },
    methods: {
        fetchLastWorkout() {
            UsersService.getLastWorkout(this.userId).then((response) => {
                this.subworkouts = response.data.subworkouts;
                this.lastWorkoutCompleted = response.data.completed; 
            });
        },
        fetchProfileInfo() {
            UsersService.getProfileInfo(this.userId).then((response) => {
                this.level = response.data.level;
                this.blockNum = response.data.blockNum; 
                this.levelProgress = parseFloat(response.data.percentComplete);
                this.progressText = response.data.progressText; 
                this.username = response.data.username; 
            });
        },
        changeUserPassword() {

            console.log(this.validForm);
        
            let params = {
                oldPassword: this.oldPassword,
                newPassword: this.newPassword
            };

            UsersService.changePassword(this.userId, params).then((response) => {
                console.log(response);
            });
        }
    },
    computed: {
        validForm() {
            return this.$refs.passwordForm.validate();
        },
        userId() {
            return this.$session.get('user').id;
        },
        blockText() {
            if (this.level > 10) {
                if (this.blockNum === 1) {
                    return `\u2014 Block ${this.blockNum}: Volume`; 
                } else if (this.blockNum === 2) {
                    return `\u2014 Block ${this.blockNum}: Strength/Power`; 
                }
            } else {
                return ''; 
            }
        }
    }
}

</script>

<style lang="scss">
    @import "~@/demo-common/styles/colors";

    .as-profile {
        display: flex; 
        flex-wrap: wrap; 
        height: 100%;

        .expansion-panel__header {
            background-color: $greyLighten3;
        }

        .as-profile-desc {
            margin-top: 16px;
        }

        .as-profile-dynamic {
            margin: 16px;
            min-width: 500px;
            max-width: 500px;
            flex: 1; 

            .as-password-options, .as-user-options {
                padding-top: 0px !important;
                padding-left: 8px;
                padding-right: 8px;
                padding-bottom: 16px;

                .card__text {
                    //padding-top: 0px !important;
                }
                
                .card__actions {
                    padding-top: 0px !important;
                }
            }
        }

        .as-password-options-header, .as-user-options-header {
            padding-top: 8px;
            padding-bottom: 8px;
        }

        .as-profile-static {
            padding: 20px 16px;
            flex: 1;
            border-left: 1px solid $greyLighten3; 

            .as-profile-level-info {
                margin-bottom: 7px;
            }

            .as-profile-level-progress {
                display: flex;
                align-items: center;
                
                p {
                    margin: 14px;
                }

                &-bar {
                    flex: 1; 
                }
            }
        }

        .as-profile-card-actions  {
            width: 100%; 

            .as-change-password {
                float: right !important;
            }
        }

        .as-user-panel {
            margin-bottom: 16px;
        }
    }

    .as-no-last-workout {
        display: flex; 
        flex: 1; 
        height: 100%;
        justify-content: center;
        align-items: center; 
    }

</style>