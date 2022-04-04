<template>
  <div class="flagChina-con">
    <div class="flag-box">
      <flag-china :show-lines="showLines" :width="width"></flag-china>
    </div>
    <div class="contro-con">
      <el-row>
        <el-col :span="2" :offset="6">
          <el-button type="primary" @click="showLines = !showLines">{{ showLines ? '隐藏辅助线' : '显示辅助线'}}</el-button>
        </el-col>
        <el-col :span="10">
          <el-slider v-model="width" :min="minWidth" :max="maxWidth" :step="10" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue';
import FlagChina from '@/components/page/2020/FlagChina/index.vue';

export default {
  name: 'vFlagChina',
  components: {
    FlagChina,
  },
  setup() {
    const showLines = ref(false);
    const width = ref(900);
    const maxWidth = 1200;
    const minWidth = 400;
    return {
      showLines,
      width,
      maxWidth,
      minWidth,
    };
  },
};
</script>
<style lang="less">
@width: 1200px;
.flagChina-con {
  .flag-box {
    width: @width;
    height: @width * 2 / 3;
    margin: 20px auto;
    canvas {
      display: block;
    }
  }
  .contro-con {
    padding-bottom: 20px;
  }
}
</style>
