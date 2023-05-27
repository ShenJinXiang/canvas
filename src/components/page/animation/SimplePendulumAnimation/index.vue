<template>
  <canvas ref="canvasRef"></canvas>
</template>
<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import SimplePendulumAnimation from '.';

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
const animation = new SimplePendulumAnimation(props.width, props.height, props.elementNumber);
onMounted(() => {
  animation.initCanvas(canvasRef.value).run();
});
watch(
  () => props.width,
  () => {
    animation.setRect(props.width, props.height);
  }
);
watch(
  () => props.height,
  () => {
    animation.setRect(props.width, props.height);
  }
);
watch(
  () => props.elementNumber,
  (newVal) => {
    animation.setElementNumber(newVal);
  }
);
</script>
