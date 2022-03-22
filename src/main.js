import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import locale from 'element-plus/es/locale/lang/zh-cn';
import App from './App.vue';
import 'element-plus/dist/index.css';
import 'nprogress/nprogress.css';
import '@/assets/style/base.less';
import router from './router';
import store from './store';

const app = createApp(App);
app.use(ElementPlus, {
  locale,
  size: 'small',
  button: {
    autoInsertSpace: true,
  },
});
app.use(store);
app.use(router);
app.mount('#app');
