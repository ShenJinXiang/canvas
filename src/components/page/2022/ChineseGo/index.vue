<template>
  <div>
    <canvas ref="canvasRef" />
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, Ref } from 'vue';
import ChineseGo from '.';

const canvasRef: Ref = ref();
const chineseGo = new ChineseGo(50);
onMounted(() => {
  chineseGo.initCanvas(canvasRef.value).draw();
});
</script>
