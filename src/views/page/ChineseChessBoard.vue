<template>
  <div>
    <chinese-chess-board />
  </div>
</template>
<script lang="ts">
import ChineseChessBoard from '@/components/page/2020/ChineseChessBoard/index.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'vChineseChessBoard',
  components: {
    ChineseChessBoard,
  },
});
</script>