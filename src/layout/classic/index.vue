<template>
  <div class="common-layout">
    <el-container>
      <el-aside :width="menuCollapse?'64px':'200px'">
        <v-aside></v-aside>
      </el-aside>

      <el-container style="overflow-y: auto">
        <el-header style="padding: 0px;height: 90px">
          <v-header></v-header>
        </el-header>
        <el-main style="padding: 0px;">
          <el-scrollbar>
            <v-main></v-main>
          </el-scrollbar>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import VAside from "@/layout/components/vAside/vAside.vue";
import VMain from "@/layout/components/vMain/vMain.vue";
import VHeader from "@/layout/components/vHeader/vHeader.vue";
import {useSettingsStore} from '@/store/settings'
const settingsStore = useSettingsStore()
import {computed} from 'vue'
const menuCollapse = computed(() => settingsStore.menuCollapse)
</script>

<style scoped>

</style>
