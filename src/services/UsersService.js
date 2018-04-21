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
  logoutUser(params) {

  }
}
