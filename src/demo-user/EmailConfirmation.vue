<template>
    <div class="as-email-confirmation">
        <p>Confirming your email</p>
    </div>
</template>


<script>

    import UsersService from '@/services/UsersService'; 

    export default {
        data() {
            return {
                activated: false
            };
        },
        mounted() {
            this.getConfirmation();
        },
        methods: {
            getConfirmation() {
                const userId = this.$route.params.id; 
                const confString = this.$route.params.confString;
                UsersService.getEmailConfirmation(userId, confString).then(response => {
                    if (response.data.match) {
                        console.log('Data matches');
                        this.activated = true; 
                    }
                });
            }
        }
    };

</script>


<style lang="scss">


</style>