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


window.$ = window.jQuery = jQuery;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
