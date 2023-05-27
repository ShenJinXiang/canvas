<template>
  <div>
    <canvas ref="canvasRef" />
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, Ref, watch } from 'vue';
import EightDiagrams from '.';
const props = defineProps({
  width: {
    type: Number,
    required: true
  },
  height: {
    type: Number,
    required: true
  },
  yangColor: {
    type: String,
    default: '#fff'
  },
  yinColor: {
    type: String,
    default: '#000'
  },
  backgroundColor: {
    type: String,
    default: '#777'
  },
  innerSpeed: {
    type: Number,
    default: 10
  },
  outerSpeed: {
    type: Number,
    default: 2
  },
  watermark: {
    type: Boolean,
    default: true
  }
});
const canvasRef: Ref = ref();
const canvas = new EightDiagrams(props.width, props.height);
onMounted(() => {
  canvas.initCanvas(canvasRef.value).run();
});
watch(
  () => props.width,
  (newVal) => {
    canvas.setSize(newVal, props.height);
  }
);
watch(
  () => props.height,
  (newVal) => {
    canvas.setSize(props.width, newVal);
  }
);
watch(
  () => props.backgroundColor,
  (newVal) => {
    canvas.setBackgroundColor(newVal);
  }
);
watch(
  () => props.yangColor,
  (newVal) => {
    canvas.setYangColor(newVal);
  }
);
watch(
  () => props.yinColor,
  (newVal) => {
    canvas.setYinColor(newVal);
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