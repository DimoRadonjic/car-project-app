import { routeNames } from 'src/enums/enums';
import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: routeNames.HOME,
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },

  {
    path: routeNames.FINANCE,
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/FinancePage.vue') }],
  },

  {
    path: routeNames.MARKET,

    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/MarketPage.vue') }],
  },

  {
    path: routeNames.GARAGE,

    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/GaragePage.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
