<template>
  <canvas ref="canvasRef"></canvas>
</template>
<script lang="ts" setup>
import Test from '.';
import { onMounted, ref } from 'vue';

const props = defineProps({
  width: {
    type: Number,
    required: true
  },
  height: {
    type: Number,
    required: true
  }
})
const canvasRef = ref();
const test = new Test(props.width, props.height);

onMounted(() => {
  test.initCanvas(canvasRef.value).run();
});
</script>