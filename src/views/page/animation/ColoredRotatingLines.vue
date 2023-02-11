<template>
  <div>
    <colored-rotating-lines :width="controForm.width" :height="controForm.height" @click="showContro = !showContro"></colored-rotating-lines>
    <el-drawer v-model="showContro" title="设置" :direction="direction">
      <el-form :module="controForm" label-width="120px">
        <el-form-item label="宽" prop="width">
          <el-slider v-model="controForm.width" :min="width / 2" :max="width" />
        </el-form-item>
        <el-form-item label="高" prop="height">
          <el-slider v-model="controForm.height" :min="height / 2" :max="height - 40" />
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>
<script lang="ts" setup>
import ColoredRotatingLines from '@/components/page/animation/ColoredRotatingLines/index.vue';
import { useWindowSize } from '@vueuse/core';
import { reactive, ref } from 'vue';

const { width, height } = useWindowSize();
const showContro = ref(false);
const direction = ref("rtl");
const controForm = reactive({
  width: width.value,
  height: height.value - 40
});
</script>