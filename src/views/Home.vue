<template>
  <div class="home">
    <div class="main-container">
      <div class="title-con">
        <h1>CANVAS</h1>
        <!-- <a target="_self" href="/bck/index.html">旧版</a> -->
      </div>
      <ul>
        <li v-for="(item, index) in pages" :key="index">
          <router-link :to="`/page/${item.path}`"
            >{{ index + 1 }}. {{ item.title }}</router-link
          >
        </li>
      </ul>
    </div>
    <v-footer />
  </div>
</template>
<script lang="ts" setup>
import vFooter from "@/components/layout/Footer.vue";
import pages from "@/router/page";
</script>