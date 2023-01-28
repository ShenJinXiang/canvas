import { defineStore } from "pinia";
import { computed, ref } from 'vue';

export const useCounterStore = defineStore('counter', () => {
  const counter = ref(0);

  const increment = () => {
    counter.value++;
  };

  const doubleCounter = () => 2 * counter.value;
  const doubleCounterCom = computed(() => 2 * counter.value);

  return { counter, increment, doubleCounter, doubleCounterCom }
})