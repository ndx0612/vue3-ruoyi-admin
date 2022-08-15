// 【自定义指令】v-color  随机颜色

export default {
  beforeMount(el, bindings, vnode, preVnode) {
    el.style.color = "#" + Math.random().toString(16).slice(2, 8);
  }
}