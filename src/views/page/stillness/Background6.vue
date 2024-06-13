<template>
    <div>
        <background :width="width" :height="height - 40"></background>
    </div>
</template>
<script lang="ts" setup>
import { useWindowSize } from '@vueuse/core';
import Background from '@/components/page/stillness/Background6/index.vue';

const { width, height } = useWindowSize();
</script>
