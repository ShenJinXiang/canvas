<template>
    <div class="rotate-construction-animation-10">
        <rotate-construction-animation :width="windowWidth" :height="windowHeight - 40" @click="showContro = true"></rotate-construction-animation>
        <el-drawer v-model="showContro" title="设置" :direction="direction">
          <el-form :module="controForm" label-width="80px">
              <el-form-item label="速度比例" prop="speedRatio">
              <el-slider v-model="controForm.speedRatio" :min="-3" :max="3" :step="0.01" />
              </el-form-item>
          </el-form>
      </el-drawer>
    </div>
</template>
<script setup lang="ts">
import RotateConstructionAnimation from '@/components/page/animation/RotateConstructionAnimation10/index.vue';

import { useWindowSize } from '@vueuse/core';
import { reactive, ref } from 'vue';

const { width: windowWidth, height: windowHeight } = useWindowSize();
const showContro = ref(false);
const direction = ref("rtl");
const controForm = reactive({
    speedRatio: 1.8
});
</script>