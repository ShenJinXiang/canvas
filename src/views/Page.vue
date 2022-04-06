<template>
  <div>
    <div class="page-con">
      <router-view />
    </div>
    <v-footer />
  </div>
</template>
<script lang="ts">
import VFooter from '@/components/layout/Footer.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Page',
  components: {
    VFooter,
  },
});
</script>
<style lang="less">
.page-con{
  margin-bottom: 40px;
}
</style>
