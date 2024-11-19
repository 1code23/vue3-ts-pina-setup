import request from '@/utils/request'

export default {
//获取表格数据
    packTableList(data:any) {
        return request({
            url: '/table/packTable',
            method: 'post',
            params: data
        })
    },
}
