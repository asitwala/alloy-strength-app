<template>
    <div class="as-renew-subscription">
        <as-renew-subscription
            :renew="true"
            title="Renew Subscription"
            description="Your subscription is no longer valid. Please renew your subscription to continue with Electrum Performance’s training system.">

        </as-renew-subscription>
    </div>
</template>

<script>

import UsersService from '@/services/UsersService'; 
import InitializeStep1 from '@/demo-user/user-info/InitializeStep1'; 

export default {
    mounted() {
        UsersService.getAccessInfo(this.$session.get('user').id).then(response => {
            if (this.validAccessLevelGM(response.data.accessLevel)) {
                this.handleAccessLevelGM(response.data.accessLevel);
            }
        });
    },
    components: {
        'as-renew-subscription': InitializeStep1
    }
}

</script>

<style lang="scss">

.as-renew-subscription {
    margin: 25px; 
    width: 95%;
}

</style>