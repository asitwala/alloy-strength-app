<template>
<div></div>
</template>

<script>
export default {
    mounted() {
        this.$session.destroy();
        this.$store.commit('unauthorize'); 
        this.$router.push({
            name:'Homepage'
        });
    }
}
</script>