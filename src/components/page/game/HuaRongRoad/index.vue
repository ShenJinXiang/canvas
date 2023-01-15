<template>
  <div>
    <canvas ref="canvasRef" @click="click" @mousemove="move"></canvas>
    <div class="contro-con" :style="controStyle">
      <el-row>
        <el-select @change="selectBeginPosition">
          <el-option v-for="(item, index) in beginPositions" :key="index" :label="item.label" :value="index"></el-option>
        </el-select>
      </el-row>
      <el-row>
        <!-- <el-button @click="begin">开始挑战</el-button>
        <el-button @click="end">结束</el-button> -->
        <el-link @click="begin">开始挑战</el-link>
        <el-link @click="giveup">放弃挑战</el-link>
      </el-row>
      <el-descriptions :column="2">
        <el-descriptions-item label="时长">{{ playTime.hour }}小时{{ playTime.minute }}分{{ playTime.second }}秒 {{ playTime.millisecond }}</el-descriptions-item>
        <el-descriptions-item label="步数">{{ stepNumber }}</el-descriptions-item>
        <el-descriptions-item label="Remarks">
          <el-tag size="small">School</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="Remarks">
          <el-button>111</el-button>
        </el-descriptions-item>
        <el-descriptions-item label="Remarks">
          <el-select>
            <el-option :value="1" label="aaa"></el-option>
            <el-option :value="2" label="bbb"></el-option>
          </el-select>
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useMouseInElement, useTimestamp } from '@vueuse/core';
import { Ref, computed, onMounted, reactive, ref } from 'vue';
import { HuaRongRoad, IResult } from '.';

const timestamp = useTimestamp({ offset: 0 });
const beginTimestamp = ref(0);
const endTimestamp = ref(0);
enum Status {
  none,
  play,
  // pause,
  complete,
  edit
};
const current = ref(Status.none);
const beginPositions = ref([
  {
    label: '第一题',
    postions: [
      { colIndex: 1, rowIndex: 0 }, { colIndex: 1, rowIndex: 2 }, { colIndex: 0, rowIndex: 0 }, { colIndex: 3, rowIndex: 0 }, { colIndex: 0, rowIndex: 2 },
      { colIndex: 3, rowIndex: 2 }, { colIndex: 0, rowIndex: 4 }, { colIndex: 1, rowIndex: 3 }, { colIndex: 2, rowIndex: 3 }, { colIndex: 3, rowIndex: 4 }
    ]
  },
  {
    label: '第二题',
    postions: [
      { colIndex: 0, rowIndex: 2 }, { colIndex: 2, rowIndex: 2 }, { colIndex: 0, rowIndex: 0 }, { colIndex: 1, rowIndex: 0 }, { colIndex: 2, rowIndex: 0 },
      { colIndex: 3, rowIndex: 0 }, { colIndex: 2, rowIndex: 3 }, { colIndex: 3, rowIndex: 3 }, { colIndex: 0, rowIndex: 4 }, { colIndex: 1, rowIndex: 4 }
    ]
  }
]);
const stepNumber = ref(0);
const side = ref(80);
const canvasRef: Ref = ref();
const controStyle = reactive({
  width: `${side.value * 5}px`
});
const canvas = new HuaRongRoad(side.value);
onMounted(() => {
  canvas.initCanvas(canvasRef.value).setElementPosition(beginPositions.value[1].postions).run();
});

const { elementX: canvasPointX, elementY: canvasPointY } = useMouseInElement(canvasRef);

const selectBeginPosition = (val: number) => {
    canvas.setElementPosition(beginPositions.value[val].postions);
};
const playTime = computed(() => {
  if (current.value === Status.none || current.value === Status.edit) {
    return {
      hour: 0, minute: 0, second: 0, millisecond: 0
    };
  }
  if (current.value === Status.complete) {
    return computTime(beginTimestamp.value , endTimestamp.value);
  }
  // if (current.value === Status.play) {
    return computTime(beginTimestamp.value, timestamp.value);
  // }
});
const computTime = (beginTime: number, endTime: number) => {
  const ms = endTime - beginTime;
  const millisecond = ms % 1000;
  const second = Math.floor(ms / 1000) % 60;
  const minute = Math.floor(ms / (1000 * 60)) % 60;
  const hour = Math.floor(ms / (1000 * 60 * 60));
  return {
    hour, minute, second, millisecond
  }
}
const click = () => {
  if (current.value === Status.play || current.value === Status.edit) {
    const result: IResult = canvas.click(canvasPointX.value, canvasPointY.value);
    if (current.value === Status.play) {
      if (result.complete) {
        endTimestamp.value = timestamp.value;
        current.value = Status.complete;
      } else {
        stepNumber.value += result.step;
      }
    }
  }
};
const move = () => {
  canvas.move(canvasPointX.value, canvasPointY.value);
};
const begin = () => {
  if (current.value === Status.none) {
    beginTimestamp.value = timestamp.value;
    current.value = Status.play;
  }
};
const giveup = () => {
  current.value = Status.none;
  stepNumber.value = 0;
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