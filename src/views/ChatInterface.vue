<template>
  <div class="container mt-3">
    <div class="user-name mb-4">
      <h1>Welcome, {{ userName.name ? userName.name : "Unknown" }}!</h1>
    </div>
    <div class="chat-layout d-flex justify-content-between">
      <UsersList @user-selected="handleUserSelected" class="flex-grow-1" />
      <MessageWindow
        v-if="selectedUser"
        :user="selectedUser"
        @close="handleClose"
        class="flex-grow-2"
      />
    </div>
    <button @click="logout" class="logout-button btn btn-danger">Выйти</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { User } from "../core/types";
import UsersList from "../components/UsersList.vue";
import MessageWindow from "../components/MessageWindow.vue";
import { useAuthStore } from "../store/auth";

export default defineComponent({
  name: "ChatInterface",
  components: {
    UsersList,
    MessageWindow,
  },
  setup() {
    const selectedUser = ref<User | null>(null);
    const store = useAuthStore();
    const userName = JSON.parse(sessionStorage.getItem("user") as any);

    const handleUserSelected = (user: User) => {
      selectedUser.value = { ...user };
    };

    const logout = () => {
      store.logout();
    };

    const handleClose = () => {
      selectedUser.value = null;
    };

    return {
      handleClose,
      userName,
      selectedUser,
      handleUserSelected,
      logout,
    };
  },
});
</script>

<style scoped>
.container {
  max-width: 1200px;
}

.user-name h1 {
  color: #007bff;
  font-weight: bold;
}

.chat-layout {
  display: flex;
  height: 100vh;
  position: relative;

  gap: 20px; /* Расстояние между колонками */
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f8f9fa; /* Светлый фон для области чата */
  min-height: 80vh; /* Минимальная высота */
}

.logout-button {
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 0.5em 1em;
  background-color: #f55;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.logout-button:hover {
  background-color: #dc3545;
}
</style>
