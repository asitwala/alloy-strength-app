import Api from './Api'; 

export default {
    fetchProgressInfo(userId) {
        return Api().get(`/api/user/${userId}/progress/vue/get`);
    }
};