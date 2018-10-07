import Api from './Api'; 

export default {
    getAllUsers() {
        return Api().get(`/api/users`);
    },
    getAllVideos() {
        return Api().get(`/api/videos`);
    },
    getExerciseInfo() {
        return Api().get(`/api/json/exercises`);
    },
    updateVideo(id, params) {
        return Api().put(`/api/admin/videos/${id}`, params);
    },
    deleteVideo(id) {
        return Api().delete(`/api/admin/videos/${id}`);
    },
    addVideo(params) {
        return Api().post(`/api/admin/videos/`, params);
    },
    getAllCustomers() {
        return Api().get(`/api/stripe/customers-custom/`);
    }

};