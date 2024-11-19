import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useUserStore } from '@/store/user'
import {getToken} from "@/utils/storage";

// console.log(import.meta.env.VITE_BASE_URL);
//创建实例 设置参数
const service = axios.create({
    headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},//设置请求头
    transformRequest: [function (data) { //表示允许在向服务器发送前，修改请求数据 对 data 进行任意转换处理
        if (typeof data === 'object') {
            let ret = []
            for (let it in data) {
                ret.push(encodeURIComponent(it) + '=' + encodeURIComponent(data[it]))
            }
            return ret.join('&')
        } else return data
    }],
    baseURL: import.meta.env.VITE_BASE_URL,// 域名配置
    withCredentials: true, // 跨域请求时是否需要使用凭证
    timeout: 30000 // 请求超时时间
})
// 请求拦截器
service.interceptors.request.use(
    config => {
        const userStore = useUserStore()
        if (userStore.token) {
            // console.log(getToken());
            config.headers['X-Token'] = getToken('Access-Token');
        }
        return config
    },
    error => {
        console.log(error) // for debug
        return Promise.reject(error)
    }
)
// 响应拦截器
service.interceptors.response.use(
    response => {
        const res = response.data
        // if the custom code is not 20000, it is judged as an error.
        if (res.httpCode !== 200 && res.httpCode!=undefined) {
            ElMessage({
                message: res.msg || res.data,
                type: 'error',
                duration: 5 * 1000,
                showClose: true,
            })
            if (res.httpCode === 403 || res.httpCode === 402 || res.httpCode === 50014) {
                // to re-login
                ElMessageBox.confirm('您已注销，可以取消以留在此页，或重新登录', '确认？', {
                    confirmButtonText: '重新登录',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    location.reload()
                })
            }
            return Promise.reject(res)
        } else {
            return res
        }
    },
    error => {
        console.log('err' + error) // for debug
        return Promise.reject(error)
    }
)

export default service

