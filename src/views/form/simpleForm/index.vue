<template>
  <div class="role-form">
    <spurs-form
        ref="spursFormRef"
        v-bind="formConfig"
        :modelValue="modelValue"
        :rules="rules"
    >
      <template #header>
        <div class="header">
          <h1>我是头部</h1>
        </div>
      </template>
      <template #special>
        <div class="special">
          我是自定义内容
        </div>
      </template>
      <template #special2>
        <div class="special2">
          我是自定义内容2
        </div>
      </template>
      <template #footer>
          <el-button type="primary"  @click="submitForm(spursFormRef.ruleFormRef)">确 定</el-button>
          <el-button  @click="resetClick">取 消</el-button>
      </template>
    </spurs-form>
  </div>
</template>

<script setup lang="ts">
import SpursForm from '@/components/SpursForm/index.vue'
import {onMounted, reactive, ref} from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import {formConfig} from './formConfig'
const modelValue = reactive({
  id: '12',
  account: '用户名1',
  realname: '张三',
})
// console.log(formConfig.formItems[4].options);
onMounted(() => {
  // formConfig.formItems[4].options = [];
  // console.log("222",formConfig);
})
const spursFormRef = ref <any> ()
const rules = reactive<FormRules>({
  id: [
    { required: true, message: '请输入活动名称', trigger: 'blur' },
    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
  ],
  createAt: [
    { required: true, message: '请选择日期', trigger: 'blur' }
  ]
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}
// 重置按钮触发
const resetClick = () => {
  formConfig.formItems[4].options = [];
  console.log(formConfig);
  console.log(modelValue);
}

</script>

<style scoped>
.role-form{
  width: 800px;
}
.header {
  padding-top: 20px;
}
</style>



