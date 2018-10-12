// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import VueSession from "vue-session";
import App from "./App";
import router from "./router";
import Vuetify from "vuetify";
import "./assets/stylus/main.styl";
import ManageAccess from "./demo-common/mixins/ManageAccess";
import VueStripeCheckout from "vue-stripe-checkout";
import "babel-polyfill";

// Tell Vue to install the plugin.
Vue.use(VueSession, {
  persist: true
});

Vue.mixin(ManageAccess);

Vue.use(Vuetify);

Vue.config.productionTip = false;

const options = {
  key: "pk_live_PWmtkdqxq5DvLLcRz298lZQs",
  locale: "auto",
  currency: "USD",
  billingAddress: false,
};

Vue.use(VueStripeCheckout, options);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
