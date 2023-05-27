<template>
  <div>
    <canvas ref="canvasRef" />
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, Ref, watch } from "vue";
import ColorParticle from ".";


const props = defineProps({
  width: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  particleNumber: {
    type: Number,
    default: 80
  }
});
const canvasRef: Ref = ref();
const width = window.innerWidth;
const height = window.innerHeight - 40;
const canvas = new ColorParticle(width, height, props.particleNumber);

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
  () => props.particleNumber,
  (newVal) => {
    canvas.setParticleNumber(newVal);
  }
);
</script>
