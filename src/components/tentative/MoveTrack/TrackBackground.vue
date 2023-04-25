<template>
    <!-- <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg"> -->
    <svg :width="viewBox.width" :height="viewBox.height" :viewBox="[viewBox.vx, viewBox.vy, viewBox.vw, viewBox.vh]" xmlns="http://www.w3.org/2000/svg">
        <g>
            <rect stroke="#000" id="svg_2" height="600" width="800" x="-1" fill="#b2b2b2"/>
            <line stroke-width="10" stroke="#ffffff" id="svg_4" y2="60" x2="800" y1="60" x1="0" fill="none"/>
            <line stroke-width="10" stroke="#ffffff" id="svg_5" y2="120" x2="800" y1="120" x1="0" fill="none"/>
            <line stroke-width="15" stroke="#ffffff" id="svg_6" y2="181" x2="797" y1="181" x1="-3" fill="none"/>
            <line stroke-width="10" stroke="#ffffff" id="svg_7" y2="240" x2="800" y1="240" x1="0" fill="none"/>
            <line stroke-width="10" stroke="#ffffff" id="svg_8" y2="311" x2="797" y1="311" x1="-3" fill="none"/>
            <line stroke-width="15" stroke="#ffffff" id="svg_9" y2="390" x2="800" y1="390" x1="0" fill="none"/>
            <line stroke-width="10" stroke="#ffffff" id="svg_10" y2="461" x2="800" y1="461" x1="0" fill="none"/>
            <line stroke-width="20" stroke="#ffffff" id="svg_11" y2="531" x2="800" y1="531" x1="0" fill="none"/>
            <line id="svg_12" y2="599" x2="410" y1="-4" x1="408" stroke-width="19" stroke="#ffffff" fill="none"/>
            <line stroke="#ffffff" id="svg_13" y2="599" x2="258" y1="391.00001" x1="256" stroke-width="10" fill="none"/>
            <line id="svg_14" y2="599" x2="520" y1="-4" x1="518" stroke-width="10" stroke="#ffffff" fill="none"/>
            <line id="svg_15" y2="599" x2="720" y1="-4" x1="718" stroke-width="10" stroke="#ffffff" fill="none"/>
            <line stroke="#ffffff" id="svg_16" y2="599" x2="620" y1="311.99999" x1="618" stroke-width="11" fill="none"/>
            <line stroke-width="16" id="svg_17" y2="308" x2="98" y1="-1" x1="96" stroke="#ffffff" fill="none"/>
            <line id="svg_18" y2="399" x2="896" y1="400" x1="896" stroke="#ffffff" fill="none"/>
            <line stroke-width="10" id="svg_19" y2="181" x2="247" y1="59" x1="248" stroke="#ffffff" fill="none"/>
            <line stroke-width="10" id="svg_20" y2="-1" x2="636" y1="177" x1="633" stroke="#ffffff" fill="none"/>
            <line id="svg_21" y2="323" x2="893" y1="324" x1="894" stroke="#ffffff" fill="none"/>
            <line stroke="#ffffff" id="svg_22" y2="307" x2="316" y1="180" x1="315" stroke-width="15" fill="none"/>
            <line id="svg_23" y2="527" x2="148" y1="311" x1="146" stroke-width="10" stroke="#ffffff" fill="none"/>
            <line stroke="#ffffff" stroke-width="10" id="svg_25" y2="384" x2="275" y1="316" x1="275" fill="none"/>
        </g>
    </svg>
</template>
<script lang="ts" setup>
import { reactive, watch } from 'vue';
import { useMagicKeys } from '@vueuse/core'
import { vi } from 'element-plus/es/locale';

// const clickCircle = () => {
//     console.log('clickCircle');
// };
const viewBox = reactive({
    vx: 0,
    vy: 0,
    vw: 800,
    vh: 600,
    width: 800,
    height: 600
});
const keys = useMagicKeys();
const { up, down, left, right } = keys;

setInterval(() => {
    if (up.value) {
        viewBox.vy = viewBox.vy <= 0 ? 0 : viewBox.vy - 1;
    }
    if (down.value) {
        viewBox.vy = viewBox.vy >= viewBox.height - viewBox.vh ? viewBox.height - viewBox.vh : viewBox.vy + 1;
    }
    if (left.value) {
        viewBox.vx = viewBox.vx <= 0 ? 0 : viewBox.vx - 1;
    }
    if (right.value) {
        viewBox.vx = viewBox.vx >= viewBox.width - viewBox.vw ? viewBox.width - viewBox.vw : viewBox.vx + 1;
    }
}, 10);
</script>
