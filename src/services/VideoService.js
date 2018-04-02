import Api from './Api'; 

export default {
    fetchVideoInfo() {
        return Api().get('/api/json/videos/vue-api');
    }
}