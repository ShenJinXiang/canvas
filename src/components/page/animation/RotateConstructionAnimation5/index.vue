<template>
    <canvas ref="canvasRef"></canvas>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import RotateConstructionAnimation from '.';
import { ca } from 'element-plus/es/locale';

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
const cnavas = new RotateConstructionAnimation(props.width, props.height);

onMounted(() => {
    cnavas.initCanvas(canvasRef.value).draw();
});
</script>
