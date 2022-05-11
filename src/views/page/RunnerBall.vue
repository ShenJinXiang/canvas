<template>
  <div>
    <runner-ball :width="width" :height="height" />
  </div>
</template>
<script lang="ts" setup>
import RunnerBall from '@/components/page/2020/RunnerBall/index.vue';
import { ref, Ref } from 'vue';
const width: Ref<number> = ref(window.innerWidth);
const height: Ref<number> = ref(window.innerHeight - 40);
</script>