<template>
  <div>
    <canvas ref="canvasRef" @click="click" @mousemove="move"></canvas>
    <div class="contro-con" :style="controStyle">
      <div class="contro-row">
        <el-select @change="changeMode" v-model="contro.mode">
          <el-option v-for="(item, index) in modes" :key="index" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </div>
      <div class="contro-row" v-if="contro.mode === 'CHALLENGE' && contro.challengeStatus === 'PREPARE'">
        <el-select @change="changeQuestion" v-model="contro.question">
          <el-option v-for="(item, index) in questions" :key="index" :label="`第${index + 1}题`" :value="index"></el-option>
        </el-select>
      </div>
      <div class="contro-row" v-if="contro.mode === 'EDIT'">
        <el-button @click="addQuestion">添加为题目</el-button>
      </div>
      <div class="contro-row" v-if="contro.mode === 'CHALLENGE'">
        <el-button @click="begin">开始挑战</el-button>
        <el-button @click="reBegin">重新挑战</el-button>
      </div>
      <div class="contro-row" v-if="contro.mode === 'CHALLENGE'">
        <span class="label">时长</span>
        <span class="text">{{ playTime.hour }}小时{{ playTime.minute }}分{{ playTime.second }}秒 {{ playTime.millisecond }}</span>
      </div>
      <div class="contro-row" v-if="contro.mode === 'CHALLENGE'">
        <span class="label">步数</span>
        <span class="text">{{ contro.stepNumber }}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useMouseInElement, useTimestamp, useWindowSize } from '@vueuse/core';
import { computed, onMounted, reactive, Ref, ref } from 'vue';
import { HuaRongRoad, IResult } from '.';

const timestamp = useTimestamp({ offset: 0 });
const { width: windowWidth } = useWindowSize();
// const beginTimestamp = ref(0);
// const endTimestamp = ref(0);
enum ChallengeStatus {
  PREPARE = 'PREPARE',
  PLAY = 'PLAY',
  // pause,
  COMPLETE = 'COMPLETE'
};
enum Mode {
  CHALLENGE = 'CHALLENGE',
  EDIT = 'EDIT'
}
const modes = [
  { label: '挑战模式', value: Mode.CHALLENGE },
  { label: '编辑模式', value: Mode.EDIT }
];
const questions = ref([
  [
    { colIndex: 1, rowIndex: 0 }, { colIndex: 1, rowIndex: 2 }, { colIndex: 0, rowIndex: 0 }, { colIndex: 3, rowIndex: 0 }, { colIndex: 0, rowIndex: 2 },
    { colIndex: 3, rowIndex: 2 }, { colIndex: 0, rowIndex: 4 }, { colIndex: 1, rowIndex: 3 }, { colIndex: 2, rowIndex: 3 }, { colIndex: 3, rowIndex: 4 }
  ],
  [
    { colIndex: 0, rowIndex: 2 }, { colIndex: 2, rowIndex: 2 }, { colIndex: 0, rowIndex: 0 }, { colIndex: 1, rowIndex: 0 }, { colIndex: 2, rowIndex: 0 },
    { colIndex: 3, rowIndex: 0 }, { colIndex: 2, rowIndex: 3 }, { colIndex: 3, rowIndex: 3 }, { colIndex: 0, rowIndex: 4 }, { colIndex: 1, rowIndex: 4 }
  ]
]);
const contro = reactive({
  mode: Mode.CHALLENGE,
  challengeStatus: ChallengeStatus.PREPARE,
  question: 0,
  beginTimestamp: 0,
  endTimestamp: 0,
  stepNumber: 0
});
// const current = ref(Status.none);
// const question = ref(0);
// const stepNumber = ref(0);
const side = ref(80);
const canvasRef: Ref = ref();
const controStyle = reactive({
  width: `${(windowWidth.value - side.value * 8) / 2}px`
});
const canvas = new HuaRongRoad(side.value);
onMounted(() => {
  canvas.initCanvas(canvasRef.value).setElementPosition(questions.value[contro.question]).run();
});

const { elementX: canvasPointX, elementY: canvasPointY } = useMouseInElement(canvasRef);

const changeMode = (val: Mode) => {
  contro.mode = val;
  contro.challengeStatus = ChallengeStatus.PREPARE;
  contro.stepNumber = 0;
  canvas.setElementPosition(questions.value[contro.question]);
}
const changeQuestion = (val: number) => {
  contro.challengeStatus = ChallengeStatus.PREPARE;
  contro.stepNumber = 0;
  canvas.setElementPosition(questions.value[val]);
};
const playTime = computed(() => {
  if (contro.challengeStatus === ChallengeStatus.PREPARE) {
    return {
      hour: 0, minute: 0, second: 0, millisecond: 0
    };
  }
  if (contro.challengeStatus === ChallengeStatus.COMPLETE) {
    return computTime(contro.beginTimestamp, contro.endTimestamp);
  }
  return computTime(contro.beginTimestamp, timestamp.value);
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
  if (contro.mode === Mode.EDIT) {
    canvas.click(canvasPointX.value, canvasPointY.value);
    return;
  }
  if (contro.mode === Mode.CHALLENGE && contro.challengeStatus === ChallengeStatus.PLAY) {
    const result: IResult = canvas.click(canvasPointX.value, canvasPointY.value);
      if (result.complete) {
        contro.endTimestamp = timestamp.value;
        contro.challengeStatus = ChallengeStatus.COMPLETE;
      } else {
        contro.stepNumber += result.step;
      }
  }
};
const move = () => {
  canvas.move(canvasPointX.value, canvasPointY.value);
};
const begin = () => {
  if (contro.mode === Mode.CHALLENGE && contro.challengeStatus === ChallengeStatus.PREPARE) {
    contro.beginTimestamp = timestamp.value;
    contro.challengeStatus = ChallengeStatus.PLAY;
  }
};
const reBegin = () => {
  contro.challengeStatus = ChallengeStatus.PREPARE;
  contro.stepNumber = 0;
  canvas.setElementPosition(questions.value[contro.question]);
};
const addQuestion = () => {
  questions.value.push(canvas.currentPositions());
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
  position: absolute;
  right: 20px;
  top: 20px;

  .contro-row {
    display: block;
    margin: 10px 0px;

    .label {
      display: inline-block;
      padding-right: 20px;
      font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
      color: #333;
      font-size: 14px;
    }
    .text {
      font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
      color: #666;
      font-size: 14px;
    }
  }
}
</style>