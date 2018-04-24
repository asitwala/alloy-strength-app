import axios from 'axios';

export default () => {
  return axios.create({
    baseURL: 'http://localhost:3000' // 'https://obscure-citadel-34419.herokuapp.com'
  })
}

