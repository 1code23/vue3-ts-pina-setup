<template>
  <div class="common-layout">
    <el-container>
      <el-header style="padding: 0px;height: 90px">
        <v-header></v-header>
      </el-header>
      <el-main style="padding: 0px">
        <v-main></v-main>
      </el-main>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import VMain from "@/layout/components/vMain/vMain.vue";
import VHeader from "@/layout/components/vHeader/vHeader.vue";
</script>



<style scoped>

</style>
