import Vue from "vue";
import Vuex from "vuex";
import firebaseConfig from "../firebase/firebaseConfig";
import axios from "axios";
import router from "../router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      email: "",
      token: "",
      uid: "",
    },
    isUser: false,
  },
  mutations: {
    setUser(state, response) {
      state.user.email = response.data.email;
      state.user.uid = response.data.localId;
      state.user.token = response.data.idToken;
      state.isUser = true;
    },

    clearUser(state) {
      state.user.email = "";
      state.user.uid = "";
      state.user.token = "";
      state.isUser = false;
      localStorage.removeItem("email");
      localStorage.removeItem("uid");
      localStorage.removeItem("token");
    },
  },
  actions: {
    initAuth({ commit, dispatch }) {
      let email = localStorage.getItem("email");
      let uid = localStorage.getItem("uid");
      let token = localStorage.getItem("token");
      let localdata = { data: { email: email, localId: uid, idToken: token } };

      if (token) {
        let expirationTime = localStorage.getItem("expirationTime");
        let time = new Date().getTime();

        if (time > +expirationTime) {
          // console.log("token timer is over");
          dispatch("signOut");
        } else {
          let timeDifference = +expirationTime - time;
          // console.log(timeDifference);
          commit("setUser", localdata);
          dispatch("setLoggedTimer", timeDifference);

          if (router.currentRoute.path !== "/") {
            router.push("/");
          }
        }
      }
    },
    signIn({ commit, dispatch }, authData) {
      return axios
        .post(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
            firebaseConfig.apiKey,
          {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true,
          }
        )
        .then((response) => {
          commit("setUser", response);
          localStorage.setItem("email", response.data.email);
          localStorage.setItem("uid", response.data.localId);
          localStorage.setItem("token", response.data.idToken);
          localStorage.setItem(
            "expirationTime",
            new Date().getTime() + +response.data.expiresIn * 1000
          );
          // localStorage.setItem("expirationTime", new Date().getTime() + 10000);

          dispatch("setLoggedTimer", +response.data.expiresIn * 1000);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    signUp({ commit, dispatch }, authData) {
      return axios
        .post(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
            firebaseConfig.apiKey,
          {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true,
          }
        )
        .then((response) => {
          commit("setUser", response);
          localStorage.setItem("email", response.data.email);
          localStorage.setItem("uid", response.data.localId);
          localStorage.setItem("token", response.data.idToken);
          localStorage.setItem(
            "expirationTime",
            new Date().getTime() + +response.data.expiresIn * 1000
          );
          dispatch("setLoggedTimer", +response.data.expiresIn * 1000);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    signOut({ commit }) {
      commit("clearUser");
      router.replace("/login");
    },
    setLoggedTimer({ dispatch }, expiresIn) {
      // console.log(expiresIn);
      setTimeout(() => {
        dispatch("signOut");
      }, expiresIn);
    },
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    isAuthenticated(state) {
      return state.user.token !== "";
    },
  },
});
