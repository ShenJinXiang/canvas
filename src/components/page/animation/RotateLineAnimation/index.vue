<template>
  <div>
    <canvas ref="canvasRef"></canvas>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { RotateLineAnimation } from '.';

const props = defineProps({
  width: {
    type: Number,
    required: true
  },
  height: {
    type: Number,
    required: true
  },
  sideNumber: {
    type: Number,
    required: true
  },
  pointNumber: {
    type: Number,
    required: true
  }
});
const canvasRef = ref();
const rotateLineAnimation = new RotateLineAnimation(props.width, props.height, props.sideNumber, props.pointNumber);

onMounted(() => {
  rotateLineAnimation.initCanvas(canvasRef.value).run();
});

watch(
  () => props.width,
  () => {
    rotateLineAnimation.setRect(props.width, props.height);
  }
);
watch(
  () => props.height,
  () => {
    rotateLineAnimation.setRect(props.width, props.height);
  }
);
watch(
  () => props.sideNumber,
  () => {
    rotateLineAnimation.setSideNumber(props.sideNumber);
  }
);
watch(
  () => props.pointNumber,
  () => {
    rotateLineAnimation.setPointNumber(props.pointNumber);
  }
);
</script>
