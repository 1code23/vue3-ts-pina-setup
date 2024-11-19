<template>
  <div class="spurs-dialog">
    <el-dialog
        v-bind="$attrs"
        v-model="dialogVisible"
        :append-to-body="true"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        draggable
        >
      <slot name="body"></slot>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible=false">取消</el-button>
        <el-button  v-if="dialogType!='readonlyDialog'" type="primary" @click="saveSubmit">
          确 定
        </el-button>
         <slot name="footer"></slot>
      </span>
      </template>

    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import {ref} from "vue";
let dialogVisible = ref(false)
defineExpose({
  dialogVisible
})
const props = defineProps({
  dialogType: {type:String, default:""}//默认有确定和取消readonlyDialog展示dialog只有取消
});
const close = () =>{
  dialogVisible.value = false
}
const emit = defineEmits(['saveSubmit'])
const saveSubmit = () => {
  emit('saveSubmit');
}
</script>

<style scoped>

</style>
