import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import axios from 'axios'
import 'element-plus/dist/index.css'

const app =createApp(App)

// 全局axios
app.config.globalProperties.$http = axios

app.mount('#app')
app.use(ElementPlus)
