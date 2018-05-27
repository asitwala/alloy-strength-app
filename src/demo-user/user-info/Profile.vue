<template>
    <div class="as-profile-container">
        <as-notification
            :visible="notificationVisible"
            type="submit"
            @update-visibility="val => notificationVisible = val">
            <template slot="notification-content">
                <span> {{ notificationMessage }}</span>
            </template>
        </as-notification>

        <div class="as-profile">
            <div class="as-profile-dynamic">
                <h1>Profile</h1>
                
                <v-divider/>
                <v-form>
                    <p class="as-profile-desc">Here's where you can manage your account and view some of your workout stats.</p>
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
                                        ref="passwordForm"
                                        v-model="validPasswordForm"
                                        lazy-validation
                                        >
                                        <v-text-field
                                            v-model="oldPassword"
                                            :rules="oldPasswordRules"
                                            label="Old Password"
                                            :append-icon="oldPasswordVisibility ? 'visibility' : 'visibility_off'"
                                            :append-icon-cb="() => (oldPasswordVisibility = !oldPasswordVisibility)"
                                            :type="oldPasswordVisibility ? 'password' : 'text'"
                                        />

                                        <v-text-field
                                            v-model="newPassword"
                                            label="New Password"
                                            :rules="newPasswordRules"
                                            :append-icon="newPasswordVisibility ? 'visibility' : 'visibility_off'"
                                            :append-icon-cb="() => (newPasswordVisibility = !newPasswordVisibility)"
                                            :type="newPasswordVisibility ? 'password' : 'text'"
                                        />

                                        <v-text-field
                                            v-model="newPasswordAgain"
                                            :rules="newPasswordAgainRules"
                                            label="Confirm New Password"
                                            :append-icon="newPasswordAgainVisibility ? 'visibility' : 'visibility_off'"
                                            :append-icon-cb="() => (newPasswordAgainVisibility = !newPasswordAgainVisibility)"
                                            :type="newPasswordAgainVisibility ? 'password' : 'text'"
                                        />
                                    </v-form>
                                </v-card-text>

                                <v-card-actions>
                                    <div class="as-profile-card-actions">
                                        <v-btn
                                            color="primary"
                                            @click="changeUserPassword"
                                            class="as-change-password">Change
                                        </v-btn>
                                    </div>
                                </v-card-actions>
                            </v-card>
                        </v-expansion-panel-content>
                    </v-expansion-panel>

                    <v-expansion-panel class="as-user-panel">
                        <v-expansion-panel-content>
                            <div slot="header" class="as-user-options-header">
                                <h2>Change Subscription</h2>
                            </div>
                            <v-card class="as-user-options">

                                <v-card-text>
                                    <h4>
                                        Your current subscription package is 
                                        <v-chip label :class="oldPackageColorClasses"
                                            small
                                            text-color="white"
                                            style="font-weight:bold; margin: 0 4px;">
                                            {{ oldPackage ? oldPackage.name: '' }}
                                        </v-chip>
                                        <span class="font-size: 14px !important; font-weight: normal !important">($15/Month for 6 Months)</span>
                                    </h4>

                                    <p style="font-size: 12px; margin-top: 4px;">Your subscription will expire on ${Date}</p>

                                    <div class="as-divider">
                                        <v-divider/>
                                    </div>
                                    
                                    <h4 style="margin-top: 12px">Switch Package</h4>
                                    <p style="font-size: 12px; margin-top: 4px; margin-bottom: 0px;">Use this section to switch to another subscription package</p>

                                    <div style="display: flex; justify-content: space-between; align-items: center;">
                                        <h4>
                                            <v-chip label :class="newPackageColorClasses"
                                                small
                                                text-color="white"
                                                style="font-weight:bold; margin: 0px; margin-right: 4px;">
                                                {{ newPackage ? newPackage.name: '' }}
                                            </v-chip>
                                            ($25/Month)
                                        </h4> 
                                        <v-btn @click="confirmSwitch"
                                            small color="primary" style="float: right; margin-top: 8px; margin-bottom: 16px; margin-right: 0px !important;">Switch Subscription</v-btn>
                                    </div>
                                
                                        
                                    <v-divider style="clear: both"/>

                                    <v-btn @click="confirmCancel"
                                        small color="red" style="color: white !important; clear: both; float: right; margin-top: 16px; margin-bottom: 16px; margin-right: 0px !important;">Cancel Subscription</v-btn>
                            
                                </v-card-text>
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

        <v-dialog v-model="showDialog" max-width="290" persistent>
            <v-card>
            <v-card-text>{{ dialogText }}</v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" flat="flat" @click.native="showDialog = false">No</v-btn>
                <v-btn color="primary" flat="flat" @click.native="showDialog = false">Yes</v-btn>
            </v-card-actions>
            </v-card>
        </v-dialog>
    
    </div>
    
</template>

<script>

import Notification from '@/demo-common/components/Notification'; 
import SimpleWorkout from '@/demo-user/SimpleWorkout'; 
import UsersService from '@/services/UsersService'; 

export default {
    components: {
        'as-last-workout': SimpleWorkout,
        'as-notification': Notification
    },
    data() {
        return {
            validPasswordForm: true,
            subworkouts: [],
            newPasswordAgainNeeded: false,
            newPasswordAgainVisibility: true,
            newPasswordAgain: '',
            newPasswordAgainRules: [
                v => !this.newPasswordAgainNeeded || !!v || 'You must retype your new password to confirm your change',
                v => this.passwordsMatch || 'The new passwords must match'
            ],
            passwordsMatch: true,
            newPasswordNeeded: false,
            newPasswordVisibility: true,
            newPassword: '',
            newPasswordRules: [
                v => !this.newPasswordNeeded || !!v || 'A new password is required'
            ],
            oldPasswordNeeded: false,
            wrongOldPassword: false,
            oldPasswordVisibility: true,
            oldPassword: '',
            oldPasswordRules: [
                v => !this.oldPasswordNeeded || !!v || 'Your old password is required',
                v => !this.wrongOldPassword || 'Password is invalid'
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
            noWorkoutMessage: 'You have no completed workouts!',

            notificationVisible: false,
            notificationMessage: `You have successfully changed your password!`,

            oldPackage: {
                name: "Gold",
                description: "6 MONTHS",
                price: "$90.00 ($15.00/Month)",
                radioLabel: 'radio-0'
            },

            newPackage: {
                name: "Silver",
                description: "MONTHLY",
                price: "$25.00/Month",
                radioLabel: 'radio-1'
            },

            asPackages: [
                {
                    name: "Gold",
                    description: "6 MONTHS",
                    price: "$90.00 ($15.00/Month)",
                    radioLabel: 'radio-0'
                },
                {
                    name: "Silver",
                    description: "MONTHLY",
                    price: "$25.00/Month",
                    radioLabel: 'radio-1'
                }
            ],

            showDialog: false,
            dialogText: ''

        }
    },
    mounted() {
        this.level = this.$session.get('user').level; 
        this.fetchLastWorkout();
        this.fetchProfileInfo();
    },
    methods: {
        notificationAcknowledged() {
            
        },
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
            this.oldPasswordNeeded = this.oldPassword === '';
            this.newPasswordNeeded = this.newPassword === ''; 
            this.newPasswordAgainNeeded = this.newPasswordAgain === '';
          
            this.passwordsMatch = (this.newPassword === this.newPasswordAgain);
            let anyPasswordsEmpty = this.oldPasswordNeeded || this.newPasswordNeeded || this.newPasswordAgainNeeded;
            if (!this.passwordsMatch || anyPasswordsEmpty) {
                this.$refs.passwordForm.validate();
            } else {
                let params = {
                    oldPassword: this.oldPassword,
                    newPassword: this.newPassword
                };

                UsersService.changePassword(this.userId, params).then((response) => {
                    if (response.data.error && response.status && response.data.status === 'Wrong Password') {
                        this.wrongOldPassword = true; 
                    } else {
                        console.log('i get here');
                        this.notificationVisible = true; 
                    }

                    this.$refs.passwordForm.validate();
                });
            }
        },
        confirmCancel() {
            this.dialogText = 'Are you sure you want to cancel your subscription to Alloy Strength Training?'; 
            this.showDialog = true; 
        },
        confirmSwitch() {
            this.dialogText = `Are you sure you want to switch your subscription to ${this.newPackage.name}?`; 
            this.showDialog = true; 
        }
    },
    computed: {
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
        },
        oldPackageColorClasses() {
            return {
                'as-selected-package-gold': this.oldPackage ? this.oldPackage.name === 'Gold' : false,
                'as-selected-package-silver': this.oldPackage ? this.oldPackage.name === 'Silver' : false
            };
        },
        newPackageColorClasses() {
            return {
                'as-selected-package-gold': this.newPackage ? this.newPackage.name === 'Gold' : false,
                'as-selected-package-silver': this.newPackage ? this.newPackage.name === 'Silver' : false
            };
        }
    },
    watch: {
        oldPassword: function() {
            if (this.wrongOldPassword) {
                this.wrongOldPassword = false; 
                this.$refs.passwordForm.validate();
            }
        },
        newPassword: function() {
            if (!this.passwordsMatch) {
                this.passwordsMatch = true; 
                this.$refs.passwordForm.validate();
            }
        },
        newPasswordAgain: function() {
            if (!this.passwordsMatch) {
                this.passwordsMatch = true; 
                this.$refs.passwordForm.validate();
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
        min-height: 500px;

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
            min-width: 300px;
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

        .as-user-panel, .as-password-panel {
            margin-bottom: 16px;
        }
    }

    .as-selected-package-gold {
        background-color: $amberLighten1 !important;
    }

    .as-selected-package-silver {
        background-color: $greyLighten1 !important;
    }

    .as-no-last-workout {
        display: flex; 
        flex: 1; 
        height: 465px;
        justify-content: center;
        align-items: center; 
    }


</style>