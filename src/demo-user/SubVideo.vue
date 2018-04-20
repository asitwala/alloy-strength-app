<template>
    <div class="as-sub-video" @click="sendVideoInfo">
        <div class="as-sub-video-thumbnail"
            :style="thumbnailStyle"></div>
        <div class="as-sub-video-label">
            {{ videoInfo.label }}
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            videoInfo: {
                type: Object,
                required: true
            }
        }, 
        methods: {
            sendVideoInfo() {
                this.$emit('switch', this.videoInfo);    
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
        margin: 0 7.5px 7.5px 7.5px;
        cursor: pointer;
        display: inline-block;
    }

    .as-sub-video-thumbnail {
        height: 150px;
        width: 200px;
    }

    .as-sub-video-label {
        font-weight: bold; 
        max-width: 200px;
    }

</style>