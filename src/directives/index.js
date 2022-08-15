import color from "./modules/color"
import draggable from "./modules/draggable"
import waves from "./modules/waves/index"
import debounce from "./modules/debounce"
import copy from "./modules/copy"
import longpress from "./modules/longpress"
import throttle from "./modules/throttle"

export default function (app) {
  app.directive('draggable', draggable) // 拖拽
  app.directive('debounce', debounce) // 防抖
  app.directive('color', color) // 随机颜色
  app.directive('waves', waves) // 按钮水波纹效果
  app.directive('copy', copy) // 复制?????
  app.directive('throttle', throttle) // 节流?????
}
