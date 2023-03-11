<template>
  <div>
  <simple-pendulum-animation :width="width" :height="height - 40" :element-number="controForm.elementNumber" @click="showContro = true"></simple-pendulum-animation>
    <el-drawer v-model="showContro" title="设置" :direction="direction">
      <el-form :module="controForm" label-width="120px">
        <el-form-item label="数量" prop="elementNumber">
          <el-slider v-model="controForm.elementNumber" :min="1" :max="36" :step="1" />
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>

</template>
<script lang="ts" setup>
import SimplePendulumAnimation from '@/components/page/animation/SimplePendulumAnimation/index.vue';
import { useWindowSize } from '@vueuse/core';
import { reactive, ref } from 'vue';

const { width, height } = useWindowSize();
const showContro = ref(false);
const direction = ref("rtl");
const controForm = reactive({
  elementNumber: 12
});
</script>