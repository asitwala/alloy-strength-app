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
                                    v-model="email"
                                    label="Email"
                                />
                                <v-text-field
                                    v-model="height"
                                    label="Height"
                                    suffix="inches"
                                />
                                <v-text-field
                                    v-model="weight"
                                    label="Weight"
                                    suffix="pounds"
                                />
                            </v-card-text>
                            <v-card-actions>
                                <div class="as-profile-card-actions">
                                    <v-btn 
                                        color="primary"
                                        @click=""
                                        class="as-change-user-settings">Change
                                    </v-btn>
                                </div>
                            </v-card-actions>
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
                                <v-text-field
                                    v-model="oldPassword"
                                    label="Old Password"
                                    type="password"
                                />

                                <v-text-field
                                    v-model="newPassword"
                                    label="New Password"
                                />
                            </v-card-text>

                            <v-card-actions>
                                <div class="as-profile-card-actions">
                                    <v-btn 
                                        color="primary"
                                        @click=""
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
            <v-tabs
                v-model="active"
                color="primary"
                dark
                >
                <v-tab
                    v-for="n in 3"
                    :key="n"
                    ripple
                    >
                    Header {{ n }}
                </v-tab>
            </v-tabs>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            newPassword: "",
            oldPassword: "test",
            name: "",
            email: "asitwala17@gmail.com",
            height: "",
            weight: "",
            active: null,
            sections: [
                'Last Workout Summary', 
            ]
        }
    }
}

</script>

<style lang="scss">
    @import "~@/demo-common/styles/colors";

    .as-profile {
        display: flex; 
        flex-wrap: wrap; 

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
            flex: 1;
            border-left: 1px solid $greyLighten3; 
        }

        .as-profile-card-actions  {
            width: 100%; 

            .as-change-user-settings, .as-change-password {
                float: right !important;
            }
        }

        .as-user-panel {
            margin-bottom: 16px;
        }
    }

</style>