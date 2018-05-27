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
  subscribe(userId, params) {
    return Api().post(`/api/users/${userId}/subscribe`, params); // params: { plan: 1 or 2, token: stripe token}
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
  getPreviousWorkouts(userId) {
    return Api().get(`/api/users/${userId}/reschedule-workouts`);
  },
  rescheduleWorkouts(userId, params) {
    return Api().post(`/api/users/${userId}/reschedule-workouts`, params); // params: { restartDate: Date, DoW: days of week (indexed with 0 as Sunday and so on...)}
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
