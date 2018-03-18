<template>
    <div class="as-sub-video">
        <div class="as-sub-video-thumbnail"
            :style="thumbnailStyle"></div>
        <div class="as-sub-video-label">
            {{ videoInfo.label }}
        </div>
    </div>
</template>

<script>
    //import _ from 'lodash'; 

    export default {
        props: {
            videoInfo: {
                type: Object,
                required: true
            }
        }, 
        computed: {
            thumbnailStyle() {
                return {
                    background: `url(${this.videoInfo.image}) no-repeat center`,
                    backgroundSize: 'cover'
                };
            }
        }
    }; 
</script>

<style lang="scss">

    .as-sub-video {
        margin-right: 40px;
    }

    .as-sub-video-thumbnail {
        height: 150px;
        width: 200px;
    }

    .as-sub-video-label {
        font-weight: bold; 
    }

</style>