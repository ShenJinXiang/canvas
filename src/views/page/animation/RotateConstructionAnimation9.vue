<template>
  <div class="rotate-construction-animation-9">
      <rotate-construction-animation
          :width="windowWidth" 
          :height="windowHeight - 40" 
          :side-number="controForm.sideNumber"
          @click="showContro = true"
          ></rotate-construction-animation>
      <el-drawer v-model="showContro" title="设置" :direction="direction">
          <el-form :module="controForm" label-width="80px">
              <el-form-item label="边数" prop="sideNumber">
              <el-slider v-model="controForm.sideNumber" :min="3" :max="7" :step="1" />
              </el-form-item>
          </el-form>
      </el-drawer>
  </div>
</template>
<script lang="ts" setup>
import RotateConstructionAnimation from '@/components/page/animation/RotateConstructionAnimation9/index.vue';
import { useWindowSize } from '@vueuse/core';
import { reactive, ref } from 'vue';

const { width: windowWidth, height: windowHeight } = useWindowSize();
const showContro = ref(false);
const direction = ref("rtl");
const controForm = reactive({
  sideNumber: 4
});
</script>