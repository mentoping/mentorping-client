import './assets/style/base.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.component('QuillEditor', QuillEditor);

app.mount('#app');
