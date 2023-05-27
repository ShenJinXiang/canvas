import { defineStore } from "pinia";
import { ref } from 'vue';

export const useLayoutStore = defineStore('layout', () => {
  const elementSize = ref('small');

  return { elementSize };
});