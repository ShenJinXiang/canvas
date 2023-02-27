<template>
  <div>
    <rotate-construction-animation1 :width="width" :height="height - 40" :element-number="controForm.elementNumber"
      @click="showContro = true">
    </rotate-construction-animation1>
    <el-drawer v-model="showContro" title="设置" :direction="direction">
      <el-form :module="controForm" label-width="120px">
        <el-form-item label="数量" prop="elementNumber">
          <el-slider v-model="controForm.elementNumber" :min="3" :max="36" :step="1" />
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>
<script lang="ts" setup>
import RotateConstructionAnimation1 from '@/components/page/animation/RotateConstructionAnimation1/index.vue';
import { useWindowSize } from '@vueuse/core';
import { reactive, ref } from 'vue';

const { width, height } = useWindowSize();

const showContro = ref(false);
const direction = ref("rtl");
const controForm = reactive({
  elementNumber: 18
});
</script>
