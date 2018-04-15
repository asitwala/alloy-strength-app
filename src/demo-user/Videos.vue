<template>
    <div class="as-video-library">
        <h1>Video Library</h1>
        <v-divider class="as-video-library-divider"/>
        <div class="as-main-video-container">
            <div class="as-main-video">
                <iframe :src="selectedVideo.URL" 
                    width="640" 
                    height="360" 
                    frameborder="0"
                    scrolling="no" 
                    seamless="" 
                    allowfullscreen="allowfullscreen">
                </iframe>
                <div class="as-main-video-popover-disable"></div>
            </div>

            <v-card class="as-main-video-description">
                <v-card-title>
                    <h2>{{ selectedVideo.label }}</h2>
                </v-card-title>
                <v-card-text>
                    <div class="as-main-video-description-body"
                        v-html="videoDescription">                      
                    </div>
                </v-card-text>
            </v-card>

        </div>

        <div class="as-sub-videos-container">
            <div class="as-sub-video-filters">
                <div class="as-sub-video-search-container">
                    <v-text-field class="as-sub-video-search"
                        :label="searchFieldPlaceholder"
                        v-model="search">
                    </v-text-field>
                </div>

                <div class="as-sub-video-select-container">
                    <v-select
                        class="as-sub-video-select-level"
                        autocomplete
                        :label="selectedPlaceholder"
                        :items="selectedOptions"
                        v-model="selected"
                    />
                </div>

                <div class="as-sub-video-clear-filters">
                    <v-btn
                        class="as-sub-video-clear-button"
                        color="primary"
                        :disabled="!hasFilters"
                        @click="clearFilters"
                        >
                        Clear
                    </v-btn>
                </div>
            
            </div>
            
            <div class="as-sub-videos">
                <as-sub-video v-for="subvideo in sortedSubVideos" 
                    :key="subvideo.label"
                    :video-info="subvideo"
                    @switch="switchVideo"
                    >
                </as-sub-video>
                <as-sub-video/>
                <as-sub-video/>
                <as-sub-video/>
            </div>
        
        </div>
   
    </div>

</template>

<script>

let SubVideo = require('./SubVideo').default; 
import VideoService from '@/services/VideoService'; 
import includes from 'lodash/includes'; 
import sortBy from 'lodash/sortBy'; 

export default {
    components: {
        'as-sub-video': SubVideo
    },
    mounted() {
        this.fetchVideoInfo();
    },
    data() {
        return {
            selectedVideo: {},
            subVideoInformation: [],
            shownVideoInformation: [],
            searchFieldPlaceholder: "Search for videos",
            search: '',
            selected: '',
            selectedOptions: [...Array(25).keys()].map(x => (x + 1).toString()),
            selectedPlaceholder: "Select a level"
        }; 
    },
    methods: {
        fetchVideoInfo() {
            VideoService.fetchVideoInfo().then(response => {
                if (typeof response === 'object') {
                    this.selectedVideo = response.data.selectedVideo; 
                    this.subVideoInformation = response.data.videoList;

                    let subVideoIndex = this.subVideoInformation.map(item => item.label).indexOf(this.selectedVideo.label);

                    if (subVideoIndex >= 0) {
                        this.subVideoInformation.splice(subVideoIndex, 1);
                    }

                    // Populate which videos are shown (may have to filter)
                    this.subVideoInformation.forEach(subvideo => {
                        this.shownVideoInformation.push(subvideo);
                    });
                }
            });
        },
        filterVideos() {
            if (this.search) {
                let valLowerCase = this.search.toLowerCase();
                let subVideoLabelsLowerCase = 
                    this.subVideoInformation
                    .map(item => item.label.toLowerCase())

                let selectedVideoLabels = 
                    subVideoLabelsLowerCase
                    .filter(item => includes(item, valLowerCase));
                
                this.shownVideoInformation = [];

                this.subVideoInformation.forEach(item => {
                    if (selectedVideoLabels.indexOf(item.label.toLowerCase()) >= 0) {
                        this.shownVideoInformation.push(item);
                    }
                });
            } else {
                this.shownVideoInformation = this.subVideoInformation; 
            }

            if (this.selected) {
                this.shownVideoInformation = this.shownVideoInformation.filter(item =>
                    item.levels.indexOf(parseInt(this.selected)) >= 0
                );
            }
        },
        clearFilters() {
            this.search = '';
            this.selected = '';
        },
        switchVideo(subVideo) {
            // Remove sub video from sub videos library
            let subVideoIndex = this.subVideoInformation.map(item => item.label).indexOf(subVideo.label);

            if (subVideoIndex >= 0) {
                this.subVideoInformation.splice(subVideoIndex, 1);
                this.subVideoInformation.push(this.selectedVideo);
            }
             // push main video to sub video
            this.selectedVideo = subVideo; // set main video to sub video
            this.shownVideoInformation = this.subVideoInformation; 
        }
    },
    watch: {
        search: function() {
            this.filterVideos();
        },
        selected: function() {
            this.filterVideos();
        }
    },
    computed: {
        hasFilters() {
            return (this.search || this.selected);
        },
        sortedSubVideos() {
            return sortBy(this.shownVideoInformation, ['label']);
        },
        videoDescription() {
            return (this.selectedVideo && this.selectedVideo.Description) ? this.selectedVideo.Description : 
                '<p>This video has no description.</p>'
        }
    }
};
</script>
<style lang="scss">

    @import "~@/demo-common/styles/colors";

    .as-video-library {
        width: 85%; 
        margin: 0 auto; 

        h1 {
            margin: 15px 0 5px; 
        }

        &-divider {
            margin-bottom: 15px;
        }
    }

    .as-sub-videos-container {
        padding: 15px 0;
        margin-bottom: 15px;
        background-color: $greyLighten2;
    }

    .as-sub-videos {
        width: 90%;
        margin: 0 auto;
        height: 500px;
        overflow-y: auto;
        display: grid;
        grid-template-columns: repeat(auto-fill, 200px);
        grid-row-gap: 10px; 
        justify-content: space-between; 
    }

    .as-sub-video-filters {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        width: 90%;
        margin: 0 auto;
        padding-left: 7.5px;
        margin-bottom: 5px;
    }

    .as-sub-video-clear-button {
        margin: 0 !important;
        margin-top: 12px !important;
    }

    .as-sub-video-search-container {
        width: 300px;
        margin-right: 30px;
        flex: 1; 
    }

    .as-sub-video-select-container {
        width: 300px;
        margin-right: 30px;
        flex: 1; 
    }

    .as-main-video {
        width: 640px; 
        height: 360px; 
        position: relative;
    }

    .as-main-video-popover-disable {
        width: 42px;
        height: 42px;
        position: absolute;
        right: 11px;
        top: 11px;
        background: white url('../../static/logo.svg') no-repeat center;
        background-size: contain;
        border-radius: 2px;
    }
    
    .as-main-video-container {
        display: flex; 
        flex: 1; 
        flex-wrap: wrap; 
    }

    .as-main-video-description {
        max-width: 640px; 
        flex: 1;
        min-width: 300px; 

        .card__title {
            padding-top: 8px;
            padding-bottom: 8px;
            margin-bottom: 0px;
            background-color: $greyLighten2;
        }

        .card__text {
            padding-right: 8px; 
            padding-bottom: 8px;

            .as-main-video-description-body {
                height: 280px !important;
                overflow-y: auto;
                width: 100%; 

                ul {
                    list-style-position: outside !important;

                    li {
                        margin-left: 16px;
                        margin-bottom: 16px;
                        font-size: 12.5px;
                    }
                }
            }
        }
    }

</style>