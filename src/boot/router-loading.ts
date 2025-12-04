import { boot } from 'quasar/wrappers';

export default boot(({ router, app }) => {
  const $q = app.config.globalProperties.$q;

  router.beforeEach((to, from, next) => {
    $q.loading.show();

    setTimeout(() => next(), 300);
  });

  router.afterEach(() => {
    $q.loading.hide();
  });
});
