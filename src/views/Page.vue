<template>
  <div>
    <div class="page-con">
      <router-view />
    </div>
    <v-footer />
  </div>
</template>
<script>
import VFooter from '@/components/layout/Footer.vue';

export default {
  name: 'Page',
  components: {
    VFooter,
  },
};
</script>
<style lang="less">
.page-con{
  margin-bottom: 40px;
}
</style>
