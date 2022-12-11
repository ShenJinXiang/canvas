<template>
  <div>
    <div class="eight-diagrams-box" @click="showContro = true">
      <eight-diagrams 
        :width="controForm.width"
        :height="controForm.height"
        :background-color="controForm.backgroundColor"
        :yang-color="controForm.yangColor"
        :yin-color="controForm.yinColor" 
        :inner-speed="controForm.innerSpeed"
        :outer-speed="controForm.outerSpeed"
      />
    </div>
    <el-drawer v-model="showContro" title="设置" :direction="direction">
      <el-form :module="controForm" label-width="120px">
        <el-form-item label="背景颜色" prop="backgroundColor">
          <el-color-picker
            v-model="controForm.backgroundColor"
            show-alpha
          />
        </el-form-item>
        <el-form-item label="阳爻颜色" prop="yangColor">
          <el-color-picker
            v-model="controForm.yangColor"
            show-alpha
          />
        </el-form-item>
        <el-form-item label="阴爻颜色" prop="yinColor">
          <el-color-picker
            v-model="controForm.yinColor"
            show-alpha
          />
        </el-form-item>
        <el-form-item label="宽度" prop="width">
          <el-slider
            v-model="controForm.width"
            :min="600"
            :max="maxWidth"
            :step="1"
          />
        </el-form-item>
        <el-form-item label="高度" prop="height">
          <el-slider
            v-model="controForm.height"
            :min="300"
            :max="maxHeight"
            :step="1"
          />
        </el-form-item>
        <el-form-item label="内部转速" prop="innerSpeed">
          <el-slider
            v-model="controForm.innerSpeed"
            :min="0"
            :max="200"
            :step="1"
          />
        </el-form-item>
        <el-form-item label="外圈转速" prop="outerSpeed">
          <el-slider
            v-model="controForm.outerSpeed"
            :min="0"
            :max="100"
            :step="1"
          />
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>
<script lang="ts" setup>
import EightDiagrams from '@/components/page/animation/EightDiagrams/index.vue';
import { reactive, ref } from 'vue';

const showContro = ref(false);
const direction = ref("rtl");
const maxWidth = window.innerWidth;
const maxHeight = window.innerHeight - 40;
const controForm = reactive({
  width: maxWidth,
  height: maxHeight,
  yangColor: '#fff',
  yinColor: '#000',
  backgroundColor: '#777',
  innerSpeed: 10,
  outerSpeed: 2,
});
</script>