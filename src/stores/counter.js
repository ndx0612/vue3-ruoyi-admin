import { defineStore } from 'pinia'

export const useCounterStore = defineStore({
    id: 'counter',
    state: () => ({
        counter: 0,
    }),
    // 计算属性
    getters: {
        // doubleCount: (state) => state.counter * 2
    },
    // 相当于函数
    actions: {
        // increment() {
        //   this.counter++
        // }
    }
})
