import request from '@/utils/request'

export default {
//获取菜单管理列表
    getMenuList(data) {
        return request({
            url: '/system/getMenuList',
            method: 'post',
            params: data
        })
    },
}
