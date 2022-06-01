<template>
  <div>
    <color-particle 
      :width="controForm.width"
      :height="controForm.height"
      :particle-number="controForm.particleNumber"
      @click="showContro = true"
    />
    <el-drawer v-model="showContro" title="设置" :direction="direction">
      <el-form :module="controForm" label-width="120px">
        <el-form-item label="宽" prop="width">
          <el-slider v-model="controForm.width" :min="maxWidth / 2" :max="maxWidth" />
        </el-form-item>
        <el-form-item label="高" prop="height">
          <el-slider v-model="controForm.height" :min="maxHeight / 2" :max="maxHeight" />
        </el-form-item>
        <el-form-item label="小球数量" prop="particleNumber">
          <el-input-number v-model="controForm.particleNumber" :min="20" :max="200" />
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>
<script lang="ts" setup>
import ColorParticle from '@/components/page/2020/ColorParticle/index.vue';
import { reactive, ref } from 'vue';

const showContro = ref(false);
const direction = ref("rtl");
const maxWidth = window.innerWidth;
const maxHeight = window.innerHeight - 40;
const controForm = reactive({
  width: maxWidth,
  height: maxHeight,
  particleNumber: 120
});
</script>
