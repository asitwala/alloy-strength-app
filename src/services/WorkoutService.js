import Api from './Api';

export default {
    fetchWorkoutInfo() {
        return Api().get('/getWorkout');
    },
    postWorkoutInfo(workout) {
        return Api().post('/postWorkout', workout);
    }
};