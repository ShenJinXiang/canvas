<template>
  <div class="flagChina-con">
    <div class="flag-box" @click="showContro = true">
      <flag-china :show-lines="showLines" :width="width"></flag-china>
    </div>
    <el-drawer v-model="showContro" title="设置" :direction="direction">
      <el-checkbox v-model="showLines" label="显示辅助线" />
      <el-slider
        v-model="width"
        :min="minWidth"
        :max="maxWidth"
        :step="10"
      />
    </el-drawer>
  </div>
</template>
<script lang="ts" setup>
import FlagChina from "@/components/page/stillness/FlagChina/index.vue";
import { ref, Ref, computed } from "vue";

const showContro = ref(false);
const direction = ref("rtl");
const showLines: Ref<boolean> = ref(false);
const width: Ref<number> = ref(900);
const maxWidth: Ref<number> = computed(() => {
  return Math.min(window.innerWidth - 40, (window.innerHeight - 20) * 1.5 - 40);
});
const minWidth: number = 400;
</script>
