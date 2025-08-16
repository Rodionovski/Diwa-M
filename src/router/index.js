import { createRouter, createWebHistory } from 'vue-router';

import HomePage from '../views/HomePage.vue';
import ServicesPage from '../views/ServicesPage.vue';
import GalleryPage from '../views/GalleryPage.vue';

const routes = [
    { path: '/', component: HomePage },
    { path: '/services', component: ServicesPage },
    { path: '/gallery', component: GalleryPage },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: 'router-link-active',
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        }
        return {top: 0};
    }
});

export default router;
