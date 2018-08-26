<template>
    <div class="admin-users-container" 
        >
        <div class="as-loading" v-if="loading">
            <v-progress-circular indeterminate color="primary"/>
        </div>
        <div v-if="!loading">
            <h1>Users Database ({{users.length}} users)</h1>
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
            ></v-text-field>            

            <v-data-table
                :headers="headers"
                :items="users"
                :search="search"
                hide-actions
                class="elevation-1"
                v-if="!viewPressed"
            >
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.name }}</td>
                    <td v-if="props.item.level">{{ props.item.level }}</td>
                    <td v-else>--</td>
                    <td>{{ props.item.username }}</td>
                    <td v-if="props.item.stats['UB Hor Push']" 
                    style="padding-top:3px; padding-bottom:3px;">
                        <span v-if="props.item.stats['UB Hor Push'] && props.item.stats['UB Hor Push'].Max"> 
                            UB Hor Push: {{props.item.stats['UB Hor Push'].Max}} lbs
                        </span>
                        <span v-else> 
                            UB Hor Push: --
                        </span>
                        <br>
                        <span v-if="props.item.stats['Squat'] && props.item.stats['Squat'].Max"> 
                            Squat: {{props.item.stats['Squat'].Max}} lbs
                        </span>
                        <span v-else> 
                            Squat: --
                        </span>
                        <br>
                        <span v-if="props.item.stats['Hinge'] && props.item.stats['Hinge'].Max"> 
                            Hinge: {{props.item.stats['Hinge'].Max}} lbs
                        </span>
                        <span v-else> 
                            Hinge: --
                        </span>
                    </td>
                    <td v-else>Not Available</td>
                    <td>{{ props.item.workoutsCompleted }}</td>
                    <td>
                        <v-btn color="primary" style="color: white; margin-left: 0px !important; margin-top: 8px;" 
                        v-if="!viewPressed"
                        @click='viewWorkouts(props.item.id, props.item.username, props.item.name, props.item.workouts)'>
                            Click to View
                        </v-btn>
                    </td>

                </template>
            </v-data-table>            

            <table class="admin-users-table" v-if="viewPressed">
                <tr>
                    <th style="width:200px;">Workout Dates</th>
                    <th>Workout Information</th> 
                </tr>
                <tr>
                    <td style="width:200px;">
                        <b>Last Week's Workouts for: </b>
                        <br> {{selectedUserName}}
                        <br> {{selectedUserEmail}}
                        <br><br>
                        <a v-for="dateObj in recentUserWDates" :key="dateObj.wID"
                        @click="showWorkout(dateObj.wID)">
                            {{dateObj.string}}
                        </a>
                        <br>
                        <v-btn color="primary" style="color: white; margin-left: 0px !important; margin-top: 8px;" 
                        v-if="viewPressed"
                        @click='backtoUsers'>
                            Back to Users
                        </v-btn>

                    </td>
                    <td>                        
                        <table style="margin:auto;" v-if="showingWorkout">
                        <tr>
                            <b>  {{displayWorkout.Describer}} - 
                                <span v-if="displayWorkout.Completed" style="color:green; margin-left:0px;">Workout Complete</span>
                                <span v-else style="color:red;">Workout Incomplete</span>
                            </b>
                        </tr>
                        <tr>
                            <th>Pattern</th>
                            <th>Exercise</th> 
                            <th>Reps</th>
                            <th>Weight</th>
                            <th>RPE</th>
                        </tr>
                        <tr v-for="pattern in displayWorkout.Patterns" :key="pattern.number">
                            <td>
                                {{pattern.type}}
                            </td>
                            <td>
                                {{pattern.name}}
                            </td>
                            <td>
                                <div v-for="set in pattern.setList" :key="set.setNum"
                                style="border: solid 1 px black;">
                                    {{set.Reps}}
                                </div>
                            </td>
                            <td>
                                <div v-for="set in pattern.setList" :key="set.setNum"
                                style="border: solid 1 px black;">
                                    {{set.Weight}}
                                </div>
                            </td>
                            <td>
                                <div v-for="set in pattern.setList" :key="set.setNum"
                                style="border: solid 1 px black;">
                                    {{set.RPE}}
                                </div>
                            </td>
                        </tr>
                        </table>
                    </td>
                </tr>
            </table>            
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
    this.fetchUsersInfo();
  },
  methods: {
    backtoUsers() {
      this.selectedUserId = 0;
      this.selectedUserEmail = "";
      this.selectedUserName = "";
      this.selectedUserWorkouts = {};
      this.viewPressed = false;
      this.showingWorkout = false;
      this.recentUserWDates = [];
    },
    fetchUsersInfo() {
      this.loading = true;
      AdminService.getAllUsers().then(response => {
        this.users = response.data;
        this.loading = false;
      });
    },
    viewWorkouts(userId, userEmail, userName, userWorkouts) {
      this.selectedUserId = userId;
      this.selectedUserEmail = userEmail;
      this.selectedUserName = userName;
      this.selectedUserWorkouts = userWorkouts;
      let lastWeek = Date.now() - 7 * 24 * 60 * 60 * 1000;
      this.recentUserWDates.push(new Date(lastWeek));
      for (var K in userWorkouts) {
        let workout = userWorkouts[K];
        let wDate = new Date(workout.Date);
        if (
          wDate <= Date.now()
          // && wDate > lastWeek
        ) {
          let obj = {
            wID: K,
            string: workout.Date.split("T")[0] + " (Click to View)"
          };
          this.recentUserWDates.push(obj);
        }
      }
      this.viewPressed = true;
      this.search = "";
    },
    showWorkout(wID) {
      this.showingWorkout = true;
      this.displayWorkout = this.selectedUserWorkouts[wID];
    }
  },
  data() {
    return {
      users: [],
      search: "",
      headers: [
        {
          text: "Name",
          align: "left",
          sortable: true,
          value: "name"
        },
        {
          text: "Level",
          align: "left",
          sortable: true,
          value: "level"
        },
        {
          text: "Email",
          align: "left",
          sortable: true,
          value: "username"
        },
        {
          text: "Core Stats",
          align: "left",
          sortable: false,
          value: "corestats"
        },
        {
          text: "Workouts Completed",
          align: "left",
          sortable: true,
          value: "workoutsCompleted"
        },
        {
          text: "Recent Workouts",
          align: "left",
          sortable: false,
          value: "recentWorkouts"
        }
      ],

      viewPressed: false,
      showingWorkout: false,

      loading: false,

      selectedUserId: 0,
      selectedUserName: "",
      selectedUserEmail: "",
      selectedUserWorkouts: {},
      recentUserWDates: [],
      displayWorkout: {},

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
  watch: {}
};
</script>


<style lang="scss">
.admin-users-container {
  flex: 1;
  min-width: 735px;
  margin-top: 16px;
  padding-left: 30px;
  padding-right: 30px;
}

table.admin-users-table {
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