<template>
  <div class="dashboard">
    <h1>Dashboard page</h1>
    
    <p>Email : {{this.$store.getters.getUser.email}}</p>
    <p>UID : {{this.$store.getters.getUser.uid}}</p>
  </div>
</template>
