<template>
  <div>
    <Laser-effect
      :width="laserWidth"
      :height="laserHeight - 40"
      :laster-number="240"
      ></Laser-effect>
    <!-- <el-drawer v-model="showContro" title="设置" :direction="direction">
      <el-form :module="controForm" label-width="120px">
        <el-form-item label="宽" prop="width">
          <el-slider v-model="controForm.width" :min="maxWidth / 2" :max="maxWidth" />
        </el-form-item>
        <el-form-item label="高" prop="height">
          <el-slider v-model="controForm.height" :min="maxHeight / 2" :max="maxHeight" />
        </el-form-item>
        <el-form-item label="数量" prop="lasterNumber">
          <el-slider v-model="controForm.lasterNumber" :min="40" :max="400" />
        </el-form-item>
      </el-form>
    </el-drawer> -->
  </div>
</template>
<script lang="ts" setup>
import LaserEffect from '@/components/page/background/LaserEffect/index.vue';
import { useWindowSize } from '@vueuse/core';
import { ref } from 'vue';

const { width: laserWidth, height: laserHeight } = useWindowSize();
const lasterNumber = ref(240);
// const showContro = ref(false);
// const direction = ref("rtl");
// const maxWidth = window.innerWidth;
// const maxHeight = window.innerHeight - 40;
// const controForm = reactive({
//   width: maxWidth,
//   height: maxHeight,
//   lasterNumber: 200
// });
</script>