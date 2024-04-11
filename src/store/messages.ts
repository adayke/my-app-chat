import { defineStore } from "pinia";
import { Message } from "@/core/types";

export const useMessagesStore = defineStore("messages", {
  state: () => ({
    messages: [] as Array<Message>,
  }),
  getters: {
    getNewMessages: (state) => state.messages,
  },
  actions: {
    sendMessage(
      fromId: number | null,
      toId: number | null,
      text: string | null
    ) {
      let newMessages;
      let messagesRaw = localStorage.getItem("messages");
      newMessages = messagesRaw ? JSON.parse(messagesRaw) : [];

      if (fromId && toId && text) {
        newMessages.push({
          fromId,
          toId,
          text,
          timestamp: new Date(),
        });

        localStorage.setItem("messages", JSON.stringify(newMessages));
      }
    },

    getMessagesBetweenUsers(userId1: number, userId2: number) {
      let newMessages: Array<Message> = [];

      if (localStorage.getItem("messages")) {
        let messagesRaw = localStorage.getItem("messages");
        newMessages = messagesRaw ? JSON.parse(messagesRaw) : [];

        return newMessages.filter(
          (m: Message) =>
            (m.fromId === userId1 && m.toId === userId2) ||
            (m.fromId === userId2 && m.toId === userId1)
        );
      } else {
        return newMessages;
      }
    },
  },
});
