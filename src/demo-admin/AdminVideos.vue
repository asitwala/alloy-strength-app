<template>
    <div class="admin-videos-container" 
        >
        <div class="as-loading" v-if="loading">
            <v-progress-circular indeterminate color="primary"/>
        </div>
        <div v-if="!loading">

            <h1 style="margin-bottom:10px;">Video Database
                <v-btn color="primary" style="margin-left: 0px !important; margin-top: 8px; margin-left:10px;" 
                @click='addVideo()'>
                    Add New Video
                </v-btn>
                <span v-if="recentAdd" style="font-size:15px;">Video added! It is now accessible in the table below</span>
                <span v-if="recentDelete" style="font-size:15px;">Video deleted!</span>
            </h1>

            <div v-if="editPressed">
                <br><br>
                <h2>Edit Video Description</h2>
                 <vue-editor v-model="editVideoDescription"></vue-editor>
                <br><br>
            </div>
            <v-text-field
            append-icon="search"
            label="Search"
            single-line
            hide-details
            v-model="search"
            v-if="!editPressed"
            ></v-text-field>            

            <v-data-table
                :headers="headers"
                :items="videos"
                :search="search"
                hide-actions
                class="elevation-1"
            > 
                <template slot="items" slot-scope="props">
                     <!-- TITLE COLUMN -->
                    <td v-if="editPressed && editingVideoId == props.item.id">
                        <textarea 
                            v-model="editVideoTitle"
                            v-if="editPressed && editingVideoId == props.item.id"
                            style="width:100%; border: 1px solid black;" 
                            :placeholder="props.item.title">
                        </textarea>
                    </td>
                    <td v-else-if="!editPressed">
                        {{props.item.title}}
                    </td>
                    <!-- URL COLUMN -->
                    <td v-if="editPressed && editingVideoId == props.item.id">
                            <textarea 
                                v-model="editVideoUrl"
                                v-if="editPressed && editingVideoId == props.item.id"
                                style="width:100%; border: 1px solid black;" 
                                :placeholder="props.item.url">
                            </textarea>
                    </td>
                    <td v-else-if="!editPressed">
                        <a v-bind:href="props.item.url">
                            {{props.item.url}}
                        </a>
                    </td>
                    <!-- EXERCISE CATEGORIES COLUMN -->
                    <td v-if="editPressed && editingVideoId == props.item.id" 
                        style="height:auto; padding:0px; overflow:hidden;">
                        <div>
                            <v-select
                                style="margin:0px;"
                                :items="exerciseCategories"
                                label="Select Exercise Category"
                                v-model="editVideoExerciseType"
                            />                    
                        </div>
                    </td>
                    <td v-else-if="!editPressed">
                        <div>
                            <p v-if="!props.item.exerciseType">--</p>
                            <p v-else>{{props.item.exerciseType}}</p>
                        </div>
                    </td>
                    <!-- SPECIFIC EXERCISES COLUMN -->
                    <td v-if="editPressed && editingVideoId == props.item.id"
                        style="height:600px !important;">
                        <b>Ctrl + Click to select multiple exercises</b><br>
                        <select v-model="editVideoRelatedExercises" multiple
                        style="height:95% !important;"
                        label="Ctrl + Click to select multiple exercises">                    
                            Ctrl + Click to select multiple exercises
                            <option v-for="item in relatedExerciseOptions" :value="item.level">
                                {{item.name}} (Level {{item.level}})
                            </option>
                        </select>                    
                    </td>
                    <td  v-else-if="!editPressed"
                        style="">
                        {{props.item.relatedExercisesString}}
                    </td>
                    <!-- EDIT BUTTON -->
                    <td v-if="editPressed && editingVideoId == props.item.id">
                        <v-btn color="primary" style="margin-left: 0px !important; margin-right:15px; margin-top: 8px;" 
                        @click='saveVideo(props.item.id)'>
                            Save Changes
                        </v-btn>
                        <v-btn color="black" style="color: white; margin-left: 0px !important; margin-top: 8px;" 
                        @click='cancelAdd()'>
                            CANCEL
                        </v-btn>
                        <br><br>
                        <v-btn color="red" style="color: white; margin-left: 0px !important; margin-top: 8px;" 
                        v-if="!addPressed"
                        @click='deleteVideo(props.item.id)'>
                            DELETE VIDEO
                        </v-btn>

                    </td>
                    <td v-else-if="!editPressed">
                        <v-btn color="primary" style="margin-left: 0px !important; margin-top: 8px;" 
                        @click='editVideo(props.item.id, props.item.title, props.item.url, props.item.exerciseType, props.item.exerciseLevels, props.item.description)'>
                            Edit & View Details
                        </v-btn>
                    </td>
                </template>
            </v-data-table>     
            <br><br>       
        </div>
    </div>
</template>


<script>
import frequentlyAskedQuestions from "@/demo-home/frequentlyAskedQuestions";
import AdminService from "@/services/AdminService";
import { VueEditor } from "vue2-editor";

export default {
  components: {
    VueEditor
  },
  mounted() {
    this.fetchVideoInfo();
  },
  methods: {
    fetchVideoInfo() {
      console.log("fetching video info: ");
      this.loading = true;
      AdminService.getAllVideos().then(response => {
        this.videos = response.data;
        this.loading = false;
        console.log("got all videos. this.loading: ", this.loading);
      });
      AdminService.getExerciseInfo().then(response => {
        this.exerciseCategories = response.data.Types;
      });
      // Set this.videos here
    },
    addVideo() {
      this.addPressed = true;
      this.editPressed = true;
      this.videos.unshift({
        id: 0,
        title: "",
        exerciseType: "",
        relatedExercisesString: "",
        description: ""
      });
    },
    cancelAdd() {
      this.addPressed = false;
      this.editPressed = false;
      this.videos.shift();
      // this.fetchVideoInfo();
    },
    editVideo(
      videoId,
      videoTitle,
      videoUrl,
      videoExerciseType,
      videoExerciseLevels,
      videoDescription
    ) {
      this.editPressed = true;
      this.editingVideoId = videoId;
      this.editVideoTitle = videoTitle;
      this.editVideoUrl = videoUrl;
      this.editVideoExerciseType = videoExerciseType;
      this.editVideoRelatedExercises = videoExerciseLevels;
      this.editVideoDescription = videoDescription;
      this.search = "";
      console.log("edit video pressed. ID: ", videoId);
    },
    saveVideo(videoId) {
      console.log(
        "this.editVideoRelatedExercises: ",
        this.editVideoRelatedExercises
      );
      let relatedExerciseLevels = this.editVideoRelatedExercises.map(item => {
        return parseInt(item);
      });
      console.log("relatedExerciseLevels: ", relatedExerciseLevels);
      let videoEditParams = {
        exerciseLevels: relatedExerciseLevels,
        exerciseType: this.editVideoExerciseType,
        title: this.editVideoTitle,
        description: this.editVideoDescription,
        //levelAccess:
        url: this.editVideoUrl
      };
      console.log("video edit params: ", videoEditParams);

      this.editPressed = false;
      this.editingVideoId = 0;
      this.editVideoTitle = "";
      this.editVideoUrl = "";
      this.editVideoExerciseType = "";
      this.editVideoRelatedExercises = [];
      this.editVideoDescription = "";
      console.log("edit video pressed. ID: ", videoId);
      this.loading = true;
      if (this.addPressed) {
        AdminService.addVideo(videoEditParams).then(response => {
          this.recentAdd = true;
          this.addPressed = false;
          this.editPressed = false;
          this.loading = false;
          this.fetchVideoInfo();
        });
        return;
      }
      AdminService.updateVideo(videoId, videoEditParams).then(response => {
        this.loading = false;
        this.recentAdd = false;
        console.log("response received!!!");
        console.log("this.loading: ", this.loading);
        this.fetchVideoInfo();
      });
    },
    deleteVideo(videoId) {
      this.editPressed = false;
      this.editingVideoId = 0;
      this.editVideoTitle = "";
      this.editVideoUrl = "";
      this.editVideoExerciseType = "";
      this.editVideoRelatedExercises = [];

      this.loading = true;

      console.log("deleting video. ID: ", videoId);
      AdminService.deleteVideo(videoId).then(response => {
        this.addPressed = false;
        this.editPressed = false;
        this.recentDelete = true;
        this.recentAdd = false;
        this.loading = false;
        console.log("video deleted!!");
        console.log("this.loading: ", this.loading);
        this.fetchVideoInfo();
      });
    }
  },
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Title",
          align: "left",
          sortable: true,
          value: "title"
        },
        {
          text: "Embed URL",
          align: "left",
          sortable: true,
          value: "url"
        },
        {
          text: "Exercise Category",
          align: "left",
          sortable: true,
          value: "exerciseType"
        },
        {
          text: "Related Exercises",
          align: "left",
          sortable: true,
          value: "relatedExercisesString"
        },
        {
          text: "Edit & View Details",
          align: "left",
          sortable: false,
          value: "workoutsCompleted"
        }
      ],

      editPressed: false,

      recentAdd: false,

      addPressed: false,

      editingVideoId: 0,

      loading: false,

      editVideoTitle: "",
      editVideoUrl: "",
      editVideoExerciseType: "",
      editVideoRelatedExercises: [],
      editVideoDescription: "",

      exerciseCategories: [],
      relatedExerciseOptions: [],

      videos: []
    };
  },
  watch: {
    editVideoExerciseType: function(newVal) {
      AdminService.getExerciseInfo().then(response => {
        let relatedExercises = response.data.Exercises[newVal];
        let newLevels = [];
        for (var level in relatedExercises) {
          let option = {
            level
          };
          let name = relatedExercises[level].name;
          option.name = name;
          newLevels.push(option);
        }
        this.relatedExerciseOptions = newLevels;
      });
    },
    editVideoDescription: function(newVal) {
      console.log("editVideoDescription changing: ", newVal);
    }
  }
};
</script>


<style lang="scss">
.admin-videos-container {
  flex: 1;
  min-width: 735px;
  margin-top: 16px;
  padding-left: 30px;
  padding-right: 30px;
}

table.admin-videos-table {
  width: 100%;
  // border-collapse: collapse;
  border: 1px solid black;
  table-layout: fixed;
  overflow: auto;
  height: auto;

  td,
  th {
    height: auto;
    border: 1px solid black;
    min-width: 100px;
    overflow: auto;
    word-wrap: break-word;
    padding: 0 1px;
    text-align: center;

    input:not(:first-child),
    select:not(:first-child),
    div:not(:first-child),
    span:not(:first-child) {
      margin-top: 1px;
    }

    input:first-child,
    select:first-child,
    div:first-child,
    span:first-child {
      // border-top: 1px solid white;
    }

    input,
    select,
    div,
    span {
      width: 100%;
      height: 24px !important;
      text-align: center !important;
    }

    input {
      border-radius: 5px;
    }

    select {
    }

    input,
    select {
      border: 0px solid white !important;
      // background-color: $blueLighten4 !important;
    }
  }

  td:nth-of-type(1),
  td:nth-of-type(2) {
    padding: 0 8px;
  }

  th {
    padding: 8px;
  }
}
</style>