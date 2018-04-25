<template>
    <div>
        <v-navigation-drawer
            v-model="showDrawer"
            absolute
            temporary
            right
            clipped
        >
            <v-list>
                <v-list-tile>
                    <v-list-tile-action>
                        <v-icon>account_circle</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title>{{ ($session.exists() && $session.has('user')) ? $session.get('user').username : '' }}</v-list-tile-title>
                </v-list-tile>
                <v-divider/>

                <v-list-tile @click="routeTo('Workout')">
                    <v-list-tile-action>
                        <v-icon/>
                    </v-list-tile-action>
                    <v-list-tile-title>Workouts</v-list-tile-title>
                </v-list-tile>

                <v-list-tile v-if="$session.exists() && $session.has('user') ? $session.get('user').isAdmin : false" @click="routeTo('AdminSetLevels')">
                    <v-list-tile-action>
                        <v-icon/>
                    </v-list-tile-action>
                    <v-list-tile-title>Reset Workouts</v-list-tile-title>
                </v-list-tile>

                <v-list-tile @click="routeTo('Videos')">
                    <v-list-tile-action>
                        <v-icon/>
                    </v-list-tile-action>
                    <v-list-tile-title>Videos</v-list-tile-title>
                </v-list-tile>

                <v-list-tile @click="routeTo('UserStats')">
                    <v-list-tile-action>
                        <v-icon/>
                    </v-list-tile-action>
                    <v-list-tile-title>Stats</v-list-tile-title>
                </v-list-tile>

                <v-list-tile @click="routeTo('Glossary')">
                    <v-list-tile-action>
                        <v-icon/>
                    </v-list-tile-action>
                    <v-list-tile-title>Glossary</v-list-tile-title>
                </v-list-tile>
                <v-divider/>

                <v-list-tile @click="routeTo('Logout')">
                    <v-list-tile-action>
                        <v-icon>power_settings_new</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title>Log Out</v-list-tile-title>
                </v-list-tile>
                <v-divider/>

            </v-list>
        </v-navigation-drawer>
    </div>

</template>

<script>
    export default {
        props: {
            visible: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                showDrawer: this.visible || false
            }; 
        },
        methods: {
            routeTo(pathName) {
                this.$router.push({name: pathName});
            }
        },
        watch: {
            showDrawer: function(newVal) {
                if (this.visible !== newVal) {
                    this.$emit('update-visibility', newVal);
                }
            },
            visible: function(newVal) {
                this.showDrawer = newVal; 
            }
        }
    }
</script>

<style lang="scss">

</style>