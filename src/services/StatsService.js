import Api from './Api'; 

export default {
    fetchStatsInfo(userId) {
        return Api().get(`/api/users/${userId}/stats/vue/get`);
    }
};