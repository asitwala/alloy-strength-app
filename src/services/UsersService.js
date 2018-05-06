import Api from './Api';

export default {
  fetchAllInfo() {
    return Api().get('');
  },
  fetchUsers() {
    return Api().get('/users');
  },
  signupUser(params) {
    return Api().post('/api/users', params);
  },
  loginUser(params) {
    return Api().post(`/api/users/${params.username}/login`, params);
  },
  getLevelInitially(userId, params) {
    return Api().post(`/api/users/${userId}/get-level`, params);
  }, 
  generateWorkouts(userId, params) {
    return Api().post(`/api/users/${userId}/get-next-workouts`, params);
  },
  adminGenerateWorkouts(userId, params) {
    return Api().post(`/api/users/${userId}/admin/generate-workouts`, params);
  },
  getLastWorkout(userId) {
    return Api().get(`api/users/${userId}/last-workout/vue`);
  },
  getProfileInfo(userId) {
    return Api().get(`api/users/${userId}/profile-info`);
  },
  changePassword(userId, params) {
    return Api().put(`/api/users/${userId}/change-password`, params);
  }
}
