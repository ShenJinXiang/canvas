<template>
    <auspicious-cloud-pattern :width="width" :height="height - 40"></auspicious-cloud-pattern>
</template>
<script lang="ts" setup>
import AuspiciousCloudPattern from '@/components/page/stillness/AuspiciousCloudPattern/index.vue';
import { useWindowSize } from '@vueuse/core';

const { width, height } = useWindowSize();
</script>