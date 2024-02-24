<template>
  <div>
    <canvas ref="canvasRef"></canvas>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, Ref, ref, watch, withCtx } from 'vue';
import FlagChina from './index';

// 定义组件Props
const props = defineProps({
    width: {
      type: Number,
      default: 600,
    },
    showLines: {
      type: Boolean,
      default: false,
    },
});

// 创建canvas引用
const canvasRef: Ref<HTMLCanvasElement | null> = ref(null);
// 初始化FlagChina实例
const flagChina = new FlagChina(props.width, props.showLines);

// 监听props变化并更新FlagChina实例配置
watch(
  props,
  (newProps) => {
    if (newProps.width !== undefined && newProps.width !== flagChina.width) {
      flagChina.setWidth(newProps.width);
    }
    if (newProps.showLines !== undefined && newProps.showLines !== flagChina.showLines) {
      flagChina.setShowLines(newProps.showLines);
    }
  },
  { deep: true},
);

// 组件挂载时初始化canvas并绘制国旗
onMounted(() => {
  initCanvas().then(draw);
});

// 初始化canvas方法
async function initCanvas() {
  const canvas = canvasRef.value;
  if (canvas) {
    await flagChina.initCanvas(canvas);
  }
  return canvas;
}

// 绘制国旗方法
function draw() {
  const canvas = canvasRef.value;
  if (canvas) {
    flagChina.draw();
  }
}
</script>
