<template>
  <div class="container" :style="conStyle">
    <canvas ref="canvasRef"></canvas>
    <div class="contro-con" :style="controStyle">123</div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import DigitalHuarongRoad from '.';

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
const controWidth = ref(200);
const canvas = new DigitalHuarongRoad(props.width - controWidth.value, props.height);
const conStyle = reactive({
  height: `${props.height}px`,
})
const controStyle = reactive({
  width: `${controWidth.value}px`,
  height: `${props.height}px`,
});

onMounted(() => {
  canvas.initCanvas(canvasRef.value).run();
});

</script>
<style lang="less" scoped>
.container {
  position: relative;
  canvas {
    position: absolute;
    left: 0px;
    top: 0px;
  }
  .contro-con {
    box-sizing: border-box;
    background-color: #f1f1f1;
    position: absolute;
    right: 0px;
    top: 0px;
  }
}
</style>