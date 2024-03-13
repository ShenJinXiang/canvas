<template>
    <div class="rotate-construction-animation-8">
    旋转构建动画8 width: {{ windowWidth }}px height: {{ windowHeight }}px
    </div>
</template>
<script lang="ts" setup>
import { useWindowSize } from '@vueuse/core';
const { width: windowWidth, height: windowHeight } = useWindowSize();
</script>