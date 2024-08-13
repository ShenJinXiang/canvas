<template>
    <div class="rainbow-candy-animation-con">
        <rainbow-candy-animation :width="width" :height="height - 40"></rainbow-candy-animation>
    </div>
</template>
<script lang="ts" setup>
import RainbowCandyAnimation from '@/components/page/animation/RainbowCandyAnimation/index.vue';
import { useWindowSize } from '@vueuse/core';

const { width, height } = useWindowSize();
</script>