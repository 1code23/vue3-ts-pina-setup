<template>
  <div class="login-wrap" :style="{background: 'url(' + Bg2 + ') no-repeat 30%' }">
    <div class="login-form">
      <div class="login-tit">Spurs-Admin</div>
      <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
          label-width="0px"
          class="demo-ruleForm"
          size="large"
      >
        <el-form-item prop="loginName">
          <el-input  size="large" :prefix-icon="User" placeholder="账号:admin" v-model="ruleForm.loginName" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" size="large" placeholder="密码:123456" @keyup.enter.native="submitForm(ruleFormRef)" :prefix-icon="Lock"  v-model="ruleForm.password" />
        </el-form-item>
        <el-form-item>
          <el-button :loading="state.loading" style="width: 100%" type="primary" @click="submitForm(ruleFormRef)">
            登 录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive,ref} from 'vue'
import { Lock, User } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'
import Bg2 from '@/assets/background.svg'
import { useUserStore } from '@/store/user'
import { useRouter } from 'vue-router'
const router = useRouter()
// reactive 函数通常定义：复杂类型的响应式数据
// reactive 可以转换对象成为响应式数据对象，但是不支持简单数据类型。
// ref 可以转换简单数据类型为响应式数据对象，也支持复杂数据类型，但是操作的时候需要 .value 。
// 它们各有特点，现在也没有最佳实践，没有明显的界限，所有大家可以自由选择。
// 如果能确定数据是对象且字段名称也确定，可使用 reactive 转成响应式数据，其他一概使用 ref 。这样就没有 心智负担 。
const ruleFormRef = ref<FormInstance>()
const state = reactive({
  loading:false
})
const ruleForm = ref({
  loginName: '',
  password: '',
})
const rules = reactive<FormRules>({
  loginName: [
    {required: true, message: '请输入登录账号', trigger: 'blur'}
  ],
  password: [
    {required: true, message: '密码不能为空', trigger: 'blur'}
  ],
})
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async(valid, fields) => {
    if (valid) {
      state.loading = true;
      const userStore = useUserStore()
      const result:any = await userStore.userLogin(ruleForm.value)
      if(result.httpCode==200){
        router.push('/dashboard')
      }
      state.loading = false;
    }else {
      state.loading = false;
    }
  })
}
</script>
<style scoped>
.login-wrap {
  width: 100vw;
  height: 100vh;
  position: relative;
  padding-top: 230px;
}
.login-form{
  width: 480px;
  padding: 40px 35px 0;
  margin: 0 auto;
  overflow: hidden;
  box-sizing: border-box;
}
.login-tit{
  width: 100%;
  text-align: center;
  font-weight: 700;
  font-size: 26px;
  margin-bottom: 15px;
}
</style>
