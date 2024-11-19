<!-- 分页el-pagination 二次封装 -->
<template>
  <div v-show="total>0" class="pagination-con">
    <el-pagination
        v-model:current-page="curPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 40, 50]"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
    />
  </div>
</template>
<script setup name="Pagination" lang="ts">
import { computed} from 'vue'
const props = defineProps({
  page: { type: Number, default: 1 },
  size: { type: Number, default: 10 },
  total: { type: Number, default: 0 }
})
// 1、在子组件中调用defineEmits并定义要发射给父组件的方法
// 2、使用defineEmits会返回一个方法，使用一个变量emit(变量名随意)去接收
// 3、在子组件要触发的方法中，调用emits并传入发射给父组件的方法以及参数
const emit = defineEmits(['update:size', 'update:page', 'pagination'])
// console.vlog(emit)
const pageSize = computed({
  get: () => props.size,
  set: (val) => {
    emit('update:size', val)
  }
})
const curPage = computed({
  get: () => props.page,
  set: (val) => {
    emit('update:page', val)
  }
})
function handleSizeChange() {
  emit('pagination')
}

function handleCurrentChange() {
  emit('pagination')
}
</script>


<style scoped>
.pagination-con{
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
