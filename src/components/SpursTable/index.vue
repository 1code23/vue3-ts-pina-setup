<template>
  <el-table
      ref="tableRef"
      style="width: 100%"
      v-loading="loading"
      :data="tableData"
      border
      v-bind="$attrs"
  >
   <!-- 1.传入showSelectColumn时展示的全选列 -->
   <template v-if="showSelectColumn">
    <el-table-column type="selection" />
   </template>
   <!-- 2.传入showIndexColumn时展示的序号列 -->
   <template v-if="showIndexColumn">
    <el-table-column type="index" label="#" />
   </template>
   <!-- 3.propList里面的所有列 -->
   <template v-for="item in propList" :key="item.prop">
    <el-table-column v-bind="item" show-overflow-tooltip>
     <!-- 传有slotName时展示的插槽列 -->
      <template #default="scope" v-if="item.filter">
        {{item.filter(scope.row[`${item.prop}`])}}
      </template>
     <template #default="scope" v-if="item.slotName">
      <slot :name="item.slotName" :row="scope.row"></slot>
     </template>
    </el-table-column>
   </template>
  </el-table>
  <Pagination
      v-if="showPagination"
      v-model:page="pagination.pageNum"
      v-model:size="pagination.pageSize"
      :total="total"
      @pagination="getTableData"
  />
</template>
<script setup lang="ts">
import {withDefaults} from 'vue'
import {ColumnOption} from "@/components/SpursTable/tableType.ts";
import {useTable} from '@/hooks/useTable.ts'

interface Props {
  requestApi: Function // 请求表格数据的 api的axios方法 ==> 必传
  queryForm?:any
  propList: ColumnOption[] //表格行el-table-column配置项
  showIndexColumn?: boolean //是否显示索引列
  showSelectColumn?: boolean //是否显示全选列
  showPagination?: boolean //是否显示分页
  childrenProps?: object // 是否有子数据，树形数据才用得到
}
const props = withDefaults(defineProps<Props>(), {
  showIndexColumn: false,
  showSelectColumn: false,
  showPagination: false,
  childrenProps: () => ({})
})

const {
  tableData,
  pagination,
  total,
  loading,
  getTableData,
  handleSearch,//搜索
  refreshTableInfo//刷新
} = useTable(props.requestApi,props.queryForm)

defineExpose({
  tableData,
  handleSearch,
  refreshTableInfo
})
// console.log(props);
</script>
<style scoped></style>

