import { createRouter, createWebHashHistory } from 'vue-router';
import NProgress from 'nprogress';
import config from '@/config';
import Home from '../views/Home.vue';

NProgress.configure({ showSpinner: false });

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
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
