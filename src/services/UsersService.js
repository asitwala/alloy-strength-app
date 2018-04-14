import Api from './Api';

export default {
  fetchAllInfo() {
    return Api().get('');
  },
  
  fetchUsers() {
    return Api().get('/users');
  },

  addUser(params) {
    console.log("params", params);
    return Api().post(
      'api/user/signup', 
      params, 
    {
      headers: {
        credentials: 'same-origin'
      }
    }
    );
  }
}

