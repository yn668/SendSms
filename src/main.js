import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';
import './assets/stylesheets/iconfont'
import './assets/stylesheets/init_style.css'
const app =  createApp(App)
app.use(router).use(store).use(Vant).mount('#app')