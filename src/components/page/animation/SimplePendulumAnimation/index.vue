<template>
  <canvas ref="canvasRef"></canvas>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
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
})
const canvasRef = ref();
const animation = new SimplePendulumAnimation(props.width, props.height);
onMounted(() => {
  animation.initCanvas(canvasRef.value).run();
})
</script>
