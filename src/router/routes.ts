import { routeNames } from '@/enums';
import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/' + routeNames.GARAGE,
    alias: ['/' + routeNames.HOME, '/' + routeNames.GARAGE],
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/GaragePage.vue') }],
  },

  {
    path: '/' + routeNames.FINANCE,
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/FinancePage.vue') }],
  },

  {
    path: '/' + routeNames.MARKET,
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/MarketPage.vue') }],
  },

  {
    path: '/' + routeNames.GARAGE,
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/GaragePage.vue') }],
  },

  {
    path: '/' + routeNames.HISTORY,
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/HistoryPage.vue') }],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
