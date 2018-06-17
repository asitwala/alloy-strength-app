<template>
    <div class="as-unauthorized">
        <div>
            <h1>You are not authorized to view this page: www.alloystrengthtraining.com{{ path }}</h1>
            <p style="margin-top: 4px; margin-bottom: 4px;">Please log in and then navigate to this page.</p>
            <as-login></as-login>
        </div>
    </div>

</template>



<script>
    import Login from '@/demo-home/Login'; 
    export default {
        props: {
            path: {
                type: String
            }
        },
        components: {
            'as-login': Login
        }
    };

</script>


<style lang="scss">
    .as-unauthorized {
        text-align: center; 
        height: 100%; 
        display: flex;
        align-items: center;
        justify-content: center; 
    }   
</style>