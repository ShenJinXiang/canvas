<template>
  <div>
    <color-turntable
    :width="controForm.width"
    :height="controForm.height"
    :color-number="controForm.colorNumber"
    :inner-speed="controForm.innerSpeed"
    :outer-speed="controForm.outerSpeed"
     @click="showContro = true"></color-turntable>
    <el-drawer v-model="showContro" title="设置" :direction="direction">
      <el-form :module="controForm" label-width="120px">
        <el-form-item label="宽" prop="width">
          <el-slider v-model="controForm.width" :min="width / 2" :max="width" />
        </el-form-item>
        <el-form-item label="高" prop="height">
          <el-slider v-model="controForm.height" :min="height / 2" :max="height - 40" />
        </el-form-item>
        <el-form-item label="颜色数量" prop="colorNumber">
          <el-input-number v-model="controForm.colorNumber" :min="1" :max="36"></el-input-number>
        </el-form-item>
        <el-form-item label="内层速度" prop="innerSpeed">
          <el-slider v-model="controForm.innerSpeed" :min="0" :max="60" />
        </el-form-item>
        <el-form-item label="外层速度" prop="outerSpeed">
          <el-slider v-model="controForm.outerSpeed" :min="0" :max="10" />
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>
<script lang="ts" setup>
import ColorTurntable from '@/components/page/animation/ColorTurntable/index.vue';
import { useWindowSize } from '@vueuse/core';
import { reactive, ref } from 'vue';

const { width, height } = useWindowSize();

const showContro = ref(false);
const direction = ref("rtl");
const controForm = reactive({
  width: width.value,
  height: height.value - 40,
  colorNumber: 3,
  innerSpeed: 5,
  outerSpeed: 1
});
</script>