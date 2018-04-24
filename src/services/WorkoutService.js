import Api from './Api';

export default {
    fetchWorkoutInfo(userId, workoutId) {
        var _URL = `/api/users/${userId}/workouts/${workoutId}/vue`;
        console.log("fetchingworkoutInfo from: ", _URL);
        return Api().get(`/api/users/${userId}/workouts/${workoutId}/vue`);
    },
    postWorkoutInfo(workout) {
        var _URL = `/api/users/${workout.userId}/workouts/${workout.WID}/save`;
        console.log("workout", workout);
        console.log(_URL);
        //Change to save-submit-clear soon
        return Api().post(`/api/users/${workout.userId}/workouts/${workout.WID}/save`, workout);
    },
    submitWorkoutInfo(workout) {
        var _URL = `/api/users/${workout.userId}/workouts/${workout.WID}/submit`;
        return Api().put(`/api/users/${workout.userId}/workouts/${workout.WID}/submit`, workout);        
    },
    clearWorkoutInfo(userId, workoutId) {
        var _URL = `/api/users/${userId}/workouts/${workoutId}/clear`;
        return Api().put(`/api/users/${userId}/workouts/${workoutId}/clear`);        
        
    }
};