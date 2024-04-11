import { defineStore } from "pinia";

export const useUsersStore = defineStore("users", {
  state: () => ({
    users: [
      {
        id: 1,
        name: "Thomas Anderson",
        avatar: "https://via.placeholder.com/150",
        status: "online",
      },
      {
        id: 2,
        name: "Keanu Reeves",
        avatar: "https://via.placeholder.com/150",
        status: "online",
      },
      {
        id: 3,
        name: "John Wick",
        avatar: "https://via.placeholder.com/150",
        status: "online",
      },
    ],
  }),
  getters: {
    getAllUsers: (state) => state.users,
  },
});
