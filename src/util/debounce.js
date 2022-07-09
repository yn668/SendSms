import { customRef } from 'vue'

export function useDebounced(value, delay = 300, callback) {
    let timer = null
    return customRef((track, trigger) => {
        return {
            get() {
                track() // 告诉vue追踪数据
                return value
            },
            set(newValue) {
                if (timer) {
                    clearTimeout(timer)
                }
                timer = setTimeout(() => {
                    value = newValue
                    callback(newValue)
                    trigger() // 告诉vue更新视图
                }, delay);
            }
        }
    })
}