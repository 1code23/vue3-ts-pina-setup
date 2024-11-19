//表格配置json
import {TableOption} from "@/components/SpursTable/tableType.ts";
//局部过滤器
const getState = (state:any) =>{
    let txt = "";
    switch (state) {
        case 0:
            txt = "女";
            break;
        case 1:
            txt = "男";
            break;
    }
    return txt;
}
export const tableConfig: TableOption = {
    // 表格配置
    propList: [
        { prop: 'nickName', label: '姓名', minWidth: '100', align: 'left' },
        { prop: 'state', label: '性别', minWidth: '100', align: 'left',filter:getState},
        { prop: 'roleName', label: '权限名称', minWidth: '100', align: 'left' },
        { prop: 'userMoney.balanceMoney', label: '用户余额', minWidth: '100', align: 'left' },//获取表格list下一级的数据userMoney.balanceMoney
        { prop: 'title', label: '介绍', minWidth: '300', align: 'left' },
        { prop: 'phone', label: '联系方式', minWidth: '100', align: 'left' },
        { prop: 'address', label: '地址', minWidth: '100', align: 'left' },
        { prop: 'createTime', label: '日期', minWidth: '180', align: 'left'},
        {
            prop: 'state',
            label: '状态',
            minWidth: '100',
            slotName: 'state',
            align: 'left'
        },
        {
            label: '操作',
            minWidth: '120',
            slotName: 'handler',
            align: 'left'
        }
    ],
    // 表格具有序号列
    showIndexColumn: true,
    // 表格具有可选列
    showSelectColumn: true,
    //是否显示分页
    showPagination:true
}


