<template>
    <div class="as-profile-container-container">
        <div class="as-loading" v-if="loading">
            <v-progress-circular indeterminate color="primary"/>
        </div>

        <transition name="as-fade">
            <div class="as-profile-container" v-if="!loading">
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
                                                readonly

                                            />
                                            <v-text-field
                                                v-model="username"
                                                label="Email"
                                                readonly
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
                                            <h3>
                                                Your current subscription package is 
                                                <v-chip label :class="oldPackageColorClasses"
                                                    small
                                                    text-color="white"
                                                    style="font-weight:bold; margin: 0 4px;">
                                                    {{ oldPackage ? oldPackage.name: '' }}
                                                </v-chip>
                                                <span class="font-size: 14px !important; font-weight: normal !important">{{ oldPackage ? oldPackage.price : '' }}</span>
                                            </h3>

                                            <p style="font-size: 14px; margin-top: 4px;"
                                                v-if="oldPackage && subscriptionInfo.endDateString" v-html="`Your subscription will expire on <strong>${subscriptionInfo.endDateString}</strong>. 
                                                ${subscriptionInfo.secondLine}`"></p>

                                            <div class="as-divider">
                                                <v-divider/>
                                            </div>
                                            
                                            <h3 style="margin-top: 12px">Switch Subscription</h3>
                                            <p style="font-size: 14px; margin-top: 4px; margin-bottom: 0px;">If you <strong>switch</strong> your subscription package, changes will become effective AFTER your current
                                            subscription expires. </p>

                                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                                <v-select
                                                    auto
                                                    label="Select a Package"
                                                    :items="asPackagesSelect"
                                                    v-model="newPackageSelect"
                                                    single-line
                                                />
                                                <v-btn @click="confirmSwitch"
                                                    :disabled="!newPackageSelect"
                                                    small color="primary" style="float: right; margin-top: 8px; margin-bottom: 16px; margin-right: 0px !important;">Switch Subscription</v-btn>
                                            </div>
                                        
                                                
                                            <v-divider style="clear: both"/>

                                            <div>
                                                <h3 style="margin-top: 12px;">Cancel Subscription</h3>
                                                <p style="font-size: 14px; margin-top: 4px; margin-bottom: 0px;">After you <strong>cancel</strong> your subscription, you will still have access to Alloy Strength until your subscription's expiration date.</p>
                                                
                                                <v-btn @click="confirmCancel"
                                                small color="red" style="color: white !important; clear: both; float: right; margin-top: 16px; margin-bottom: 16px; margin-right: 0px !important;">Cancel Subscription</v-btn>
                                            </div>
                            
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
                        <v-btn color="primary" flat="flat" @click.native="handleDialogYes">Yes</v-btn>
                    </v-card-actions>
                    </v-card>
                </v-dialog>
            
            </div>
        
        </transition>
    
    </div>

  
    
</template>

<script>

import Notification from '@/demo-common/components/Notification'; 
import SimpleWorkout from '@/demo-user/SimpleWorkout'; 
import UsersService from '@/services/UsersService'; 

let defaultPackages = [
    {text: 'Gold ($15/Month for 6 Months)', disabled: false},
    {text: 'Silver ($25/Month)', disabled: false}
];

let packageMappings = {
    'Silver': ['Gold ($15/Month for 6 Months)'],
    'Gold': ['Silver ($25/Month)']
};

let packagePrices = {
    'Gold': '($15/Month for 6 Months)',
    'Silver': '($25/Month)'
};

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

            subscriptionInfo: {},
            oldPackage: {},
            newPackage: '',
            asPackagesSelect: [],
            newPackageSelect: null,

            showDialog: false,
            dialogText: '',
            dialogState: '', // cancel or switch

            loading: false
        }
    },
    created() {
        this.loading = true;
        this.level = this.$session.get('user').level; 
        let promises = []; 
        promises.push(this.fetchLastWorkout());
        promises.push(this.fetchProfileInfo());
        promises.push(this.fetchSubscriptionInfo());

        Promise.all(promises).finally(() => {
            this.loading = false; 
        });  
    },
    methods: {
        notificationAcknowledged() {
            
        },
        fetchLastWorkout() {
            return UsersService.getLastWorkout(this.userId).then((response) => {
                this.subworkouts = response.data.subworkouts;
                this.lastWorkoutCompleted = response.data.completed; 
            });
        },
        fetchProfileInfo() {
            return UsersService.getProfileInfo(this.userId).then((response) => {
                if (this.validAccessLevelGM(response.data.accessLevel)) {
                    this.handleAccessLevelGM(response.data.accessLevel);
                }
                this.level = response.data.level;
                this.blockNum = response.data.blockNum; 
                this.levelProgress = parseFloat(response.data.percentComplete);
                this.progressText = response.data.progressText; 
                this.username = response.data.username; 
                this.name = this.$session.get('user').name;
            });
        },
        fetchSubscriptionInfo() {
            return UsersService.getSubscriptionInfo(this.userId).then((response) => {
                this.subscriptionInfo = response.data; 
                this.populatePackages(this.subscriptionInfo.currentPlan); 
            });
        },
        populatePackages(packageName) {
            this.asPackagesSelect = [];

            this.oldPackage = {
                name: packageName,
                price: packagePrices[packageName]
            }

            if (this.subscriptionInfo.cancelled && !this.subscriptionInfo.nextPlan) {
                this.asPackagesSelect = defaultPackages; 
            } else if (this.subscriptionInfo.nextPlan) {
                packageMappings[this.subscriptionInfo.nextPlan].forEach(plan => {
                    this.asPackagesSelect.push({ text: plan, disabled: false});
                });

                this.asPackagesSelect.push({ text: `${this.subscriptionInfo.nextPlan} ${packagePrices[this.subscriptionInfo.nextPlan]}`, disabled: true});
            } else {
                packageMappings[this.oldPackage.name].forEach(plan => {
                    this.asPackagesSelect.push({text: plan, disabled: false});
                });

                this.asPackagesSelect.push({text: `${this.oldPackage.name} ${packagePrices[this.oldPackage.name]}`, disabled: true});
            }
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

               return UsersService.changePassword(this.userId, params).then((response) => {
                    if (response.data.error && response.status && response.data.status === 'Wrong Password') {
                        this.wrongOldPassword = true; 
                    } else {
                        this.notificationVisible = true; 
                    }

                    this.$refs.passwordForm.validate();
                });
            }
        },
        confirmCancel() {
            this.dialogText = 'Are you sure you want to cancel your subscription to Alloy Strength Training?'; 
            this.dialogState = 'Cancel'; 
            this.showDialog = true; 
        },
        confirmSwitch() {
            this.dialogText = `Are you sure you want to switch your subscription to ${this.newPackage}?`; 
            this.dialogState = 'Switch'; 
            this.showDialog = true; 
        },
        handleDialogYes() {
            this.showDialog = false; 

            let params = {};

            if (this.dialogState === 'Cancel') {
                params = {
                    cancel: true
                };
            } else if (this.dialogState === 'Switch') {
                let planId = ''; 

                if (this.newPackage === 'Silver') {
                    planId = 'AS_Silver'; 
                } else if (this.newPackage === 'Gold') {
                    planId = 'AS_Gold'; 
                }

                params = {
                    cancel: false,
                    newPlanID: planId
                }
            }

            return UsersService.changeSubscription(this.userId, params).then(() => {
                this.fetchSubscriptionInfo().finally(() => {
                    this.notificationVisible = true; 
                    this.notificationMessage = `You have successfully changed your subscription!`;
                });
            }); 
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
        },
        newPackageSelect: function(newVal) {
            if (newVal.text.indexOf('Silver') >= 0) {
                this.newPackage = 'Silver'; 
            } else if (newVal.text.indexOf('Gold') >= 0) {
                this.newPackage = 'Gold'; 
            }
        }
    }
}

</script>

<style lang="scss">
    @import "~@/demo-common/styles/colors";

    .as-profile-container-container {
        height: 100%;
    }

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
        height: 100%;
        justify-content: center;
        align-items: center; 
    }

    .as-last-workout {
        overflow: auto;
    }


</style>