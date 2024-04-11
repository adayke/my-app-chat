import router from "@/router";
import { defineStore } from "pinia";

interface User {
  id: number;
  name: string;
  email: string;
  isUserAuth: boolean;
}

const fakeUsers = [
  {
    id: 1,
    email: "thomas@example.com",
    password: "password123",
    name: "Thomas Anderson",
  },
  {
    id: 2,
    email: "keanu@example.com",
    password: "password123",
    name: "Keanu Reeves",
  },
  {
    id: 3,
    email: "john@example.com",
    password: "password123",
    name: "John Wick",
  },
];

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as User | null,
    token: null as string | null,
    isUserAuth: false,
  }),

  getters: {
    isLoggedIn: (state) => !!state.user,
    isUserAuthenticated: (state) => state.isUserAuth,
    getUserName: (state) => state.user?.name,
  },

  actions: {
    login(email: string, password: string) {
      const foundUser = fakeUsers.find(
        (user) => user.email === email && user.password === password
      );
      if (foundUser) {
        this.user = {
          id: foundUser.id,
          name: foundUser.name,
          email: foundUser.email,
          isUserAuth: true,
        };

        this.token = `fake-token-${foundUser.id}`;

        sessionStorage.setItem("authToken", this.token);
        sessionStorage.setItem("userId", this.user.id as any);
        sessionStorage.setItem("authUser", JSON.stringify(this.user));
        sessionStorage.setItem("isUserAuth", JSON.stringify(true));
        sessionStorage.setItem("user", JSON.stringify(this.user));

        router.push("/user");
      } else {
        alert("Invalid credentials");
        throw new Error("Invalid credentials");
      }
    },

    logout() {
      this.user = null;
      this.token = null;
      this.isUserAuth = false;

      sessionStorage.removeItem("authToken");
      sessionStorage.removeItem("authUser");
      sessionStorage.removeItem("isUserAuth");
      sessionStorage.removeItem("userId");
      sessionStorage.removeItem("user");

      router.push("/");
    },

    loadSession() {
      const token = sessionStorage.getItem("authToken");
      const user = sessionStorage.getItem("authUser");
      const isUserAuth = sessionStorage.getItem("isUserAuth");

      if (token && user && isUserAuth) {
        this.token = token;
        this.user = JSON.parse(user);
      }
    },
  },
});
