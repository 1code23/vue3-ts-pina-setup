import router from './router/index'
import { useUserStore } from '@/store/user'
import { usePermissionStore } from '@/store/permission'
import {getToken} from '@/utils/storage.ts'
import NProgress from 'nprogress'
import'nprogress/nprogress.css'
NProgress.configure({ showSpinner: false }) // NProgress Configuration
const whiteList = ['/login','/test'] // 白名单
router.beforeEach(async (to) => {
    NProgress.start();
    document.title = `${to.meta.title} | Spurs-Admin`
    const hasToken = getToken('Access-Token')
    const userStore = useUserStore()
    const permissionStore = usePermissionStore()
    if (hasToken) {//判断token是否存在 存在即为已经登录
        if (to.path !== "/login") {
            if (userStore.init) { // 获取了动态路由 init一定true,就无需再次请求 直接放行
                return true
            }else {
                // init为false,一定没有获取动态路由,就跳转到获取动态路由的方法
                const result:any = await userStore.getInfo() //获取路由
                const accessRoutes:any = await permissionStore.generateRoutes(result.menus) //解析路由,存储路由
                // console.log("accessRoutes",accessRoutes);
                // 动态挂载路由
                accessRoutes.forEach((route:any) => {
                    router.addRoute(route)
                })
                userStore.init = true//init改为true,路由初始化完成
                return { ...to, replace: true }// hack方法 确保addRoute已完成

            }
        }else {
            NProgress.done()
            return '/'
        }

    }else {
        // 白名单，直接放行
        if (whiteList.indexOf(to.path) > -1) return true
        // 非白名单，去登录
        else return '/login'
        NProgress.done()
    }
})
router.afterEach(() => {
    // finish progress bar
    NProgress.done()
})
// 1. 在路由钩子里面判断是否首次进入系统(permission.ts)
// 2. init为true说明已经获取过路由,就直接放行,init为false则向后台请求用户路由
// 3. 获取路由
// 4. 解析路由,存储权限
// 5. 使用router的api,addRouter拼接路由
// 6. 存储路由
// 7. init改为true,路由初始化完成
// 8. 放行路由
