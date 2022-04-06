<template>
  <div class="">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, Ref, ref, watch } from 'vue';
import FlagChina from '.';
const props = defineProps({
    width: {
      type: Number,
      default: 600,
    },
    showLines: {
      type: Boolean,
      default: false,
    },
});
const canvasRef: Ref = ref();
const flagChina = new FlagChina(props.width, props.showLines);
watch(
  () => props.width,
  (newVal) => {
    flagChina.setWidth(newVal);
  },
);
watch(
  () => props.showLines,
  (newVal) => {
    flagChina.setShowLines(newVal);
  },
);
onMounted(() => {
  flagChina.initCanvas(canvasRef.value);
});
</script>
