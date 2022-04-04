<template>
  <div class="">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>
<script>
import { onMounted, ref } from 'vue';
import ChineseChessBoard from '.';

export default {
  name: 'ChineseChessBoard',
  props: {
    gridWidth: {
      type: Number,
      default: 80,
    },
  },
  setup(props) {
    const canvasRef = ref();
    const canvas = new ChineseChessBoard(props.gridWidth);
    onMounted(() => {
      canvas.initCanvas(canvasRef.value);
    });
    return {
      canvasRef,
    };
  },
};
</script>
