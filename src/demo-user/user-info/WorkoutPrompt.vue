<template>
    <div class="as-workout-prompt">
        <h2 class="as-header">Your Subscription Has Expired</h2>
        <div class="as-renew">
            <p style="margin-bottom: 0px">Please renew your subscription to continue using Alloy Strength's training system.</p>
            <v-btn color="red" style="color: white !important;">Renew Subscription</v-btn>
        </div> 
        <v-divider/>
    </div>

</template>


<script>



export default {
    data() {
        return {
            showPrompt: true
        };
    },
    mounted() {

    }
};

</script>


<style lang="scss">

@import '~@/demo-common/styles/colors';

.as-workout-prompt {

    .as-header {
        color: $redBase;
    }

    margin: 0 20px;

    margin-top: 12px;

    .as-renew {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 12px;
    }

}


</style>