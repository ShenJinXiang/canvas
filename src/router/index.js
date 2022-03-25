import { createRouter, createWebHashHistory } from 'vue-router';
import NProgress from 'nprogress';
import config from '@/config';
import Home from '../views/Home.vue';
import pages from './page';

NProgress.configure({ showSpinner: false });

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/page',
    name: 'Page',
    component: import('@/views/Page.vue'),
    children: pages,
  },
];

// const viewFiles = require.context('../views', true, /\.vue$/);
// viewFiles.keys().forEach((key) => {
//   console.log(key, viewFiles(key));
// });
// console.log(viewFiles.keys());
// console.log(viewFiles.id);

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to) => {
  NProgress.start();
  document.title = to.meta.title ? `${config.title} - ${to.meta.title}` : config.title;
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
