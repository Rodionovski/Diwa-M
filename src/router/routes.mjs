export const routes = [
  { path: '/', name: 'home', component: () => import('../views/HomePage.vue') },
  { path: '/services', name: 'services', component: () => import('../views/ServicesPage.vue') },
  { path: '/gallery', name: 'gallery', component: () => import('../views/GalleryPage.vue') },
  { path: '/offers', name: 'offers', component: () => import('../views/OffersPage.vue') },
  { path: '/admin', name: 'admin', component: () => import('../views/AdminPage.vue') },
];
