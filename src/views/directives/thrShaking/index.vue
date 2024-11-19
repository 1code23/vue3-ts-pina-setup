<template>
  <div class="app-container">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>函数的方式实现节流防抖(浏览器控制台看效果)</span>
        </div>
      </template>
      <el-button @click="throttleBtn" type="primary">节流点击</el-button>
      <br/>
      <br/>
      <el-input v-model="inputValue" @input="debounceInput" placeholder="输入防抖"  clearable />
    </el-card>

    <el-card style="margin-top: 60px" class="box-card">
      <template #header>
        <div class="card-header">
          <span>全局自定义指令实现节流防抖(浏览器控制台看效果)</span>
        </div>
      </template>
      <el-button v-throttle @click="testThrottle" type="primary">节流点击</el-button>
      <br/>
      <br/>
      <el-input v-model="inputValue2" v-debounce="{ time: 3000, func: () => testDebounceInput() }"   placeholder="输入防抖"  clearable />
    </el-card>
  </div>
</template>
<script setup lang="ts">
import {ref} from "vue";
const inputValue = ref("")
const inputValue2 = ref("")
const throttle:any  = ref(null)//节流
const debounce:any  = ref(null)//防抖
const throttleBtn = () =>{
  if(throttle.value){ //判断setTimeout()定时器在两秒内存在否，存在就返回什么都不做
    return
  }else{//如果定时器不存在，就创建一个定时器
    console.log("我两秒钟只能被执行一次")
    throttle.value = setTimeout(()=>{
      throttle.value = null //两秒后清除定时器，等待下一次的点击
    },2000)
  }
}
const debounceInput = () =>{
  clearTimeout(debounce.value) //每次都需要先清空定时器
  debounce.value = setTimeout(()=>{ //定时器函数，2秒后执行
    console.log("每次调用我1秒后才能执行"+inputValue.value)
  },1000)
  //整个逻辑就是每一次点击都先清空计时器，让上一次的计时失效，当不在点击时就会执行
  //最后一次定时函数
}
function testThrottle() {
  console.log('我两秒钟只能被执行一次')
}
function testDebounceInput(){
  console.log("每次调用我3秒后才能执行"+inputValue2.value)
}
</script>


<style scoped>
.box-card{
  width: 500px;
}
</style>
