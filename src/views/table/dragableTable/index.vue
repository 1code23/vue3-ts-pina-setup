<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input  class="w-100" v-model="queryForm.keyword" placeholder="关键字搜索" />
      <el-button type="primary" :icon="Search"  @click="handleSearch">搜索</el-button>
      <el-button class="green-button"  :icon="Plus"  @click="handleSearch">增加</el-button>
      <el-button class="green-button"  :icon="Plus"  @click="getDragableData">查看排序后的数据</el-button>
    </div>
    <div class="table-con">
      <el-table
          v-dragable="dragOptions"
          v-loading="loading"
          :data="tableData"
          style="width: 100%"
          row-key="id"
          border
      >
        <el-table-column prop="nickName" label="姓名"/>
        <el-table-column label="排序" align="center" width="55">
          <template #default>
            <DCaret style="width: 1em; height: 1em; margin-right: 8px;cursor: all-scroll;margin-top: 5px"/>
          </template>
        </el-table-column>
        <el-table-column prop="roleName" label="权限名称"/>
        <el-table-column prop="title" label="介绍"/>
        <el-table-column prop="phone" label="联系方式"/>
        <el-table-column prop="address" label="地址"/>
        <el-table-column prop="createTime" label="日期"/>
        <el-table-column fixed="right" label="操作" width="120">
          <template #default>
            <el-button link type="primary" size="small">修改</el-button>
            <el-button link size="small">删除</el-button>

          </template>
        </el-table-column>
      </el-table>
    </div>
    <Pagination
        v-model:page="pagination.pageNum"
        v-model:size="pagination.pageSize"
        :total="total"
        @pagination="getTableData"
    />
  </div>
</template>
<script setup  lang="ts">
import {reactive} from 'vue'
import { Search,Plus } from '@element-plus/icons-vue'
import {useTable} from '@/hooks/useTable'
import tableApi from '@/api/table'
import { vDragable  } from "element-plus-table-dragable";
const queryForm = reactive({
  keyword: ''
})
const {
  tableData,
  pagination,
  total,
  loading,
  getTableData,
  handleSearch,//搜索
} = useTable(tableApi.packTableList,queryForm)
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
        const copyRow = JSON.parse(JSON.stringify(tableData.value[evt.oldIndex]));//拷贝拖动的一行数据存起来
        tableData.value.splice(evt.oldIndex, 1);//删除拖动的一行数据
        tableData.value.splice(parseInt(evt.newIndex), 0, copyRow);//插入到拖动的位置

      },
    },
  },
]
const  getDragableData = () =>{
  console.log(tableData.value);

}
</script>


<style scoped>
.w-100{
  width: 200px;
  margin-right: 5px;
}
</style>
