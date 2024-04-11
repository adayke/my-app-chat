<template>
  <div
    class="message-window"
    tabindex="0"
    @keyup.esc="close"
    style="min-width: 600px; margin: auto"
  >
    <div
      class="message-window__header bg-primary text-white p-2 d-flex justify-content-between align-items-center"
    >
      <h5>{{ user?.name }}</h5>
      <button class="btn-close btn-close-white" @click="close"></button>
    </div>
    <div
      class="message-window__messages p-3"
      style="height: 400px; overflow-y: auto; background-color: #f8f9fa"
    >
      <div
        v-for="message in messages"
        :key="message.timestamp.getTime()"
        :class="{
          'my-message': message?.fromId === myId,
          'other-message': message?.fromId !== myId,
        }"
      >
        <div
          :class="{
            'text-end': message?.fromId === myId,
            'text-start': message?.fromId !== myId,
          }"
        >
          {{ message.text }}
        </div>
      </div>
    </div>
    <div class="message-window__input p-3 bg-light d-flex">
      <input
        type="text"
        class="form-control"
        placeholder="Напишите сообщение..."
        @keyup.enter="sendMessage"
        v-model="messageText"
      />
      <button class="btn btn-primary ms-2" @click="sendMessage">➤</button>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, watch } from "vue";
import { useMessagesStore } from "../store/messages";
import { Message, User } from "../core/types";

export default defineComponent({
  name: "MessageWindow",
  props: {
    user: (Object as () => User) || undefined,
    close: Function as () => void,
  },
  emits: ["close"],
  setup(props, { emit }) {
    const messageText = ref<string>("");
    const store = useMessagesStore();
    const messages = ref<Message[]>([]);
    const myId = Number(sessionStorage.getItem("userId"));

    watch(
      () => props.user,
      (newUser) => {
        if (newUser) {
          messages.value = store.getMessagesBetweenUsers(myId, newUser.id);
        }
      },
      { immediate: true }
    );

    const sendMessage = () => {
      if (props.user && messageText.value.trim()) {
        store.sendMessage(myId, props.user.id, messageText.value);
        messageText.value = "";
        messages.value = store.getMessagesBetweenUsers(myId, props.user.id);
      }
    };

    const close = () => {
      emit("close");
    };

    let timer = 0;
    setInterval(() => {
      timer = timer + 3;
      console.log(`${timer} sec fetching...`);
      if (props.user) {
        messages.value = store.getMessagesBetweenUsers(myId, props.user.id);
      }
    }, 3000);

    return {
      myId,
      close,
      sendMessage,
      messageText,
      messages,
    };
  },
});
</script>

<style scoped>
.message-window {
  border: 1px solid #dee2e6;
  border-radius: 0.25rem;
}

.message-window__header {
  border-bottom: 1px solid #dee2e6;
}

.message-window__messages {
  background-color: #e9ecef;
}

.my-message {
  text-align: right;
  margin-left: auto;
  background-color: #dcf8c6; /* Светло-зеленый фон для ваших сообщений */
}

.other-message {
  text-align: left;
  margin-right: auto;
  background-color: #ffffff; /* Белый фон для сообщений собеседника */
}

.text-end {
  text-align: right;
}

.text-start {
  text-align: left;
}
</style>
