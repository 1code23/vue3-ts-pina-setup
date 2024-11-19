<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input class="w-100" v-model="queryForm.keyword" placeholder="关键字搜索"/>
      <el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button>
      <el-button class="green-button" :icon="Plus" @click="handleSearch">增加</el-button>
      <el-button class="green-button"  :icon="Plus"  @click="getDragableData">查看排序后的数据</el-button>
    </div>
    <div class="table-con">
      <el-table
          @cell-dblclick="doubleClickCell"
          v-loading="loading"
          :data="tableData"
          style="width: 100%"
          row-key="id"
          @current-change="close"
          border
      >
        <el-table-column prop="nickName" label="姓名">
          <template #default="{row}">
            <el-input v-if="row.edit==1" v-model="row.nickName"></el-input>
            <span v-else>{{ row.nickName }}</span>
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
<script setup lang="ts">
import {reactive, onUpdated} from 'vue'
import {Search, Plus} from '@element-plus/icons-vue'
import {useTable} from '@/hooks/useTable'
import tableApi from '@/api/table'

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
  refreshTableInfo,//刷新
} = useTable(tableApi.packTableList, queryForm)
/** 添加上一个状态值控制是否可编辑 */

onUpdated(() => {
  for (let i = 0; i < tableData.value.length; i++) {
    tableData.value[i].edit = 0
  }
})
const close = (currentRow:any, oldCurrentRow:any) => {
  console.log(currentRow);
  console.log(oldCurrentRow);
  if(oldCurrentRow!==null){
    oldCurrentRow.edit=0
  }
}
console.log("12121", tableData.value);
const doubleClickCell = (row: any) => {
  console.log("111", tableData.value);
  row.edit=1
}
const  getDragableData = () =>{
  console.log(tableData.value);
}
</script>


<style scoped>
.w-100 {
  width: 200px;
  margin-right: 5px;
}
</style>
