// 【自定义指令】v-debounce  防抖
// 说明：不断点击，仅执行最后一次操作

export default {
  mounted(el, binding, vnode) {
    let timer = {}
    el.addEventListener('click', () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        binding.value();
      }, 2000)
    })
  }
}