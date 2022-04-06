<template>
  <el-config-provider :size="size" :message="messageConf" :locale="locale" :button="buttonConf">
    <router-view/>
  </el-config-provider>
</template>
<script lang="ts">
import { computed, reactive, defineComponent } from 'vue';
import { useStore } from 'vuex';
import zhCn from 'element-plus/es/locale/lang/zh-cn';

export default defineComponent({
  name: 'App',
  setup() {
    const store = useStore();
    const size = computed(() => store.getters.elementSize);
    const messageConf = reactive({
      max: 1,
    });
    const buttonConf = reactive({
      autoInsertSpace: true,
    });
    return {
      size,
      messageConf,
      locale: zhCn,
      buttonConf,
    };
  },
});
</script>
