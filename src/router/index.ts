import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/sign-in",
    },
    {
      path: "/sign-in",
      name: "SignIn",
      component: () => import("@/views/SignIn.vue"),
    },
    {
      path: "/user",
      name: "ChatInterface",
      component: () => import("@/views/ChatInterface.vue"),
    },
  ],
});

export default router;
