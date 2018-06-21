<template>
    <div class="as-email-confirmation">
        <div class="as-email-confirmation-container">
            <h1>Confirming your email</h1>
            <div class="as-email-confirmation-content">
                <div v-if="loading">
                    <p style="margin-top: 4px;">Activating your account</p>
                    <v-progress-circular indeterminate color="primary"/>
                </div>

                <transition name="as-name">
                    <div v-if="!loading && activated">
                        <p style="margin-top: 4px; margin-bottom: 4px;">Your account has successfully been activated!
                        Log in to finish the sign up process and get started with Electrum Performance.
                        </p>
                        <as-login></as-login>
                    </div>

                    <div v-else-if="!loading && alreadyConfirmed">
                        <p style="margin-top: 4px; margin-bottom: 4px;">Your account was already activated! Please log in 
                        to start using Electrum Performance.
                        </p>
                        <as-login></as-login>
                    </div>

                    <div v-else-if="!loading">
                        <p style="margin-top: 4px; margin-bottom: 4px;">Hmm...It looks like something went wrong with your activation.
                        Please log in to check if your account was already activated. If log in fails, please contact us.
                        </p>
                        <as-login></as-login>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>


<script>
    import Login from '@/demo-home/Login'; 

    import UsersService from '@/services/UsersService'; 

    export default {
        components: {
            'as-login': Login
        },
        data() {
            return {
                activated: false,
                loading: false,
                alreadyConfirmed: false
            };
        },
        mounted() {
            this.loading = true; 

            this.getConfirmation().finally(() => {
                this.loading = false; 
            });
        },
        methods: {
            getConfirmation() {
                const userId = this.$route.params.id; 
                const confString = this.$route.params.confString;

                return UsersService.getEmailConfirmation(userId, confString).then(response => {
                    if (response.data.match) {
                        this.activated = true; 
                    }

                    if (response.data.alreadyConfirmed) {
                        this.alreadyConfirmed = true;
                    }
                });
            }
        }
    };

</script>


<style lang="scss">
    @import '~@/demo-common/styles/colors';
    @import '~@/demo-common/styles/transitions';

    .as-email-confirmation {
        text-align: center; 
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>