<template>
  <div class="container">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import NewYearCountdown from '.';

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
const canvas = new NewYearCountdown(props.width, props.height);

onMounted(() => {
  canvas.initCanvas(canvasRef.value).run();
});
</script>
<style lang="less" scoped>
.container {
  background: rgb(119, 13, 13);
  canvas {
    background: radial-gradient( circle, rgba(119, 13, 13, 0.92) 64%, rgba(0, 0, 0, 0.6) 100% );
  }
}
</style>