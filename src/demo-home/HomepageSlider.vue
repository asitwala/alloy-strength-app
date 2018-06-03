<template>
    <v-carousel interval="120000" delimiter-icon="fa-dot-circle-o" class="as-carousel">
        <v-carousel-item v-for="(item, itemIndex) in carouselItems" :src="item.src" :key="item.src">
        </v-carousel-item>
    </v-carousel>
</template>


<script>
    export default {
        data() {
            return {
                carouselItems: [
                    {
                       src: '../../static/test2.png'
                    }
                ]
            };
        }
    };
</script>


<style lang="scss">

@import '~@/demo-common/styles/colors';
@import '~@/demo-common/styles/transitions';

.as-carousel {
    max-width: 1325px !important;
}

.jumbotron__wrapper {
    background-color: rgba(0, 0, 0, 0.1);
}

.jumbotron__image {
    height: 100%;
}

.carousel__controls {
    background-color: rgba(0, 0, 0, 0.3) !important;
    height: 35px !important;

    .btn__content .icon {
        font-size: 14px !important;
    }
}


</style>