<template>
  <div class="">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>
<script>
import { onMounted, ref, watch } from 'vue';
import FlagChina from '.';

export default {
  name: 'FlagChina',
  props: {
    width: {
      type: Number,
      default: 600,
    },
    showLines: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const canvasRef = ref();
    const flagChina = new FlagChina(props.width, props.showLines);
    watch(
      () => props.width,
      (newVal) => {
        flagChina.setWidth(newVal);
      },
    );
    watch(
      () => props.showLines,
      (newVal) => {
        flagChina.setShowLines(newVal);
      },
    );
    onMounted(() => {
      flagChina.initCanvas(canvasRef.value);
    });
    return {
      canvasRef,
    };
  },
};
</script>
