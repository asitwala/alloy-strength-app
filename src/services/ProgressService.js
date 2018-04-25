import Api from './Api'; 

export default {
    fetchProgressInfo(userId) {
        return Api().get(`/api/users/${userId}/progress/vue/get`);
    }
};