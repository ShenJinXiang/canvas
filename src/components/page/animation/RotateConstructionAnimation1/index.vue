<template>
  <canvas ref="canvasRef"></canvas>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import RotateConstructionAnimation from '.';

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
const rotateConstructionAnimation = new RotateConstructionAnimation(props.width, props.height);

onMounted(() => {
  rotateConstructionAnimation.initCanvas(canvasRef.value).run();
});
</script>