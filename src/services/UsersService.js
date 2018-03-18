import Api from './Api';

export default {
  fetchUsers() {
    return Api().get('users');
  },

  addUser(params) {
    return Api().post('users', params);
  }
}
