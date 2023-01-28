<template>
  <div class="container" :style="conStyle">
    <canvas ref="canvasRef"></canvas>
    <div class="contro-con" :style="controStyle">
      <div class="contro-row">
        <div class="label">穿过边界：</div>
        <div class="box">
          <el-switch v-model="playStatus.boundaryless" active-text="是" inactive-text="否" :inline-prompt="true" active-color="#13ce66" inactive-color="#ff4949" />
        </div>
      </div>
      <div class="contro-row">
        <el-button @click="start" v-show="playStatus.challengeStatus === ChallengeStatus.PREPARE">开始挑战</el-button>
        <el-button @click="reStart" v-show="playStatus.challengeStatus !== ChallengeStatus.PREPARE">重新挑战</el-button>
      </div>
      <div class="contro-row" v-show="playStatus.challengeStatus !== ChallengeStatus.PREPARE">
        <div class="label">得分：</div>
        <div class="box"><span class="text">{{ playStatus.score }}</span></div>
      </div>
      <div class="contro-row" v-show="playStatus.challengeStatus !== ChallengeStatus.PREPARE">
        <div class="label">速度：</div>
        <div class="box"><span class="text">{{ playStatus.speed }}</span></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useMagicKeys, whenever } from '@vueuse/core';
import { onMounted, reactive, ref } from 'vue';
import GluttonousSnake, { ChallengeStatus, Direction } from '.';

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
const conStyle = reactive({
  height: `${props.height}px`,
  width: `${props.width}px`
})
const controStyle = reactive({
  width: `${controWidth.value}px`,
  height: `${props.height}px`,
});
const canvas = new GluttonousSnake(props.width - controWidth.value, props.height);

const playStatus = canvas.playStatus;

onMounted(() => {
  canvas.initCanvas(canvasRef.value).run();
});

const { UP, DOWN, LEFT, RIGHt } = useMagicKeys();
whenever(UP, () => {
  canvas.directionKey(Direction.UP);
});
whenever(DOWN, () => {
  canvas.directionKey(Direction.DOWN);
});
whenever(LEFT, () => {
  canvas.directionKey(Direction.LEFT);
});
whenever(RIGHt, () => {
  canvas.directionKey(Direction.RIGHT);
});

const start = () => {
  canvas.start();
};
const reStart = () => {
  canvas.reStart();
};
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

      .label {
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