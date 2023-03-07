<template>
  <canvas ref="canvasRef"></canvas>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import SimplePendulum from '.';

const props = defineProps({
  width: {
    type: Number,
    required: true
  },
  height: {
    type: Number,
    required: true
  },
})
const canvasRef = ref();
const simplePendulum = new SimplePendulum(props.width, props.height);
onMounted(() => {
  simplePendulum.initCanvas(canvasRef.value).run();
})
</script>
