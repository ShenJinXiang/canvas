import config from '@/config';
import NProgress from 'nprogress';
import { createRouter, createWebHashHistory } from 'vue-router';
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
    component: () => import('@/views/Page.vue'),
    children: pages,
  },
];

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
