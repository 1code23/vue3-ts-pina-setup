import {reactive, onMounted, ref, nextTick} from 'vue'
import { useRoute, useRouter } from 'vue-router'
export function useTable(loadDataFunc: Function,queryForm: {}) {
    let loading = ref(true)
    let tableData = ref(new Array<any>())
    let total = ref(0)
    let tableHeight = ref("0px")
    const router = useRouter()
    const route = useRoute()
    const pagination = reactive({
        pageNum: 1,
        pageSize: 10
    })
    const getTableData = async () => {
        loading.value = true;
        getTableHeight(160,45)//获取表格的自适应高度
        const res = await loadDataFunc({...queryForm,...pagination})
        tableData.value = res.data.list;
        total.value = res.data.total
        loading.value = false;

    }
    const getTableHeight = (tabletop:number,tablebottom:number):void =>{
        const top:number = tabletop//el-table距离窗口顶部偏移量
        const bottom:number = tablebottom//
        const pageHeight:number = window.innerHeight//页面的高度
        if(document.getElementsByClassName("el-pagination").length>0){
            //判断页面有木有分页，来控制表格的高度自适应
            tableHeight.value = pageHeight - top - bottom + 'px'
        }else {
            tableHeight.value = pageHeight - top + 'px'
        }
    }
    onMounted(() => {
        getTableData()
    })
    // 搜索
    const handleSearch = () => {
        pagination.pageNum = 1
        getTableData()
    }
    const refreshTableInfo = () => {
        //刷新当前路由
        const { fullPath } = route
        nextTick(() => {
            router.replace({
                path: '/redirect' + fullPath
            })
        })
    }
    return {
        loading,
        tableData,
        total,
        pagination,
        getTableData,
        handleSearch,
        tableHeight,
        refreshTableInfo
    }
}
