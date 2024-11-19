import {defineStore} from 'pinia'
import {constantRoutes} from '@/router'
import Layout from '@/layout/index.vue'
const modules = import.meta.glob('@/views/**/**.vue')
interface RoutesItem {
    path: string,
    name: string,
    meta: {
        title: string,
        icon: string
        keepAlive: boolean  // 是否使用 keep-alive
    },
    component: object | null,
    children?:Object[]| null
}
// console.log(modules);
export const filterAsyncRoutes = (routerList:any) => {
    //进行递归解析
    //testData 后端获取的路由
    const res:Object[] = []
    // console.log(testData);
    routerList.forEach((e:any) => {
        // console.log(e.component);
        let e_new:RoutesItem = {
            path: e.url,
            name: e.name,
            meta: {
                title: e.menuName,
                icon: e.icon,
                keepAlive: true  // 是否使用 keep-alive
            },
            component: null,

        }
        if (e.menuType === 'M') {
            // @ts-ignore
            e_new.component = Layout
        }else {
            // console.log("22222",e.url);
            // @ts-ignore
            e_new.component = modules[`/src/views${e.url}/index.vue`]
        }
        // console.log(e_new);
        if (e.children && e.children!=null) {
            const children:any = filterAsyncRoutes(e.children)
            // 保存权限
            e_new = { ...e_new, children: children }
        }

        res.push(e_new)
    })
    // console.vlog("111",res);
    return res
}

export const usePermissionStore = defineStore('permission', {
    state: () => {
        return {
            routes: new Array<any>(),//全部路由
            addRoutes: new Array<any>()//后端增加的路由
        }
    },
    actions: {
        generateRoutes(routes:any) {
            // console.log(routes);
            let routerList = JSON.parse(JSON.stringify(routes))
            // console.log(routerList);
            return new Promise((resolve) => {
                const accessedRoutes:any = filterAsyncRoutes(routerList)
                // console.log(accessedRoutes);
                this.addRoutes = accessedRoutes
                // console.log("111",accessedRoutes);
                this.routes = constantRoutes.concat(accessedRoutes)
                resolve(accessedRoutes)
            })

        }
    }
})
