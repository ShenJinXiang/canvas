<template>
  <canvas ref="canvasRef"></canvas>
</template>
<script lang="ts" setup>
import { Ref, onMounted, ref, watch } from 'vue';
import Starry from '.';

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
const canvasRef: Ref = ref();
const canvas = new Starry(props.width, props.height);
onMounted(() => {
  canvas.initCanvas(canvasRef.value).run();
});
watch(
  () => props.width,
  () => {
    canvas.setRect(props.width, props.height);
  }
);
watch(
  () => props.height,
  () => {
    canvas.setRect(props.width, props.height);
  }
);
</script>
