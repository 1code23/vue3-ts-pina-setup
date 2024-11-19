
//binding（DirectiveBinding）：一个包含指令信息的对象。（例如：包含指令的名称、值、参数等等）
import {App, DirectiveBinding} from "vue";
export default (app: App) => {
    // 节流 防止按钮多次点击，多次请求
    app.directive("throttle", {
        mounted(el: HTMLElement | any, binding: DirectiveBinding) {
            const time = binding.value ? binding.value : 2000
            el.timer = null
            el.addEventListener('click', () => {
                //console.log(binding);
                el.disabled = true
                if (el.timer !== null) {
                    clearTimeout(el.timer)
                    el.timer = null
                    el.disabled = true
                }
                el.timer = setTimeout(() => {
                    el.disabled = false
                }, time)
            })
        }
    })
    // 输入框防抖
    app.directive("debounce", {
        mounted(el: HTMLElement | any, binding: DirectiveBinding) {
            const time = binding.value.time ? binding.value.time : 1000//binding.value.time这是输入框传过来的时间
            const func = binding.value ? binding.value.func : null//binding.value.func 这是输入框传过来的方法
            el.timer = null
            el.addEventListener('input', () => {
                //console.log(binding);
                if (el.timer !== null) {
                    clearTimeout(el.timer)
                    el.timer = null
                }
                el.timer = setTimeout(() => {
                    func && func()
                }, time)
            })
        }
    })
    //表格可视区域内滚动
    app.directive("allheight", {
        mounted(el: HTMLElement | any, binding: DirectiveBinding) {
            const top:number = el.offsetTop//el-table距离窗口顶部偏移量
            const bottom:number = binding?.value?.bottom ? binding.value.bottom : 65//底部预留的高度 默认高度52
            const pageHeight:number = window.innerHeight//页面的高度
            el.style.height = pageHeight - top - bottom-90 + 'px'
        }
    })

}

