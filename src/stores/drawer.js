import { defineStore } from 'pinia';

export const useDrawerStore = defineStore('drawer', {
  state: () => ({
    isOpen: false,
    content: null,
  }),
  actions: {
    open(content) {
      this.isOpen = true;
      this.content = content;
    },
    close() {
      this.isOpen = false;
      this.content = null;
    },
  },
});