<template>
  <div class="simple-dialog">
    <el-button @click="spursDialogRef.dialogVisible = true">打开dialog</el-button>
    <el-button @click="spursDialogRef3.dialogVisible = true">打开第二个dialog</el-button>

    <spurs-dialog
        ref="spursDialogRef"
        :title="title"
        width="900"
        @saveSubmit="saveSubmit"
    >
      <template #body>
        <span>我是dialog111</span>
        <br>
        <el-button @click="spursDialogRef2.dialogVisible = true">打开内层 Dialog</el-button>
        <spurs-dialog
            ref="spursDialogRef2"
            :title="title"
            @saveSubmit="saveSubmitInner"
        >
          <template #body>
            <span>我是内层 Dialog222222222</span>
          </template>
        </spurs-dialog>
      </template>
      <template #footer>
        <el-button type="success" @click="spursDialogRef.dialogVisible = true">我是操作2</el-button>
      </template>
    </spurs-dialog>
    <spurs-dialog
        ref="spursDialogRef3"
        :title="title"
        :dialogType="dialogType"
        @saveSubmit="saveSubmit"
    >
      <template #body>
        <span>我是Dialog222222222</span>
      </template>
    </spurs-dialog>

  </div>
</template>
<script setup lang="ts">
import {ref} from "vue";
let dialogType = ref('readonlyDialog')
let title = ref('提示')
const spursDialogRef = ref <any> ()
const spursDialogRef2 = ref <any> ()
const spursDialogRef3 = ref <any> ()
const saveSubmit = () => {
  console.log("点击了确定按钮")
}
const saveSubmitInner = () => {
  console.log("点击了内层确定按钮")
}
</script>
<style scoped>

</style>
