import axios from 'axios';

export default () => {
  return axios.create({
    baseURL: 'http://localhost:5000',
    // 'https://immense-mesa-37246.herokuapp.com' // 'http://localhost:5000' // 'https://immense-mesa-37246.herokuapp.com' //'
  })
}