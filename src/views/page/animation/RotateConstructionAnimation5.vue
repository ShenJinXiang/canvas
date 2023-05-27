<template>
    <div>
        <rotate-construction-animation :width="windowWidth" :height="windowHeight - 40"></rotate-construction-animation>
    </div>
</template>
<script lang="ts" setup>
import RotateConstructionAnimation from '@/components/page/animation/RotateConstructionAnimation5/index.vue';
import { useWindowSize } from '@vueuse/core';
const { width: windowWidth, height: windowHeight } = useWindowSize();
</script>
