<template>
    <canvas ref="canvasRef"></canvas>
</template>
<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import WoodenPatterns from '.';

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
const canvas = new WoodenPatterns(props.width, props.height);
onMounted(() => {
    canvas.initCanvas(canvasRef.value).draw();
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
</script>
