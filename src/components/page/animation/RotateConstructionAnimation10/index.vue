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
    speedRatio: {
        type: Number,
        required: true
    }
});
  
const canvasRef = ref();
  const canvas = new RotateConstructionAnimation(props.width, props.height, props.speedRatio);
  
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
    () => props.speedRatio,
    () => {
      canvas.setSpeedRatio(props.speedRatio);
    }
  );
</script>