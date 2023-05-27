<template>
  <div>
    <pen-exercise-paper
      @click="showContro = true"
      :row="controForm.row"
      :col="controForm.col"
      :grid-style="controForm.gridStyle"
      :line-color="controForm.lineColor"
    />
    <el-drawer v-model="showContro" title="设置" :direction="direction">
      <el-form :module="controForm" label-width="120px">
        <el-form-item label="列" prop="col">
          <el-input-number v-model="controForm.col" :min="8" :max="20" />
        </el-form-item>
        <el-form-item label="行" prop="row">
          <el-input-number v-model="controForm.row" :min="8" :max="24" />
        </el-form-item>
        <el-form-item label="字格样式" prop="gridStyle">
          <el-select v-model="controForm.gridStyle">
            <el-option label="米字格" value="mi" />
            <el-option label="田字格" value="tian" />
          </el-select>
        </el-form-item>
        <el-form-item label="选择颜色" prop="lineColor">
          <el-color-picker
            v-model="controForm.lineColor"
            show-alpha
            :predefine="predefineColor"
          />
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>
<script lang="ts" setup>
import PenExercisePaper from "@/components/page/stillness/PenExercisePaper/index.vue";
import { reactive, ref } from "vue";

const showContro = ref(false);
const direction = ref("rtl");
const controForm = reactive({
  row: 14,
  col: 11,
  gridStyle: "mi",
  lineColor: "#f00",
});
const predefineColor = ref([
  "#ff4500",
  "#ff8c00",
  "#ffd700",
  "#90ee90",
  "#00ced1",
  "#1e90ff",
  "#c71585",
  "rgba(255, 69, 0, 0.68)",
  "rgb(255, 120, 0)",
  "hsv(51, 100, 98)",
  "hsva(120, 40, 94, 0.5)",
  "hsl(181, 100%, 37%)",
  "hsla(209, 100%, 56%, 0.73)",
  "#c7158577",
]);
</script>
