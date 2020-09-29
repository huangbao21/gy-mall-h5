import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import useVantComponent from '@/vant-component';

const app = createApp(App);
useVantComponent(app);
app.use(store).use(router).mount('#app')
