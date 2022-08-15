import HelloWorld from "./HelloWorld.vue"
import GlobalTable from "./GlobalTable.vue"
import selectDept from "./select-dept.vue"
const globalComponents = [
  HelloWorld,
  GlobalTable,
  selectDept,
]
export default {
  install(app) {
    // 此处形参为main.js文件中use()方法自动传进来的Vue实例
    globalComponents.forEach((v) => {
      app.component(v.name, v)
    })
  },
}
