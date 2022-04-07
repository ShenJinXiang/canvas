<template>
  <div class="">
    <canvas ref="canvasRef" />
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, Ref, watch } from 'vue';
import ChineseChessBoardVue from '.';

const props = defineProps({
  gridWidth: {
    type: Number,
    default: 80,
  },
});
const canvasRef: Ref = ref();
const canvas = new ChineseChessBoardVue(props.gridWidth);

watch(
  () => props.gridWidth,
  (newVal: number) => {
    canvas.setGridWidth(newVal);
  }
);
onMounted(() => {
  canvas.initCanvas(canvasRef.value);
});
</script>
