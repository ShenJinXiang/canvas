<template>
  <canvas ref="canvasRef"></canvas>
</template>
<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import LoadingAnimation from '.';

const props = defineProps({
  width: {
    type: Number,
    required: true
  },
  height: {
    type: Number,
    required: true
  },
});
const canvasRef = ref();

const loadingAnimation = new LoadingAnimation(props.width, props.height);

onMounted(() => {
  loadingAnimation.initCanvas(canvasRef.value).run();
});

watch(
  () => props.width,
  () => {
    loadingAnimation.setRect(props.width, props.height);
  }
);
watch(
  () => props.height,
  () => {
    loadingAnimation.setRect(props.width, props.height);
  }
);
</script>