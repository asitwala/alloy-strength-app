<template>
    <div class="as-video-library">
        <h1>Video Library</h1>
        <!-- TODO: If we end up using Youtube --> 
        <!-- <youtube :video-id="videoId"></youtube> --> 
        <div class="as-main-video-container">
            <div class="as-main-video">
                <iframe src="https://drive.google.com/file/d/0BysnsnxGpKeUalBQWWNvekRiSFk/preview" 
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
                    <h2>Main Card Title</h2>
                    <div>
                        
                    </div>
                </v-card-title>
                <v-card-actions>
                    
                </v-card-actions>
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
                        color="primary"
                        :disabled="!hasFilters"
                        @click="clearFilters"
                        >
                        Clear
                    </v-btn>
                </div>
            
            </div>
            
            <div class="as-sub-videos">
                <as-sub-video v-for="subvideo in shownVideoInformation" 
                    :key="subvideo.label"
                    :video-info="subvideo">
                </as-sub-video>
            </div>
        
        </div>
   
    </div>

</template>

<script>

// TODO: If we end up using Youtube
// import Vue from 'vue';
// import VueYouTubeEmbed from 'vue-youtube-embed';
// import { getIdFromURL } from 'vue-youtube-embed'; 

// let testVideoURL = 'https://www.youtube.com/watch?v=3jWRrafhO7M';
// let testVideoURLs = []; 
// Vue.use(VueYouTubeEmbed); 

let SubVideo = require('./SubVideo').default; 
import _ from 'lodash'; 

export default {
    components: {
        'as-sub-video': SubVideo
    },
    data() {
        return {
            //videoId: getIdFromURL(testVideoURL), // TODO: If we end up using Youtube
            subVideoInformation: [
                {
                    label: 'DB Bench Press',
                    image: '../../static/video_placeholder.png',
                    levels: [1, 2, 4]
                },
                {
                    label: 'DB RDL',
                    image: '../../static/video_placeholder.png',
                    levels: [10, 20]
                },
                {
                    label: 'CC Face Pull',
                    image: '../../static/video_placeholder.png',
                    levels: [2, 4, 6]
                },
                {
                    label: 'DB Hip Thrust',
                    image: '../../static/video_placeholder.png',
                    levels: [1, 3, 5, 7]
                }
            ],
            shownVideoInformation: [],
            searchFieldPlaceholder: "Search for videos",
            search: '',
            selected: '',
            selectedOptions: [...Array(25).keys()].map(x => (x + 1).toString()),
            selectedPlaceholder: "Select a level"
        }; 
    },
    created() {
        this.subVideoInformation.forEach(subvideo => {
            this.shownVideoInformation.push(subvideo);
        });
    },
    methods: {
        filterVideos() {
            if (this.search) {
                let valLowerCase = this.search.toLowerCase();
                let subVideoLabelsLowerCase = 
                    this.subVideoInformation
                    .map(item => item.label.toLowerCase())

                let selectedVideoLabels = 
                    subVideoLabelsLowerCase
                    .filter(item => _.includes(item, valLowerCase));
                
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
        }
    }
};
</script>
<style lang="scss">
    .as-video-library {
        width: 85%; 
        margin: 0 auto; 
    }

    .as-sub-videos {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
    }

    .as-sub-video-filters {
        display: flex;
        flex-wrap: wrap;

    }

    .as-sub-video-search-container {
        width: 300px;
        margin-right: 30px;
    }

    .as-sub-video-select-container {
        width: 300px;
    }

    .as-main-video {
        width: 640px; 
        height: 360px; 
        position: relative;
    }

    .as-main-video-popover-disable {
        width: 50px; 
        height: 50px; 
        position: absolute; 
        right: 0px; 
        top: 0px;
        background-color: black;
    }
    
    .as-main-video-container {
        display: flex; 
        flex: 1; 
        flex-wrap: wrap; 
    }

    .as-main-video-description {
        max-width: 640px; 
        min-width: 300px; 
    }

</style>