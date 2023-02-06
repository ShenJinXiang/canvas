<template>
  <div>
    <canvas ref="canvasRef"></canvas>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { RotateLineAnimation } from '.';

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
const rotateLineAnimation = new RotateLineAnimation(props.width, props.height);

onMounted(() => {
  rotateLineAnimation.initCanvas(canvasRef.value).run();
});

</script>
