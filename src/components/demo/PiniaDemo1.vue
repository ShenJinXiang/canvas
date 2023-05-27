<template>
  <div>
    <h1>demo1</h1>
    <p>counter: {{ counterStore.counter }}</p>
    <p>double counter: {{ counterStore.doubleCounter() }}</p>
    <p>double counter computed: {{ counterStore.doubleCounterCom }}</p>
    <p>
      <el-button @click="increment">increment</el-button>
    </p>
    <p>c1: {{ c1 }} c2: {{ c2 }} c3: {{ c3 }} c4: {{ c4 }} c5: {{ c5 }}</p>
  </div>
</template>
<script lang="ts" setup>
import { useCounterStore } from '@/store/count';
import { computed, ref } from 'vue';

const counterStore = useCounterStore();
console.log(counterStore);

const c1 = computed(() => counterStore.counter);
const c2 = computed(() => counterStore.doubleCounter());
const c3 = ref(counterStore.counter);
const c4 = ref(counterStore.doubleCounter());
const c5 = counterStore.doubleCounterCom;

const increment = () => {
  counterStore.increment();
};
</script>