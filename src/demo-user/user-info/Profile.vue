<template>
    <div class="as-profile">
        <div class="as-profile-dynamic">
            <h1>Profile</h1>
            
            <v-divider/>
            <v-form>
                <v-card class="as-user-options">
                    <v-card-title>
                        <h2>User Options</h2>
                    </v-card-title>

                    <v-card-text>
                        <v-text-field
                            v-model="email"
                            label="Email"
                            readonly
                        />
                    </v-card-text>
                </v-card>

                <v-card class="as-password-options">
                    <v-card-title>
                        <h2>Password Options</h2>
                    </v-card-title>

                    <v-card-text>
                        <v-text-field
                            v-model="oldPassword"
                            label="Old Password"
                        />

                        <v-text-field
                            v-model="newPassword"
                            label="New Password"
                        />
                    </v-card-text>
                </v-card>
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
            email: "asitwala17@gmail.com"
        }
    }
}

</script>

<style lang="scss">
    @import "~@/demo-common/styles/colors";

    .as-profile {
        display: flex; 
        flex-wrap: wrap; 

        .as-profile-dynamic {
            margin: 16px;
            min-width: 500px;
            max-width: 500px;
            flex: 1; 

            .as-password-options {
                margin-top: 16px;

                .card__title {
                    padding-bottom: 0px !important;
                }
            }

            .as-user-options {
                margin-top: 16px;

                .card__title {
                    padding-bottom: 0px !important;
                }
            }
        }

        .as-profile-static {
            flex: 1;
            border-left: 1px solid $greyLighten3; 
        }
    }

</style>