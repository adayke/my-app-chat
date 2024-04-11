<template>
  <div
    class="container d-flex justify-content-center align-items-center"
    style="height: 100vh"
  >
    <div class="card p-4 shadow" style="width: 400px">
      <h2 class="card-title text-center mb-4">Вход в систему</h2>
      <form @submit.prevent="login">
        <div class="mb-3">
          <label for="email" class="form-label">Email адрес</label>
          <input
            type="email"
            class="form-control"
            id="email"
            v-model="email"
            required
            placeholder="Введите email"
          />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Пароль</label>
          <input
            type="password"
            class="form-control"
            id="password"
            v-model="password"
            required
            placeholder="Введите пароль"
          />
        </div>
        <button type="submit" class="btn btn-primary w-100">Войти</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { useAuthStore } from "@/store/auth";
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "SignIn",
  components: {},
  setup() {
    const email = ref();
    const store = useAuthStore();
    const password = ref();

    const login = () => {
      store.login(email.value, password.value);
    };

    return {
      email,
      password,
      login,
    };
  },
});
</script>

<style scoped></style>
