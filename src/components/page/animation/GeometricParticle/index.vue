<template>
  <canvas ref="canvasRef"></canvas>
</template>
<script lang="ts" setup>
import { onMounted, ref, Ref } from 'vue';
import GeometricParticle from '.';

const props = defineProps({
  width: {
    type: Number,
    required: true
  },
  height: {
    type: Number,
    required: true
  }
});
const canvasRef: Ref = ref();
const canvas = new GeometricParticle(props.width, props.height);

onMounted(() => {
  canvas.initCanvas(canvasRef.value).run();
});
</script>