<template>
  <canvas ref="canvas"></canvas>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import CardioidAnimation from '.';

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
const canvas = ref();
const animation = new CardioidAnimation(props.width, props.height);

onMounted(() => {
  animation.initCanvas(canvas.value).run();
});
</script>
<style lang="less" scoped>
canvas {
  background: radial-gradient(#17cbcb, #018181);
}
</style>