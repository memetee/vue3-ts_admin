import { createRouter, createWebHashHistory } from 'vue-router';
import localCache from '@/utils/cache';
// 导入的是一个类型
import type { RouteRecordRaw } from 'vue-router';
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    component: () => import('@/view/login/Login.vue')
  },
  {
    path: '/main',
    component: () => import('@/view/main/main.vue')
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
});
export default router;
