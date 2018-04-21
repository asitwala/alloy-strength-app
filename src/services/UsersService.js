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
  }
}
