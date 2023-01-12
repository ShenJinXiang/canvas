<template>
  <div>
    <canvas ref="canvasRef" @click="click" @mousemove="move"></canvas>
    <div class="contro-con" :style="controStyle">
      <!-- <el-button @click="begin">开始</el-button>
      <el-button @click="end">结束</el-button>
      <span> 步数：{{ stepNumber }}</span>
      <div>
      <span>时长： {{ playTime.hour }}小时{{ playTime.minute }}分{{ playTime.second }}秒 {{ playTime.millisecond }}</span> -->
      <!-- </div> -->
      <el-row>
        <el-button @click="begin">开始</el-button>
        <el-button @click="end">结束</el-button>
      </el-row>
      <el-descriptions :column="2">
        <el-descriptions-item label="时长" width="50%">{{ playTime.hour }}小时{{ playTime.minute }}分{{ playTime.second }}秒 {{ playTime.millisecond }}</el-descriptions-item>
        <el-descriptions-item label="步数">{{ stepNumber }}</el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useMouseInElement, useTimestamp } from '@vueuse/core';
import { Ref, computed, onMounted, reactive, ref } from 'vue';
import { HuaRongRoad } from '.';

const timestamp = useTimestamp({ offset: 0 });
const beginTimestamp = ref(0);
const current = ref('');
const playTime = computed(() => {
  if (current.value !== 'play') {
    return {
      hour: 0, minute: 0, second: 0, millisecond: 0
    };
  }
  const ms = timestamp.value - beginTimestamp.value;
  const millisecond = ms % 1000;
  const second = Math.floor(ms / 1000) % 60;
  const minute = Math.floor(ms / (1000 * 60)) % 60;
  const hour = Math.floor(ms / (1000 * 60 * 60));
  return {
    hour, minute, second, millisecond
  }
});
const hour = ref(0);
const minute = ref(0);
const second = ref(0);
const stepNumber = ref(0);
const side = ref(80);
const canvasRef: Ref = ref();
const controStyle = reactive({
  width: `${side.value * 5}px`
});
const canvas = new HuaRongRoad(side.value);
onMounted(() => {
  canvas.initCanvas(canvasRef.value).run();
});

const { elementX: canvasPointX, elementY: canvasPointY } = useMouseInElement(canvasRef);

const click = () => {
  canvas.click(canvasPointX.value, canvasPointY.value);
};
const move = () => {
  canvas.move(canvasPointX.value, canvasPointY.value);
};
const begin = () => {
  if (current.value !== 'play') {
    beginTimestamp.value = timestamp.value;
    current.value = 'play';
  }
};
const end = () => {
  current.value = '';
};
</script>
<style lang="less" scoped>
// canvas {
//   display: inline-block;
//   margin: 0px 20px;
// }
.contro-con {
  display: block;
  margin: 10px auto;
}
</style>