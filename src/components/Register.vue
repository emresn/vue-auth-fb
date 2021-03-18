



<template>
  <div>
            <h1>Register Page</h1>

    <label for="email">Email</label><br>
    <input type="text" id="email" v-model="user.email" />
    <br>
     <label for="password">Password</label><br>
    <input type="password" id="password" v-model="user.password" />
    <br>
    <button type="submit" @click="register()">Register</button>
    <p>Have an account? </p>
    <button @click="$router.push('/login')" >Login</button>
  </div>
</template>



<script>


export default {
  data() {
    return {
      user: {
        email: "",
      password: "",
      }
    };
  },
  methods: {
    register(){
      console.log(this.user.email),
      console.log(this.user.password)
      this.$store.dispatch("signUp",{...this.user}).then(response =>{
        console.log(response)
        this.$router.push("/dashboard")
        })
    }
  }
}
</script>
