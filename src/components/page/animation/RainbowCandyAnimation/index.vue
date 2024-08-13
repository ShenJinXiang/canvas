<template>
  <canvas ref="canvasRef"></canvas>
</template>
<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import RainbowCandyAnimation from '.';

const props = defineProps({
  width: {
    type: Number,
    required: true
  },
  height: {
    type: Number,
    required: true
  }
});
const canvasRef = ref();
const rainbowCandyAnimation = new RainbowCandyAnimation(props.width, props.height);

onMounted(() => {
  rainbowCandyAnimation.initCanvas(canvasRef.value).run();
});

watch(
  () => props.width,
  () => {
    rainbowCandyAnimation.setRect(props.width, props.height);
  }
);
watch(
  () => props.height,
  () => {
    rainbowCandyAnimation.setRect(props.width, props.height);
  }
);
</script>