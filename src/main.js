import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css'
import Vant from 'vant'
import 'vant/lib/index.css'
import '@/assets/style/public.scss'
import '@/assets/style/iconfont.css'

createApp(App).use(store).use(router).use(Vant).mount('#app')
