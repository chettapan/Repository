import Vue from "vue";
import Router from "vue-router";
import Home from "../components/Home";
import Register from "../components/Register";
import Login from "../components/Login";
// import Profile from '../components/Profile'
// import ChatApp from "../components/ChatApp";
import NewChat from "../components/NewChat";

Vue.use(Router);

export default new Router({
  routes: [
    
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/newchat',
      name: 'NewChat',
      component: NewChat
    }
    // {
    //   path: '/chatapp',
    //   name: 'ChatApp',
    //   component: ChatApp
    // }
  ]
})
