<template>
    <div>
        <div>
            <fractal-image :width="windowWidth" :height="windowHeight - 40" :side-num="sideNum" @click="showContro = true"></fractal-image>
        </div>
        <el-drawer v-model="showContro" title="设置" :direction="direction">
            <el-slider v-model="sideNum" :min="3" :max="6" :step="1" />
        </el-drawer>
    </div>
</template>
<script lang="ts" setup>
import FractalImage from '@/components/page/animation/FractalImage1/index.vue';
import { useWindowSize } from '@vueuse/core';
import { ref } from 'vue';

const { width: windowWidth, height: windowHeight } = useWindowSize();
const showContro = ref(false);
const direction = ref("rtl");
const sideNum = ref(6);
</script>