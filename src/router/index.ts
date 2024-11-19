import {createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout/index.vue'
//constantRoutes 静态路由 登陆，首页等。。。
export const constantRoutes = [
    {
        path: '/redirect',//解决刷新问题
        component: Layout,
        hidden: true,
        children: [
            {
                path: '/redirect/:path(.*)',
                component: () => import('@/views/redirect/index.vue')
            }
        ]
    },
    {
        path: "/",
        name: 'Dashboard',
        redirect: '/dashboard',
        meta: {
            title: '首页',
            icon: "House",
        },
        component: Layout,
        children: [
            {
                path: '/dashboard',
                component: () => import('@/views/dashboard/index.vue'),
                name: 'Dashboard',
                meta: { title: '首页', icon: 'dashboard', affix: true }
            }
        ]
    },
    {
        path: "/login",
        name: "Login",
        meta: {
            title: '登录'
        },
        component: () => import('@/views/user/login/index.vue'),
        hidden: true
    },
    // {
    //     path: "/test",
    //     name: "Test",
    //     meta: {
    //         title: '测试'
    //     },
    //     component: () => import('@/views/test/test6.vue'),
    //     hidden: true
    // },
    {
        path: '/:pathMatch(.*)*',// 此写法解决动态路由页面刷新的 warning 警告
        component: () => import('@/views/user/error-page/404.vue'),
        hidden: true
    },
]
//动态路由 asyncRoutes
export const asyncRoutes = [];
const router = createRouter({
    history: createWebHashHistory(),// hash模式,history是createWebHistory(地址栏不带#)，hash是createWebHashHistory（地址栏带#）
    routes: constantRoutes
})
export default router
// 1. 定义路由组件.
// 也可以从其他文件导入
// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
