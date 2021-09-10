import { createRouter, createWebHashHistory } from 'vue-router';
import localCache from '@/utils/cache';
import { firstMenu } from '@/utils/map-menus';
// 导入的是一个类型
import type { RouteRecordRaw } from 'vue-router';
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/Login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/main.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/views/notFound/notFound.vue')
  }
];
const router = createRouter({
  routes,
  history: createWebHashHistory()
});
router.beforeEach((to) => {
  if (to.path != '/login') {
    const token = localCache.getLocalCache('token');
    if (!token) {
      return '/login';
    }
  }
  if (to.path === '/main') {
    return firstMenu.url;
  }
});
export default router;
