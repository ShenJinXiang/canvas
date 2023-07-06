<template>
    <canvas ref="canvasRef"></canvas>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import AuspiciousCloudPattern from '.';

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
const canvas = new AuspiciousCloudPattern(props.width, props.height);
onMounted(() => {
    canvas.initCanvas(canvasRef.value).draw();
});
</script>
