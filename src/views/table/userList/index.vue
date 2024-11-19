<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input  class="w-100" v-model="queryForm.keyword" placeholder="关键字搜索" />
      <el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button>
      <el-button class="green-button" @click="refreshTableInfo"  :icon="Plus">刷新</el-button>
      {{$filters.getTime('2023-11-23 00:00:00.000')}}
    </div>
    <div v-dragable="dragOptions" class="table-con">
      <spurs-table
          ref="spursTableRef"
          v-bind="tableConfig"
          :queryForm="queryForm"
          :requestApi="getTableList"
          @selection-change="handleSelectionChange"
      >
        <template #state="scope">
          <el-tag type="warning" v-if="scope.row.state === 0">禁用</el-tag>
          <el-tag v-else>启用</el-tag>
        </template>
        <template #handler="scope">
         <el-button
           size="small"
           :icon="Edit"
           link
           @click="handleEditClick(scope.row)"
           >编辑</el-button
           >
         <el-button
           size="small"
           :icon="Delete"
           type="warning"
           link
           @click="deleteBtnClick(scope.row)"
           >删除</el-button>
         </template>
      </spurs-table>
    </div>

  </div>
</template>
<script setup  lang="ts">
import {reactive,ref} from 'vue'
import { Search,Plus,Delete,Edit } from '@element-plus/icons-vue'
import { tableConfig } from './tableConfig.ts'// 引入配置
import SpursTable from '@/components/SpursTable/index.vue'
import tableApi from '@/api/table'
import { vDragable  } from "element-plus-table-dragable";
const queryForm = reactive({
  keyword: ''
})
const getTableList = (params: any) => {
  return tableApi.packTableList(params);
};
const spursTableRef = ref <any> ()
const multipleSelection = ref<any>([])
const handleSelectionChange = (val:[]) => {
  multipleSelection.value = val
  console.log(multipleSelection.value);
}

const handleSearch =  () => {
  // 搜索
  spursTableRef.value.handleSearch();
  console.log(spursTableRef.value.tableData);
  // spursTable.value.tableData[0].nickName = "测试"
}
const refreshTableInfo = () => {
  // 刷新把queryForm置空
  queryForm.keyword="";
  spursTableRef.value.refreshTableInfo();
}
const dragOptions = [
  {
    selector: "tbody", // css选择器的字符串，定义哪些列表单元可以进行拖放
    option: {
      animation: 150,//number 单位：ms，定义排序动画的时间；
      onEnd: (evt:any) => {//function 列表单元拖放结束后的回调函数
        console.log(evt);
        const itemEl = evt.item;  // dragged HTMLElement
        console.log(itemEl);
        console.log("222",evt.oldIndex, evt.newIndex);
        // const copyRow = JSON.parse(JSON.stringify(spursTableRef.value.tableData[evt.oldIndex]));//拷贝拖动的一行数据存起来
        // spursTableRef.value.tableData.splice(evt.oldIndex, 1);//删除拖动的一行数据
        // spursTableRef.value.tableData.splice(parseInt(evt.newIndex), 0, copyRow);//插入到拖动的位置

      },
    },
  },
]

const handleEditClick = (row: any) => {
  console.log('点击了编辑按钮，数据为：', row)
  // getTableData();
}
// 点击删除按钮触发事件
const deleteBtnClick = (row: any) => {
  console.log('点击了删除按钮，数据为：', row)
}
</script>


<style scoped>
.w-100{
  width: 200px;
  margin-right: 5px;
}
</style>
