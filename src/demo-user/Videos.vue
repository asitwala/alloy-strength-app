<template>
    <div class="as-video-library">
        <h1>Video Library</h1>
        <!-- TODO: If we end up using Youtube --> 
        <!-- <youtube :video-id="videoId"></youtube> --> 
        <div class="as-sub-video-filters">
            <v-text-field :label="searchFieldPlaceholder"
                v-model="search">
            </v-text-field>
            <v-select
                :items="selectedOptions"
            />


        </div>
        
        <div class="as-sub-videos">
            <as-sub-video v-for="subvideo in shownVideoInformation" 
                :key="subvideo.label"
                :video-info="subvideo">
            </as-sub-video>
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
            // videoId: getIdFromURL(testVideoURL) // TODO: If we end up using Youtube
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
            selectedOptions: [...Array(25).keys()].map(x => (x + 1).toString())
        }; 
    },
    created() {
        this.subVideoInformation.forEach(subvideo => {
            this.shownVideoInformation.push(subvideo);
        });
    },
    methods: {
        searchFor(val) {
        
            let valLowerCase = val.toLowerCase();
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
        }
    },
    watch: {
        search: function(newVal) {
            if (newVal === '' ) {
                this.shownVideoInformation = this.subVideoInformation;
            }
            else {
                this.searchFor(newVal);
            }
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
        justify-content: space-around; 
    }

</style>