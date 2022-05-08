<template>
  <div>
    <canvas ref="canvasRef" 
      @click="canvasClick"
      @mousemove="canvasMouseMove"
    />
  </div>
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
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, Ref } from 'vue';
import ChineseGo from '.';

const canvasRef: Ref = ref();
const chineseGo = new ChineseGo(45);

const clickType = ref(0);

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
const clickTypeChange = (val: number) => {
  if (canvasRef.value) {
    chineseGo.setClickType(val);
  }
};
onMounted(() => {
  chineseGo.initCanvas(canvasRef.value).draw();
});
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
}
</style>
