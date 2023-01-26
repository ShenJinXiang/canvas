<template>
  <div class="container" :style="conStyle">
    <canvas ref="canvasRef" @click="click" @mousemove="move"></canvas>
    <div class="contro-con" :style="controStyle">
      <div class="contro-row" v-show="contro.status === ChallengeStatus.PREPARE">
        <div class="label">行数：</div>
        <div class="box">
          <el-slider v-model="contro.rowNumber" :min="3" :max="18" @change="changeRowCol"></el-slider>
        </div>
      </div>
      <div class="contro-row" v-show="contro.status === ChallengeStatus.PREPARE">
        <div class="label">列数：</div>
        <div class="box">
          <el-slider v-model="contro.colNumber" :min="3" :max="20" @change="changeRowCol"></el-slider>
        </div>
      </div>
      <div class="contro-row">
        <el-button @click="start" v-show="contro.status === ChallengeStatus.PREPARE">开始挑战</el-button>
        <el-button @click="reStart" v-show="contro.status !== ChallengeStatus.PREPARE">重新挑战</el-button>
      </div>
      <div class="contro-row" v-show="contro.status !== ChallengeStatus.PREPARE">
        <div class="label">时长：</div>
        <div class="box">
        <span class="text">{{ playTime.hour }}小时{{ playTime.minute }}分{{ playTime.second }}秒 {{ playTime.millisecond }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { successMsg } from '@/lib/ElKit';
import { useMouseInElement, useTimestamp } from '@vueuse/core';
import { computed, onMounted, reactive, ref } from 'vue';
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
const controWidth = ref(360);
enum ChallengeStatus {
  PREPARE = 'PREPARE',
  PLAY = 'PLAY',
  // pause,
  COMPLETE = 'COMPLETE'
};
const { elementX: canvasPointX, elementY: canvasPointY } = useMouseInElement(canvasRef);
const timestamp = useTimestamp({ offset: 0 });
const contro = reactive({
  status: ChallengeStatus.PREPARE,
  rowNumber: 4,
  colNumber: 4,
  beginTimestamp: 0,
  endTimestamp: 0,
});
const canvas = new DigitalHuarongRoad(props.width - controWidth.value, props.height, contro.rowNumber, contro.colNumber);
const conStyle = reactive({
  height: `${props.height}px`,
  width: `${props.width}px`,
});
const controStyle = reactive({
  width: `${controWidth.value}px`,
  height: `${props.height}px`,
});

onMounted(() => {
  canvas.initCanvas(canvasRef.value).run();
});
const click = () => {
  if (contro.status === ChallengeStatus.PLAY) {
    canvas.click(canvasPointX.value, canvasPointY.value);
    if (canvas.isComplete()) {
      contro.endTimestamp = timestamp.value;
      contro.status = ChallengeStatus.COMPLETE;
      successMsg('成功啦，恭喜你！');
    }
  }
}
const move = () => {
  canvas.move(canvasPointX.value, canvasPointY.value);
};

const start = () => {
  if (contro.status === ChallengeStatus.PREPARE) {
    contro.beginTimestamp = timestamp.value;
    contro.status = ChallengeStatus.PLAY;
  }
  
};
const reStart = () => {
  canvas.reStart();
  contro.status = ChallengeStatus.PREPARE;
};

const changeRowCol = () => {
  canvas.setRowCol(contro.rowNumber, contro.colNumber);
}

const playTime = computed(() => {
  if (contro.status === ChallengeStatus.PREPARE) {
    return {
      hour: 0, minute: 0, second: 0, millisecond: 0
    };
  }
  if (contro.status === ChallengeStatus.COMPLETE) {
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
    background-color: #fff;
    position: absolute;
    right: 0px;
    top: 0px;
    padding: 80px 20px 20px 10px;

    .contro-row {
      display: flex;
      align-items: center;

      .label{
        font-size: 14px;
        color: var(--el-text-color-secondary);
        line-height: 44px;
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-bottom: 0;
      }
      .box {
        flex: 0 0 70%;
        color: var(--el-color-info-dark-2);
      }
    }
  }
}
</style>