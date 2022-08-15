import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// 导入elementUI
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'




// createApp(App).mount('#app')
const app = createApp(App)

app.use(ElementPlus)
app.mount('#app')
