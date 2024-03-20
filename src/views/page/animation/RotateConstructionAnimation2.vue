<template>
  <div>
    <rotate-construction-animation :width="width" :height="height - 40" :element-number="controForm.elementNumber"
      @click="showContro = true"></rotate-construction-animation>
    <el-drawer v-model="showContro" title="设置" :direction="direction">
      <el-form :module="controForm" label-width="80px">
        <el-form-item label="数量" prop="elementNumber">
          <el-slider v-model="controForm.elementNumber" :min="3" :max="36" :step="1" />
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>
<script lang="ts" setup>
import RotateConstructionAnimation from '@/components/page/animation/RotateConstructionAnimation2/index.vue';
import { useWindowSize } from '@vueuse/core';
import { reactive, ref } from 'vue';

const { width, height } = useWindowSize();

const showContro = ref(false);
const direction = ref("rtl");
const controForm = reactive({
  elementNumber: 6
});
</script>
