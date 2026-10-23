import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import reveal from './directives/reveal';
import { loadContent } from './lib/content';

const app = createApp(App);

app.directive('reveal', reveal);
app.use(router);
app.mount('#app');

loadContent().catch(() => { /* Keep bundled content available during an outage. */ });
