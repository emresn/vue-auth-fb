<template>
  <div id="app">
   <div class="maincontainer">
      <div id="nav">
      <router-link to="/">Home</router-link> 
      <router-link to="/about">About</router-link> 
      <router-link to="/dashboard" v-if="isAuthenticated">Dashboard</router-link> 
      <router-link to="/login" v-if="!isAuthenticated">Login</router-link> 
      <router-link to="/register" v-if="!isAuthenticated">Register</router-link> 
      <a href="" @click="logOut()" class="nav" v-if="isAuthenticated">Logout</a>
    </div>
    <router-view />

   </div>
  </div>
</template>



<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      
    };
  },
  methods: {
    logOut() {
      this.$store.dispatch('signOut')
    }
   
  },
  created() {
    this.$store.dispatch('initAuth')
    
  },
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "getUser",
      isAuthenticated: "isAuthenticated"
    }),
  },
}
</script>



<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.maincontainer{
  width: 80%;
  margin: auto;
  height: 80%;
  align-items: center;
  
  
}

#nav {
  padding: 30px;
  
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  margin-left: 10px;
  margin-right: 10px;
}
#nav a:hover {
  color: rgb(87, 28, 197);
}

#nav a.router-link-exact-active {
  color: rgb(87, 28, 197);
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: rgb(87, 28, 197);
}
button {
  width: 100px;
  height: 30px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 1rem;
  margin-top: 10px;
  background-color: rgb(87, 28, 197);
  color: #fff;
  outline: none;
  border: none;
}
button:hover {
  background-color: rgb(180, 179, 182);
  color: rgb(3, 3, 3);
}
input {
  width: 250px;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
label {
  text-align: left;
  font-weight: bold;
  margin-top: 20px;
}
.parag {
  text-align: justify;
  
}
</style>
