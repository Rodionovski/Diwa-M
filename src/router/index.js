import { createRouter, createWebHistory } from 'vue-router';

import HomePage from '../views/HomePage.vue';
import ServicesPage from '../views/ServicesPage.vue';
import GalleryPage from '../views/GalleryPage.vue';
import EmployeesPage from '../views/EmployeesPage.vue';
import ContactsPage from '../views/ContactsPage.vue';

const routes = [
    { path: '/', component: HomePage },
    { path: '/services', component: ServicesPage },
    { path: '/gallery', component: GalleryPage },
    { path: '/employees', component: EmployeesPage },
    { path: '/contacts', component: ContactsPage }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: 'router-link-active',
});

export default router;
