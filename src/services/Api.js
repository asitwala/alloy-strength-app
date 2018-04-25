import axios from 'axios';

export default () => {
  return axios.create({
    baseURL: 'https://immense-mesa-37246.herokuapp.com' //'http://localhost:3000'
  })
}