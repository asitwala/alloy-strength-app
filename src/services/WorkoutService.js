import Api from './Api';

export default {
    fetchWorkoutInfo() {
        return Api().get('/workout');
    }
};