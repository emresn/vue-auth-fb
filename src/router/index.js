import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Dashboard from "../views/Dashboard";
import About from "../views/About";
import Login from "../components/Login";
import Register from "../components/Register";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    beforeEnter(to, from, next) {
      if (store.getters.isAuthenticated) {
        next();
      } else { 
        next("/login");
      }
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    beforeEnter(to, from, next) {
      if (!store.getters.isAuthenticated) {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    beforeEnter(to, from, next) {
      if (!store.getters.isAuthenticated) {
        next();
      } else {
        next("/");
      }
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});


export default router;
