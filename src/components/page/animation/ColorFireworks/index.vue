<template>
  <div class="container">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import ColorFireworks from '.';
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

const canvasRef = ref();
const colorFireworks = new ColorFireworks(props.width, props.height);

onMounted(() => {
  colorFireworks.initCanvas(canvasRef.value).run();
});

</script>
