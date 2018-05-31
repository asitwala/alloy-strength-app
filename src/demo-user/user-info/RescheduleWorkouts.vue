<template>
    <div class="as-reschedule-workouts">

        <div class="as-set-new-levels">
            <as-set-levels given-title="Reschedule Workouts" :reschedule="true"></as-set-levels>
        </div>
        
        <v-card class="as-previous-workouts-table">
            <v-card-text>
                <v-data-table
                    :headers="previousWorkoutsTableHeaders"
                    :items="previousWorkoutsTableItems"
                    hide-actions>
                    <template slot="items" slot-scope="props">
                        <td> {{ props.item.workoutDescriber }}</td>
                        <td> {{ props.item.date }}</td>
                        <td> {{ props.item.completed }}</td>
                    </template>
                </v-data-table>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>

    // green for completed
    // red for missed
    // blue for future 


    import moment from 'moment'; 

    import SetLevels from '@/demo-user/user-info/SetLevels';
    import UsersService from '@/services/UsersService'; 

    export default {
        components: {
            'as-set-levels': SetLevels
        },
        data() {
            return {
                previousWorkoutsTableItems: [],
                previousWorkoutsTableHeaders: [
                    { value: 'workoutDescriber', text: 'Workout' },
                    { value: 'date', text: 'Date' },
                    { value: 'completed', text: 'Completed?' }
                ], 
            }
        },
        mounted() {
            this.getPreviousWorkouts();
        },
        methods: {
            getPreviousWorkouts() {
                UsersService.getPreviousWorkouts(this.$session.get("user").id).then(response => {
                    response.data.workouts.forEach(workout => {
                        let previousWorkout = {};
                        previousWorkout.value = false; 
                        previousWorkout.date = moment(workout.Date).format('MMM DD, YYYY');
                        previousWorkout.workoutDescriber = `Week ${workout.Week}, Day ${workout.Day}`;
                        previousWorkout.completed = workout.Completed; 
                        previousWorkout.missed = workout.Missed; 
                        this.previousWorkoutsTableItems.push(previousWorkout); 
                    });
                });
            }
        }
    };

</script>


<style lang="scss">

.as-reschedule-workouts {
    width: 100%; 
    display: flex;
    flex-wrap: wrap;
}

.as-set-new-levels {
    flex: 1; 
}

.as-previous-workouts-table {
    min-width: 300px;
}

</style>