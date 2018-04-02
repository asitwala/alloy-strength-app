import Api from './Api'; 

export default {
    fetchStatsInfo(userId) {
        return Api().get(`/api/user/${userId}/stats/vue/get`);
    }
};