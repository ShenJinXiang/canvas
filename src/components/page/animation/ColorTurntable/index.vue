<template>
  <div>
    <canvas ref="canvasRef"></canvas>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, Ref, watch } from 'vue';
import ColorTurntable from '.';

const props = defineProps({
  width: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  colorNumber: {
    type: Number,
    default: 3
  },
  innerSpeed: {
    type: Number,
    defailt: 5
  },
  outerSpeed: {
    type: Number,
    defailt: 1
  }
});
const canvasRef: Ref = ref()
const canvas = new ColorTurntable(props.width, props.height, props.colorNumber, props.innerSpeed, props.outerSpeed);
onMounted(() => {
  canvas.initCanvas(canvasRef.value).run();
});

watch(
  () => props.width,
  () => {
    canvas.setRect(props.width, props.height);
  }
);
watch(
  () => props.height,
  () => {
    canvas.setRect(props.width, props.height);
  }
);
watch(
  () => props.colorNumber,
  (newVal) => {
    canvas.setColorNumber(newVal);
  }
);
watch(
  () => props.innerSpeed,
  (newVal) => {
    canvas.setInnerSpeed(newVal);
  }
);
watch(
  () => props.outerSpeed,
  (newVal) => {
    canvas.setOuterSpeed(newVal);
  }
);
</script>
