<template>
  <div>
    <rotate-line-animation :width="controForm.width" :height="controForm.height" :sideNumber="controForm.sideNumber" :pointNumber="controForm.pointNumber" @click="showContro = true"></rotate-line-animation>
    <el-drawer v-model="showContro" title="设置" :direction="direction">
      <el-form :module="controForm" label-width="120px">
        <el-form-item label="宽" prop="width">
          <el-slider v-model="controForm.width" :min="width / 2" :max="width" />
        </el-form-item>
        <el-form-item label="高" prop="height">
          <el-slider v-model="controForm.height" :min="height / 2" :max="maxHeight" />
        </el-form-item>
        <el-form-item label="SIDES" prop="sideNumber">
          <el-slider v-model="controForm.sideNumber" :min="5" :max="30" />
        </el-form-item>
        <el-form-item label="Points/side" prop="pointNumber">
          <el-slider v-model="controForm.pointNumber" :min="10" :max="20" />
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
  
</template>
<script lang="ts" setup>
import RotateLineAnimation from '@/components/page/animation/RotateLineAnimation/index.vue';
import { useWindowSize } from '@vueuse/core';
import { reactive, ref } from 'vue';
const { width, height } = useWindowSize();
const maxHeight = ref(height.value - 40);

const showContro = ref(false);
const direction = ref("rtl");
const controForm = reactive({
  width: width.value,
  height: maxHeight.value,
  sideNumber: 5,
  pointNumber: 10
});
</script>
