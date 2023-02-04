import '@/assets/style/base.less';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import 'nprogress/nprogress.css';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
// import store from './store';

const pinia = createPinia();

pinia.use(({ store }) => {
  const initialState = JSON.parse(JSON.stringify(store.$state));
  store.$reset = () => {
    store.$state = JSON.parse(JSON.stringify(initialState));
  };
});

const app = createApp(App);
app.use(ElementPlus);
app.use(pinia);
app.use(router);
app.mount('#app');

