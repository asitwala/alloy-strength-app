<template>
    <div class="as-renew-subscription">
        <as-renew-subscription
            :renew="true"
            title="Renew Subscription"
            description="Your subscription is no longer valid. Please renew your subscription to continue with Alloy Strength’s training system.">

        </as-renew-subscription>
    </div>
</template>

<script>

import InitializeStep1 from '@/demo-user/user-info/InitializeStep1'; 

export default {
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