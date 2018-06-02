<template>
    <div class="as-homepage">
        <as-signup></as-signup>
        <as-login></as-login>
    </div>
</template>


<script>
    import Login from '@/demo-home/Login'; 
    import Signup from '@/demo-home/Signup'; 

    export default {
        components: {
            'as-login': Login,
            'as-signup': Signup
        }
    };

</script>


<style lang="scss">

    @import '~@/demo-common/styles/colors';
    @import '~@/demo-common/styles/transitions';

    .as-homepage {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
    }
  
</style>