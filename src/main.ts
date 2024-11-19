import { createApp } from 'vue' //引入vue
const app = createApp(App)// 创建vue实例
import App from './App.vue'//引入入口组件
import router from './router/index'// 引入路由
import ElementPlus from 'element-plus'//引入element-plus
import 'element-plus/dist/index.css'//引入element-plus样式
import './assets/style/style.scss'//引入全局样式
import "@/permission.ts"//路由钩子权限
import * as ElementPlusIconsVue from '@element-plus/icons-vue'//引入element-plus图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}// 全局导入plus图标

import directive from "@/directive/index";// 引入全局自定义指令
app.use(directive);//注册全局自定义指令

import * as filters from "@/utils/filters.ts";//引入全局过滤器
app.config.globalProperties.$filters =filters//注册全局过滤器

import vlog from '@/utils/vue-awesome-console.ts'//解决console.log打印出对象的问题 自己用的
// 你可以选择将 vlog 方法挂在 console 对象上，然后像使用 console.log 一样使用 console.vlog
// 同时你也可以根据项目中的开发/生产模式，进行不同的使用方式
if (process.env.NODE_ENV === 'development') {
    // @ts-ignore
    window.console.vlog = vlog
} else {
    // @ts-ignore
    window.console.vlog = () => {}
}
import Pagination from '@/components/Pagination/index.vue'//引入分页组件
app.component('Pagination', Pagination)//注册分页
import SpursDialog from '@/components/SpursDialog/index.vue'//引入dialog组件
app.component('SpursDialog', SpursDialog)//注册dialog
import {createPinia} from 'pinia'//(读音：皮尼亚)引入状态管理
const pinia = createPinia()// 创建pinia实例
app.use(router)// 注册路由
app.use(ElementPlus)// 注册element-plus
app.use(pinia)// 注册状态管理
app.mount('#app')// 挂载vue实例

