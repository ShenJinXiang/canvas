<template>
  <div>
    <canvas ref="canvasRef"></canvas>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, Ref } from 'vue';
import LetterTransform from '.';

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
const canvasRef: Ref = ref()
const canvas = new LetterTransform(props.width, props.height);
onMounted(() => {
  canvas.initCanvas(canvasRef.value).run();
  // canvas.initCanvas(canvasRef.value).draw();
});


</script>