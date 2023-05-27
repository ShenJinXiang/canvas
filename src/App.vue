<template>
  <el-config-provider :size="layoutStroe.elementSize" :message="messageConf" :locale="locale" :button="buttonConf">
    <router-view/>
  </el-config-provider>
</template>
<script lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import { defineComponent, reactive } from 'vue';
import { useLayoutStore } from './store/layout';

export default defineComponent({
  name: 'App',
  setup() {
    const layoutStroe = useLayoutStore();
    const messageConf = reactive({
      max: 1,
    });
    const buttonConf = reactive({
      autoInsertSpace: true,
    });
    return {
      layoutStroe,
      messageConf,
      locale: zhCn,
      buttonConf,
    };
  },
});
</script>
