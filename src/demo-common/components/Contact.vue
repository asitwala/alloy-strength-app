<template>
    <div class="as-contact">
        <div class="as-contact-content">
            <h1> Contact Us </h1>
            <p>Our coaches are always ready to help. If you have any queries, please email </p>
            <p><a :href="`mailto:${officialEmail}`">{{ officialEmail }}</a></p>
        </div>
    </div>
</template>

<script>
    // TODO -- we may want to move info like official email to a shared folder
    export default {
        data() {
            return {
                officialEmail: 'alloystrengthtraining@gmail.com'
            }
        }
    };
</script>

<style lang="scss">
    .as-contact {
        text-align: center; 
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        &-content {
            h1 {
                margin-bottom: 5px;
            }
        }
    }
</style>