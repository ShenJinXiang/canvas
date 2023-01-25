<template>
  <div>
    <canvas ref="canvasRef"></canvas>
  </div>
</template>
<script lang="ts" setup>
import { Ref, onMounted, ref, watch } from 'vue';
import LaserEffect from '.';

const props = defineProps({
  width: {
    type: Number,
    required: true
  },
  height: {
    type: Number,
    required: true
  },
  lasterNumber: {
    type: Number,
    default: 240
  }
})
const canvasRef: Ref = ref();
const canvas = new LaserEffect(props.width, props.height, props.lasterNumber);
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
watch(
  () => props.lasterNumber,
  (newVal) => {
    canvas.setLasterNumber(newVal);
  }
);
</script>
