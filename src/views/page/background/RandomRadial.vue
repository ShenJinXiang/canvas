<template>
  <div>
    <random-radial
      :width="controForm.width"
      :height="controForm.height"
      :line-number="controForm.lineNumber"
      @click="showContro = true"
    ></random-radial>
    <el-drawer v-model="showContro" title="设置" :direction="direction">
      <el-form :module="controForm" label-width="120px">
        <el-form-item label="宽" prop="width">
          <el-slider v-model="controForm.width" :min="maxWidth / 2" :max="maxWidth" />
        </el-form-item>
        <el-form-item label="高" prop="height">
          <el-slider v-model="controForm.height" :min="maxHeight / 2" :max="maxHeight" />
        </el-form-item>
        <el-form-item label="射线数量" prop="lineNumber">
          <el-input-number v-model="controForm.lineNumber" :min="1" :max="20" />
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>
<script lang="ts" setup>
import RandomRadial from '@/components/page/background/RandomRadial/indev.vue';
import { reactive, ref } from 'vue';

const showContro = ref(false);
const direction = ref("rtl");
const maxWidth = window.innerWidth;
const maxHeight = window.innerHeight - 40;
const controForm = reactive({
  width: maxWidth,
  height: maxHeight,
  lineNumber: 5
});
</script>
