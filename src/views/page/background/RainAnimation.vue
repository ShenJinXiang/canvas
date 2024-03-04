<template>
    <rain-animation :width="width" :height="height - 40"></rain-animation>
</template>
<script lang="ts" setup>
import RainAnimation from '@/components/page/background/RainAnimation/index.vue';
import { useWindowSize } from '@vueuse/core';

const { width, height } = useWindowSize();
</script>
