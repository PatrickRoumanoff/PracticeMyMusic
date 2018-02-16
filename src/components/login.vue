<template>
  <div class="signup">
    <link type="text/css" rel="stylesheet" href="https://cdn.firebase.com/libs/firebaseui/2.6.0/firebaseui.css" />
    <h1>Login</h1>
    <div id="firebaseui-auth-container"></div>
    <div id="loader">Loading...</div>
    <p>logged in? You can go <router-link to="/home">home</router-link></p>
  </div>
</template>

<script>
import firebase from "firebase";
import firebaseui from "firebaseui";

function setupUI(router) {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      router.push("home");
    }
  });
  const ui = new firebaseui.auth.AuthUI(firebase.auth());
  ui.start("#firebaseui-auth-container", {
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccess(currentUser) {
        console.log(`success ${currentUser.displayName}`); // eslint-disable-line
        router.push({ path: "/home" });
        return false;
      },
      uiShown() {
        document.getElementById("loader").style.display = "none";
      },
    },
    // tosUrl: "<your-tos-url>",
  });
}
export default {
  name: "login",
  mounted() {
    setupUI(this.$router);
  },
};
</script>
