import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap";
import "popper.js";
import "./assets/app.scss";
import jQuery from "jquery";
import "./css/loginmain.css";
import "./css/loginstyle.css";
import "./css/util.css";
require('../node_modules/bootstrap/dist/css/bootstrap.css')

import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios)


window.$ = window.jQuery = jQuery;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
