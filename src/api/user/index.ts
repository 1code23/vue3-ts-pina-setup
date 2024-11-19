import request from '@/utils/request'
export function login(data:object) {
    return request({
        url: '/system/login',
        method: 'post',
        data: data
    })
}
export function getIndex() {
    return request({
        url: '/system/index',
        method: 'post'
    })
}
