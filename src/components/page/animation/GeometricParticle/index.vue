<template>
  <canvas ref="canvasRef"></canvas>
</template>
<script lang="ts" setup>
import { ref, Ref, onMounted } from 'vue';
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
  canvas.initCanvas(canvasRef.value).draw();
});
</script>