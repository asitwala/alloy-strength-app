import Api from './Api';

export default {
    fetchWorkoutInfo(userId, workoutId) {
        var _URL = `/api/users/${userId}/workouts/${workoutId}/vue`;
        console.log("fetchingworkoutInfo from: ", _URL);
        return Api().get(`/api/users/${userId}/workouts/${workoutId}/vue`);
    },
    postWorkoutInfo(workout) {
        //Change to save-submit-clear soon
        return Api().post('/postWorkout', workout);
    }
};