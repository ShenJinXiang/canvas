<template>
  <div class="">
    <canvas ref="canvasRef" />
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from 'vue';
import ChineseChessBoardVue from '.';

export default defineComponent({
  name: 'ChineseChessBoard',
  props: {
    gridWidth: {
      type: Number,
      default: 80,
    },
  },
  setup(props) {
    const canvasRef: Ref = ref();
    const canvas = new ChineseChessBoardVue(props.gridWidth);
    onMounted(() => {
      canvas.initCanvas(canvasRef.value);
    });
    return {
      canvasRef,
    };
  },
})
</script>
