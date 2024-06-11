<template>
    <div>
        background6({{ width }}, {{ height }})
    </div>
</template>
<script lang="ts" setup>
import { useWindowSize } from '@vueuse/core';

const { width, height } = useWindowSize();
</script>
