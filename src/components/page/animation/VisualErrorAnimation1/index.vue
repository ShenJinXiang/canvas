<template>
  <canvas ref="canvasRef"></canvas>
</template>
<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import VisualErrorAnimation from '.';

const props = defineProps({
  width: {
    type: Number,
    required: true
  },
  height: {
    type: Number,
    required: true
  }
})
const canvasRef = ref();
const animation = new VisualErrorAnimation(props.width, props.height);
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
</script>
