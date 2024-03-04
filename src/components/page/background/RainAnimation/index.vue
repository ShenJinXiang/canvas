<template>
    <div>下雨动画.canvas {{ props.width }} - {{ props.height }}</div>
</template>
<script lang="ts" setup>
const props = defineProps({
    width: {
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true
    }
});
</script>
