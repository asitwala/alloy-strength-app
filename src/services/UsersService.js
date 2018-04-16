import Api from './Api';

export default {
  fetchAllInfo() {
    return Api().get('');
  },
  
  fetchUsers() {
    return Api().get('/users');
  },
  addUser(params) {
    return Api().post('users', params);
  },
  loginUser(params) {
    return Api().post(`/api/users/${params.username}/login`, params);
  }
}
