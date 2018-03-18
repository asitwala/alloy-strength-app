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
  }
}
