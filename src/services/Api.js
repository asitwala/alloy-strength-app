import axios from 'axios';

export default () => {
  return axios.create({
    // baseURL: 'https://obscure-citadel-34419.herokuapp.com' // 'http://localhost:3000'
    baseURL: 'http://localhost:3000' // 'http://localhost:3000'
  })
}

