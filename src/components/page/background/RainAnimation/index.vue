<template>
    <canvas ref="canvasRef"></canvas>
</template>
<script lang="ts" setup>
import RainAnimation from './index';
import { onMounted, ref, watch } from 'vue';

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

const rainAnimation = new RainAnimation(props.width, props.height);

onMounted(() => {
    rainAnimation.initCanvas(canvasRef.value).run();
});

watch(
  () => props.width,
  () => {
    rainAnimation.setRect(props.width, props.height);
  }
);
watch(
  () => props.height,
  () => {
    rainAnimation.setRect(props.width, props.height);
  }
);
</script>
