<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input  class="w-100" v-model="queryForm.keyword" placeholder="关键字搜索" />
      <el-button type="primary" :icon="Search"  @click="handleSearch">搜索</el-button>
      <el-button class="green-button"  :icon="Plus"  @click="handleSearch">增加</el-button>
      <el-button type="success"  :icon="Refresh"  @click="refreshTableInfo">刷新</el-button>
    </div>
    <div class="table-con">
      <el-table
          v-loading="loading"
          :data="tableData"
          style="width: 100%;"
          :max-height="tableHeight"
          row-key="id"
          border
      >
        <el-table-column prop="nickName" label="姓名"/>
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
import { Search,Plus,Refresh } from '@element-plus/icons-vue'
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
  tableHeight,
  handleSearch,//搜索
  refreshTableInfo,//刷新
} = useTable(tableApi.packTableList,queryForm)
</script>


<style scoped>
.w-100{
  width: 200px;
  margin-right: 5px;
}
</style>
