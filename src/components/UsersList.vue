<template>
  <div class="users-list">
    <h3>Выберите пользователя:</h3>
    <ul class="list-group">
      <li
        v-for="user in filteredUsers"
        :key="user.id"
        class="list-group-item list-group-item-action"
        style="cursor: pointer"
        @click="selectUser(user)"
      >
        {{ user.name }}
        <img
          src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
          style="width: 40px; height: 40px"
        />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useUsersStore } from "../store/users";
import { User } from "../core/types";

export default defineComponent({
  name: "UsersList",
  emits: ["user-selected"],
  props: [],
  setup(_, { emit }) {
    const store = useUsersStore();
    const users = store.getAllUsers;
    const myId = Number(sessionStorage.getItem("userId"));

    let filteredUsers = users.filter((user) => myId !== user.id);

    const selectUser = (user: User) => {
      emit("user-selected", user);
    };

    return {
      filteredUsers,
      selectUser,
    };
  },
});
</script>

<style scoped>
.users-list {
  max-width: 250px;
}
</style>
