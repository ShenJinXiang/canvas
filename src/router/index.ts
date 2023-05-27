import config from '@/config';
import NProgress from 'nprogress';
import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import pages from './page';
import tentative from './tentative';

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
  {
    path: '/tentative',
    name: 'Tentative',
    component: () => import('@/views/Tentative.vue'),
    children: tentative,
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import('@/views/page/Test.vue')
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
