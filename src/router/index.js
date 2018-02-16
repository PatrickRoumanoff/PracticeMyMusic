import Vue from "vue";
import Router from "vue-router";
import firebase from "firebase";
import login from "@/components/login";
import home from "@/components/home";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "*",
      redirect: "/login",
    },
    {
      path: "/",
      redirect: "/login",
    },
    {
      path: "/login",
      name: "login",
      component: login,
    },
    {
      path: "/home",
      name: "home",
      component: home,
      meta: {
        requiresAuth: true,
        title: "Practice my music",
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  document.title = to.meta.title;
  if (requiresAuth && !currentUser) {
    next("login");
  } else if (!requiresAuth && currentUser) {
    next("hello");
  } else next();
});

export default router;
