import Api from './Api';

export default {
  fetchAllInfo() {
    return Api().get('');
  },
  fetchUsers() {
    return Api().get('/users');
  },
  signupUser(params) {
    return Api().post('/api/users', params); // P1, P2, username, name (to be added)
  },
  sendEmailConfirmation(userId) {
    return Api().post(`/api/users/${userId}/confirmation-email`);
  },
  getEmailConfirmation(userId, confString) {
    return Api().get(`/api/users/${userId}/confirm/${confString}`);
  },
  forgotPassword(userId) {
    return Api().post(`/api/users/${userId}/forgot-password`);
  },
  subscribe(userId, params) {
    return Api().post(`/api/users/${userId}/subscribe`, params); // params: { planID: 1 or 2, token: stripe token}
  },
  renewSubscription(userId, params) {
    return Api().post(`/api/users/${userId}/renew-subscription`, params); 
  },
  changeSubscription(userId, params) { // params: { newPlanID: 'AS_Gold' or 'AS_Silver', cancel: true or false }
    return Api().put(`/api/users/${userId}/change-subscription`, params);
  },
  getSubscriptionInfo(userId) {
    return Api().get(`/api/users/${userId}/subscription-info`); 
  },
  loginUser(params) {
    return Api().post(`/api/users/${params.username}/login`, params);
  },
  getLevelInitially(userId, params) {
    return Api().put(`/api/users/${userId}/get-level`, params);
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
  },
  getAccessInfo(userId) {
    return Api().get(`api/users/${userId}/access-info`);
  }
}
