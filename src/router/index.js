import { createRouter, createWebHistory } from 'vue-router';

import HomePage from '../views/HomePage.vue';
import ServicesPage from '../views/ServicesPage.vue';
import GalleryPage from '../views/GalleryPage.vue';

const routes = [
    { path: '/', component: HomePage },
    { path: '/services', component: ServicesPage },
    { path: '/gallery', component: GalleryPage },
    { path: '/offers', component: () => import('../views/OffersPage.vue') },
    { path: '/admin', component: () => import('../views/AdminPage.vue') },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: 'router-link-active',
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        }
        if (to.hash) return { el: to.hash, top: 24 };
        return {top: 0};
    }
});

export default router;
