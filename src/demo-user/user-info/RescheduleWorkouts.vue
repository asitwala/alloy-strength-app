<template>
    <div class="as-reschedule-workouts-container">
        <div class="as-loading" v-if="loading">
            <v-progress-circular indeterminate color="primary"/>
        </div>

        <transition name="as-fade">
            <div class="as-reschedule-workouts" v-if="!loading">
                <div class="as-set-new-levels">
                    <as-set-levels given-title="Reschedule Workouts" :reschedule="true"></as-set-levels>
                </div>
                
                <div class="as-previous-workouts">
                    <v-card class="as-previous-workouts-table">
                        <v-card-text>
                            <v-data-table
                                :headers="previousWorkoutsTableHeaders"
                                :items="previousWorkoutsTableItems"
                                hide-actions>
                                <template slot="items" slot-scope="props">
                                    <td> {{ props.item.workoutDescriber }}</td>
                                    <td> {{ props.item.date }}</td>
                                    <td> {{ props.item.completed ? 'Yes' : 'No'}} 
                                        <v-icon v-if="props.item.completed" small color="green">check_circle</v-icon>
                                    </td>
                                </template>
                            </v-data-table>
                        </v-card-text>
                    </v-card>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import moment from "moment";

import SetLevels from "@/demo-user/user-info/SetLevels";
import UsersService from "@/services/UsersService";

export default {
  components: {
    "as-set-levels": SetLevels
  },
  data() {
    return {
      previousWorkoutsTableItems: [],
      previousWorkoutsTableHeaders: [
        { value: "workoutDescriber", text: "Workout" },
        { value: "date", text: "Date" },
        { value: "completed", text: "Completed?" }
      ],
      loading: false
    };
  },
  mounted() {
    this.getPreviousWorkouts();
  },
  methods: {
    getPreviousWorkouts() {
      this.loading = true;
      UsersService.getPreviousWorkouts(this.$session.get("user").id)
        .then(response => {
          if (this.validAccessLevelGM(response.data.accessLevel)) {
            this.handleAccessLevelGM(response.data.accessLevel);
          }

          response.data.workouts.forEach(workout => {
            let previousWorkout = {};
            previousWorkout.value = false;
            let dateOnlyString = workout.Date.split("T")[0];
            previousWorkout.date = moment(dateOnlyString).format(
              "MMM DD, YYYY"
            );
            previousWorkout.workoutDescriber = `Week ${workout.Week}, Day ${
              workout.Day
            }`;
            previousWorkout.completed = workout.Completed;
            previousWorkout.missed = workout.Missed;
            this.previousWorkoutsTableItems.push(previousWorkout);
          });
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>


<style lang="scss">
@import "~@/demo-common/styles/colors";

.as-reschedule-workouts-container {
  height: 100%;
}

.as-reschedule-workouts {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

.as-set-new-levels {
  flex: 2;
  margin-bottom: 24px;
}

.as-previous-workouts {
  min-width: 400px !important;
  flex: 1;
  overflow: auto;
}

.as-previous-workouts-table {
  .card__text {
    padding: 0px !important;
  }
}
</style>