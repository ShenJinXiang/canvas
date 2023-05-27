<template>
  <canvas ref="canvasRef"></canvas>
</template>
<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import RotateConstructionAnimation from '.';

const props = defineProps({
  width: {
    type: Number,
    required: true
  },
  height: {
    type: Number,
    required: true
  },
  elementNumber: {
    type: Number,
    required: true
  }
})
const canvasRef = ref();
const rotateConstructionAnimation = new RotateConstructionAnimation(props.width, props.height, props.elementNumber);

onMounted(() => {
  rotateConstructionAnimation.initCanvas(canvasRef.value).run();
});

watch(
  () => props.width,
  () => {
    rotateConstructionAnimation.setRect(props.width, props.height);
  }
);
watch(
  () => props.height,
  () => {
    rotateConstructionAnimation.setRect(props.width, props.height);
  }
);
watch(
  () => props.elementNumber,
  (newVal) => {
    rotateConstructionAnimation.setElementNumber(newVal);
  }
);
</script>
