import Api from './Api';

export default {
    fetchWorkoutInfo(userId, workoutId) {
        return Api().get(`/api/users/${userId}/workouts/${workoutId}/vue`);
    },
    saveWorkoutInfo(workout) {
        return Api().post(`/api/users/${workout.userId}/workouts/${workout.WID}/save`, workout);
    },
    submitWorkoutInfo(workout) {
        return Api().put(`/api/users/${workout.userId}/workouts/${workout.WID}/submit`, workout);        
    },
    clearWorkoutInfo(userId, workoutId) {
        return Api().put(`/api/users/${userId}/workouts/${workoutId}/clear`);        
    }
};