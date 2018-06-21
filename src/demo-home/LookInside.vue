<template>
    <div class="as-look-inside">
        <div class="as-look-inside-img-ctr" v-for="(image, imageIndex) in lookInsideImages" :key="imageIndex">
            <v-dialog v-model="showZoom" 
                fullscreen
                hide-overlay
                transition="dialog-bottom-transition"
                scrollable
            >
                
                <div slot="activator" style="display:block; position: relative;">
                    <img :src="image.path" 
                    class="as-look-inside-image" @click.stop="dialogOpen(image)"
                    />
                    <div class="as-zoom-icon">
                        <v-icon color="white">fa-search</v-icon>
                    </div>
                </div>
                    
                
                <v-card>
                    <v-toolbar card dark color="primary">
                        <v-btn icon dark @click.native="dialogClose">
                            <v-icon>close</v-icon>
                        </v-btn>
                        <v-toolbar-title>Preview: {{ zoomedImage.name }}</v-toolbar-title>
                    </v-toolbar>

                    <v-card-text>
                            <h3 class="as-zoomed-caption">{{ zoomedImage.caption }}</h3>
                        <div class="as-zoomed-ctr">
                            <img :src="zoomedImage.path" class="as-zoomed-image"/>
                        </div>
                    </v-card-text>
                </v-card>
            </v-dialog>
        </div>
    </div>
</template>

<script>
    export default { 
        data() {
            return {
                lookInsideImages: [
                    {
                        name: 'Workout Page (Exercise Card)',
                        caption: 'Include caption here for workout page',
                        path: '../../static/DemoShots/WorkoutComplexResized.png'
                    }, 
                    {
                        name: 'Workout Page, Simple View (Exercise Card)',
                        caption: 'Include caption here for workout page (simple view)',
                        path: '../../static/DemoShots/WorkoutSimpleGood2.png'
                    },
                    {
                        name: 'Video Library',
                        caption: 'Include caption here for video library',
                        path: '../../static/DemoShots/Video_DefaultResized.png'
                    },
                    {
                        name: 'Progress Report',
                        caption: 'Include caption here for progress report',
                        path: '../../static/DemoShots/Progress.png'
                    }
                ],
                showZoom: false,
                zoomedImage: {}
            };
        },
        methods: {
            dialogOpen(path) {
                this.zoomedImage = path;
                this.showZoom = true;
            },
            dialogClose() {
                this.showZoom = false;
            }
        }
    };
</script>

<style lang="scss">

    @import '~@/demo-common/styles/transitions';
    @import '~@/demo-common/styles/colors';

    .as-look-inside {
        height: 100%;
        padding-bottom:20px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;


        .as-look-inside-img-ctr {
            display: flex; 
            justify-content: center;
            align-items: center;
            min-width: 300px;
            max-width: 575px;
            padding: 16px;
            margin: 4px;
            background-color: rgba(0, 0, 0, 0.5);
            pointer-events: none;

            &:hover {
                .as-zoom-icon {
                    transition: all 0.5s;
                    opacity: 1;
                    pointer-events: none !important;
                }
            }

            img {
                object-fit: contain;
                width: 100%;
                transition: all 0.5s;
                cursor: pointer;
                pointer-events: auto;

                &:hover {
                    opacity: 0.4;

                }
            }   
        }   
    }

    .as-zoom-icon {
        position: absolute;
        top: 45%;
        left: 47.5%;
        opacity: 0;
    }

    .as-zoomed-caption {
        margin: 8px;

    }

    .as-zoomed-ctr {
        min-width: 800px;
        width: 100%;
        padding: 20px;
        display: block;
        background-color: $blueGreyLighten5;

        .as-zoomed-image {
            object-fit: contain;
            width: 100%;
        }
    }

</style>