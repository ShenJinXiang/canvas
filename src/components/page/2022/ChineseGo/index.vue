<template>
  <div>
    <canvas ref="canvasRef" 
      @click="canvasClick"
      @mousemove="canvasMouseMove"
    />
    <div class="contro-con">
      <el-row>
        <el-switch
          v-model="clickType"
          @change="clickTypeChange"
          active-color="#13ce66"
          inactive-color="#ff4949"
          :active-value="0"
          :inactive-value="1"
          active-text="下子"
          inactive-text="提子"
        />
      </el-row>
      <el-row v-if="clickType === 0">
        <el-switch
          v-model="downPieceType"
          @change="pieceTypeChange"
          active-color="#000"
          inactive-color="#fff"
          :active-value="0"
          :inactive-value="1"
          active-text="黑子"
          inactive-text="白子"
        />
      </el-row>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, Ref } from 'vue';
import ChineseGo from '.';

const canvasRef: Ref = ref();
const chineseGo = new ChineseGo(45);

const clickType = ref(0);
const downPieceType = ref(0);

const canvasClick = (event: MouseEvent) => {
  if (canvasRef.value) {
    chineseGo.mouseClick(event);
  }
};
const canvasMouseMove = (event: MouseEvent) => {
  if (canvasRef.value) {
    chineseGo.mouseMove(event);
  }
};
const handlerClickType = () => {
  if(canvasRef.value) {
    clickType.value = clickType.value === 0 ? 1 : 0;
    chineseGo.setClickType(clickType.value);
  }
};
const handlerPieceType = () => {
  if (canvasRef.value) {
    downPieceType.value = downPieceType.value === 0 ? 1 : 0;
    chineseGo.setDownPieceType(downPieceType.value);
  }
};
const clickTypeChange = (val: number) => {
  if (canvasRef.value) {
    chineseGo.setClickType(val);
  }
};
const pieceTypeChange = (val: number) => {
  if (canvasRef.value) {
    chineseGo.setDownPieceType(val);
  }
};
onMounted(() => {
  chineseGo.initCanvas(canvasRef.value).run();
});
window.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    handlerClickType();
  }
  if (event.key === '`') {
    handlerPieceType();
  }
}, false);
</script>
<style lang="less" scoped>
.contro-con {
  position: fixed;
  top:0px;
  bottom: 0px;
  right: 0px;
  padding: 40px 20px;
  width: 260px;
  box-sizing: border-box;
  background-color: #f8f8f8;
}
</style>
