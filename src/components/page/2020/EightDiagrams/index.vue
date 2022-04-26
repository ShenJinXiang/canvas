<template>
  <div>
    <canvas ref="canvasRef" />
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, Ref } from 'vue';

const canvasRef: Ref = ref();
onMounted(() => {
  init()
});
</script>