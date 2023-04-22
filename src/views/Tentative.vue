<template>
    <div>
      <div class="page-con">
        <router-view />
      </div>
      <v-footer />
    </div>
  </template>
  <script lang="ts" setup>
  import VFooter from '@/components/layout/Footer.vue';
  </script>
  <style lang="less">
  .page-con{
    margin-bottom: 40px;
  }
  </style>
  