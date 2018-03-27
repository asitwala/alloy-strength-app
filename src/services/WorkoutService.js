import Api from './Api';

export default {
    fetchWorkoutInfo() {
        return Api().get('/vue-api');
    }
};