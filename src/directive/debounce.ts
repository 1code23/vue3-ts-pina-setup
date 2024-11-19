// 输入框节流
import { App, DirectiveBinding } from "vue";
// 输入框防抖
export default (app: App) => {
    app.directive("debounce", {
        mounted(el: HTMLElement | any, binding: DirectiveBinding) {
            const func = binding.value?binding.value.func : null//binding.value.func 这是输入框传过来的方法
            el.timer = null

            el.addEventListener('input', () => {
                console.log(binding);
                if (el.timer !== null) {
                    clearTimeout(el.timer)
                    el.timer = null
                }
                el.timer = setTimeout(() => {
                    func && func()
                }, 1000)
            })
        }
    })

}
