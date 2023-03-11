<template>
  <canvas ref="canvas"></canvas>
</template>
<script lang="ts" setup>
import CardioidAnimation from '.';
import { ref, onMounted } from 'vue';

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