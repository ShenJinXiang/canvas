<template>
  <canvas ref="canvas"></canvas>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import CardioidAnimation from './index';

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
const canvas = ref();
const animation = new CardioidAnimation(props.width, props.height);

onMounted(() => {
  animation.initCanvas(canvas.value).run();
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