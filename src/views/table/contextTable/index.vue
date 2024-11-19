<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input  class="w-100" v-model="queryForm.keyword" placeholder="关键字搜索" />
      <el-button type="primary" :icon="Search"  @click="handleSearch">搜索</el-button>
      <el-button class="green-button"  :icon="Plus"  @click="handleSearch">增加</el-button>
      <el-button class="green-button"  :icon="Plus"  @click="refreshTableInfo">刷新</el-button>
    </div>
    <div class="table-con">
      <el-table
          v-loading="loading"
          :data="tableData"
          style="width: 100%"
          row-key="id"
          @row-contextmenu="handleRowContextmenu"
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
    <div>
      <context-menu
          v-model:show="show"
          :options="optionsComponent"
      >
        <context-menu-item label="操作1" @click="onMenuClick(1)" />
        <context-menu-group label="操作2">
          <context-menu-item label="Item1" @click="onMenuClick(2)" />
          <context-menu-item label="Item2" @click="onMenuClick(3)" />
          <context-menu-group label="Child with v-for 8">
            <context-menu-item v-for="index of 6" :key="index" :label="'Item3-'+index" @click="onLoopMenuClick(index)" />
          </context-menu-group>
        </context-menu-group>
        <context-menu-item label="刷新" @click="onMenuClick(1)">
          <template #icon>
            <Refresh style="width: 1em; height: 1em; margin-right: 8px" />
          </template>
        </context-menu-item>
        <context-menu-item label="删除" @click="onMenuClick(1)">
          <template #icon>
            <Delete style="width: 1em; height: 1em; margin-right: 8px" />
          </template>
        </context-menu-item>
      </context-menu>
    </div>
  </div>
</template>
<script setup  lang="ts">
import {reactive, ref} from 'vue'
import { Search,Plus } from '@element-plus/icons-vue'
import {useTable} from '@/hooks/useTable'
import tableApi from '@/api/table'
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'
//导入组件右键菜单组件
import { ContextMenu, ContextMenuGroup, ContextMenuItem } from '@imengyu/vue3-context-menu';
import type { MenuOptions } from '@imengyu/vue3-context-menu';
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
} = useTable(tableApi.packTableList,queryForm)

let show = ref(false)
const optionsComponent:MenuOptions = reactive({
  zIndex: 3,
  minWidth: 230,
  x: 500,
  y: 200
})
const handleRowContextmenu = (row:any, column:any, event:any)=>{
  console.log(row);
  console.log(column);
  console.log(event);
  event.preventDefault()
  show.value = true;
  optionsComponent.x = event.clientX;
  optionsComponent.y = event.clientY;
}
const onMenuClick = (num:number)=>{

}
const onLoopMenuClick = (index:number)=>{

}
</script>


<style scoped>
.w-100{
  width: 200px;
  margin-right: 5px;
}
</style>
