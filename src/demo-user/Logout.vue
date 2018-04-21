<template>
<div></div>
</template>

<script>
export default {
    mounted() {
        this.$session.destroy();
        this.$router.push({
            name:'Homepage'
        });
    }
}

</script>