<template>
  <div class="home">
    <h2>Welcome {{user}}</h2>
    <button v-on:click="logout">Logout</button>
    <log-practice></log-practice>
  </div>
</template>

<script>
import Vue from "vue";
import firebase from "firebase";
import LogPractice from "./LogPractice";

Vue.component("log-practice", LogPractice);

export default {
  name: "home",
  data() {
    return { user: "..." };
  },
  mounted() {
    const home = this;
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        home.user = user.displayName;
      }
    });
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace("SignIn");
        });
    },
  },
};
</script>
