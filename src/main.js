import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from "./router/index"
import axios from './http/index.js'
import myGlobalComponents from "./components/index" // components组件
import * as ELIcons from "@element-plus/icons-vue"
import util from "./utils/index"
import { createPinia } from 'pinia'
import directives from "./directives/index.js"
import locale from 'element-plus/lib/locale/lang/zh-cn' //中文
import 'element-plus/theme-chalk/dark/css-vars.css'


const app = createApp(App)
// 导入element的icon库
for (let iconName in ELIcons) {
  app.component(iconName, ELIcons[iconName])
}
app.config.globalProperties.$axios = axios; //配置axios的全局引用

app.config.globalProperties.util = util; // 配置全局util函数(方法)

app.use(directives)
app.use(router)
app.use(ElementPlus, { locale })
app.use(myGlobalComponents) // 组件全局化
app.use(createPinia())
app.mount('#app')