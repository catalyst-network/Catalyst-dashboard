
const routes = [
  {
    path: '/',
    component: () => import('layouts/Dashboard.vue'),
    children: [
      { path: '', component: () => import('pages/Main') },
    ],
  },
  {
    path: '/setup',
    component: () => import('layouts/NoSidebar.vue'),
    children: [
      { path: '', component: () => import('pages/Setup') },
    ],
  },
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue'),
  });
}

export default routes;
