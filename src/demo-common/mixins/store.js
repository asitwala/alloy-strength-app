import Vue from 'vue'; 
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        authorized: false
    },
    mutations: {
        authorize(state) {
            state.authorized = true; 
        },
        unauthorize(state) {
            state.authorized = false; 
        }
    }
});

export default store;