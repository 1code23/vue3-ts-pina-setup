<script setup lang="ts" name="User">
import { ref } from 'vue'
const input1 = ref('')
</script>

<template>
  <div>
    用户列表
    <el-input v-model="input1" placeholder="Please input" />
  </div>
</template>

<style scoped>

</style>

