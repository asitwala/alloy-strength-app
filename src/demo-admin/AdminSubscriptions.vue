<template>
 <div class="admin-subscriptions-container" 
     >
     <div class="as-loading" v-if="loading">
         <v-progress-circular indeterminate color="primary"/>
     </div>
     <div v-if="!loading">
         <div>
           <button @click="checkout">Checkout</button>
         </div>
         <h1>Subscriptions Dashboard</h1>
         <div>
              <v-card style="width:100%;">
                <v-expansion-panel
                      v-model="panel"
                      style="padding:40px;"
                      expand
                    >
                    <!-- https://vuetifyjs.com/en/components/cards -->
                      <v-expansion-panel-content>
                        <v-card-title slot="header" style="padding-left:-10px;"><h2>Your Plans</h2></v-card-title>                  
                         <v-list dense>
                         <v-list-tile>
                           <v-list-tile-content>Active Subscribers: </v-list-tile-content>
                           <v-list-tile-content 
                           style="align-items: flex-end !important;"
                           >
                            24</v-list-tile-content>
                         </v-list-tile>
                         <v-list-tile>
                           <v-list-tile-content>Total MRR: </v-list-tile-content>
                           <v-list-tile-content 
                           style="align-items: flex-end !important;"
                           >
                            24</v-list-tile-content>
                         </v-list-tile>
                         <v-list-tile>
                           <v-list-tile-content>Average Revenue per Subscriber: </v-list-tile-content>
                           <v-list-tile-content 
                           style="align-items: flex-end !important;"
                           >
                            24</v-list-tile-content>
                         </v-list-tile>
                        <v-form>
                          <v-flex xs12 sm6 md3>
                            <v-text-field
                              label="Plan Name"
                              placeholder="Plan Name"
                              box
                            ></v-text-field>
                            Plan Interval (dropdown)
                            <br>
                            Price (number)
                          </v-flex>
                        </v-form>

                          <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
                          <v-btn color="green" style="color: white; margin-left: 0px !important; margin-top: 8px;" 
                          v-if="!viewPressed"
                          @click='createSubscription()'>
                              Create Subscription
                          </v-btn>
                         </v-list> 

                      </v-expansion-panel-content>
                    </v-expansion-panel>             
              </v-card>

             <br><br>
              <v-card style="width:30%;">
                <v-expansion-panel
                      v-model="panel"
                      expand
                    >
                    <!-- https://vuetifyjs.com/en/components/cards -->
                      <v-expansion-panel-content>
                        <v-card-title slot="header" style="padding-left:0px;"><h2>Critical Numbers</h2></v-card-title>                  
                         <v-list dense>
                         <v-list-tile>
                           <v-list-tile-content>Active Subscribers: </v-list-tile-content>
                           <v-list-tile-content 
                           style="align-items: flex-end !important;"
                           >
                            24</v-list-tile-content>
                         </v-list-tile>
                         <v-list-tile>
                           <v-list-tile-content>Total MRR: </v-list-tile-content>
                           <v-list-tile-content 
                           style="align-items: flex-end !important;"
                           >
                            24</v-list-tile-content>
                         </v-list-tile>
                         <v-list-tile>
                           <v-list-tile-content>Average Revenue per Subscriber: </v-list-tile-content>
                           <v-list-tile-content 
                           style="align-items: flex-end !important;"
                           >
                            24</v-list-tile-content>
                         </v-list-tile>
                         </v-list> 
                          <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
                      </v-expansion-panel-content>
                    </v-expansion-panel>             
              </v-card>
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
             :items="customers"
             :search="search"
             hide-actions
             class="elevation-1"
             v-if="!viewPressed"
         >
             <template slot="items" slot-scope="props">
                 <td>{{ props.item.email }}</td>
                 <td>{{ props.item.subscriptionStatus }}</td>
                 <td>{{ props.item.MRR }}</td>
                 <td>{{ props.item.subscriptionPlan }}</td>
                 <td>{{ props.item.created }}</td>
                 <td>{{ props.item.totalBilled }}</td>
                 <td>
                     <v-btn color="red" style="color: white; margin-left: 0px !important; margin-top: 8px;" 
                     v-if="!viewPressed"
                     @click='viewWorkouts(props.item.id, props.item.username, props.item.name, props.item.workouts)'>
                         Cancel Subscription
                     </v-btn>
                 </td>

             </template>
         </v-data-table>            

         <table class="admin-subscriptions-table" v-if="viewPressed">
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
    // this.fetchUsersInfo();
    this.fetchCustomers();
    // this.$checkout.open({
    //   name: "Update Your Payment Source",
    //   currency: "USD",
    //   amount: 99999,
    //   token: token => {
    //     // Send the token to your server
    //     // for payment or subscription handling,
    //     // or do whatever you want with it
    //     // I don't really care.
    //   }
    // });
  },
  methods: {
    checkout() {
      // this.$checkout.close()
      // is also available.
      this.$checkout.open({
        name: "Shut up and take my money!",
        currency: "USD",
        amount: 99999,
        token: token => {
          // Send the token to your server
          // for payment or subscription handling,
          // or do whatever you want with it
          // I don't really care.
        }
      });
    },
    backtoUsers() {
      this.selectedUserId = 0;
      this.selectedUserEmail = "";
      this.selectedUserName = "";
      this.selectedUserWorkouts = {};
      this.viewPressed = false;
      this.showingWorkout = false;
      this.recentUserWDates = [];
    },
    fetchCustomers() {
      this.loading = true;
      AdminService.getAllCustomers().then(response => {
        console.log("response.data: ", response.data);
        this.customers = response.data.data;
        this.loading = false;
      });
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
      customers: [],
      expanded: [false],
      panel: [false, true, true],
      search: "",
      headers: [
        {
          text: "Name",
          align: "left",
          sortable: true,
          value: "email"
        },
        {
          text: "Status",
          align: "left",
          sortable: true,
          value: "subscriptionStatus"
        },
        {
          text: "Monthly Revenue Provided",
          align: "left",
          sortable: true,
          value: "MRR"
        },
        {
          text: "Subscription Plan",
          align: "left",
          sortable: true,
          value: "subscriptionPlan"
        },
        {
          text: "Sign Up Date",
          align: "left",
          sortable: true,
          value: "created"
        },
        {
          text: "Total Revenue Provided",
          align: "left",
          sortable: true,
          value: "totalBilled"
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
.admin-subscriptions-container {
  flex: 1;
  min-width: 735px;
  margin-top: 16px;
  padding-left: 30px;
  padding-right: 30px;
}

table.admin-subscriptions-table {
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