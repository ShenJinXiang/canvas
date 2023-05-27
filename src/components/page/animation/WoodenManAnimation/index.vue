<template>
  <canvas ref="canvasRef"></canvas>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import WoodenManAnimation from '.';

const props = defineProps({
  width: {
    typs: Number,
    required: true
  },
  height: {
    typs: Number,
    required: true
  }
});
const canvasRef = ref();

const woodenManAnimation = new WoodenManAnimation(props.width, props.height);
onMounted(() => {
  woodenManAnimation.initCanvas(canvasRef.value).run();
});
</script>