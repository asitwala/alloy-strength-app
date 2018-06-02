import Api from './Api'; 

export default {
    fetchVideoInfo(userId) {
        return Api().get(`/api/users/${userId}/videos`);
    }
}