// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import firebase from "firebase";
import App from "./App";
import router from "./router";

Vue.config.productionTip = false;

let app;
const config = {
  apiKey: "AIzaSyCYyfhopCE0jCEdDUsxrMinUSYw1G-HZ8U",
  authDomain: "musicp.firebaseapp.com",
  databaseURL: "https://musicp.firebaseio.com",
  projectId: "firebase-musicp",
  storageBucket: "",
  messagingSenderId: "144253523802",
};

firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      el: "#app",
      template: "<App/>",
      components: { App },
      router,
    });
  }
});
