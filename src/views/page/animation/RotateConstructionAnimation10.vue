<template>
    <div class="rotate-construction-animation-10">
        <rotate-construction-animation :width="windowWidth" :height="windowHeight - 40" ></rotate-construction-animation>
    </div>
</template>
<script setup lang="ts">
import RotateConstructionAnimation from '@/components/page/animation/RotateConstructionAnimation10/index.vue';

import { useWindowSize } from '@vueuse/core';
import { reactive, ref } from 'vue';

const { width: windowWidth, height: windowHeight } = useWindowSize();
</script>