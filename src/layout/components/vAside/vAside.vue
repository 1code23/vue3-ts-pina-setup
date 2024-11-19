
<template>
  <div class="aside-con">
    <logo :menuCollapse=menuCollapse />
    <el-scrollbar class="vertical-menus-scrollbar">
      <el-menu
          :collapse-transition="false"
          :collapse="menuCollapse"
          :default-active="activeMenu"
          class="el-menu-vertical-demo"
          router
      >
        <sidebar-item
            v-for="route in routes"
            :key="route.path"
            :item="route"
        >
        </sidebar-item>
      </el-menu>
    </el-scrollbar>
  </div>

</template>
<script setup lang="ts">
import { usePermissionStore } from '@/store/permission'
import { useSettingsStore } from '@/store/settings'
import { computed } from 'vue'
import SidebarItem from '@/layout/components/vAside/components/index.vue'
import Logo from '@/layout/components/vAside/components/Logo.vue'
const permissionStore = usePermissionStore()
const settingsStore = useSettingsStore()
const routes = computed(() => permissionStore.routes)
const menuCollapse = computed(() => settingsStore.menuCollapse)
import { useRoute } from 'vue-router'
const route = useRoute()
const activeMenu = computed(() => {
  const {path } = route
  return path
})

// npm install vue-awesome-console --save-dev
// console.vlog(routes)
</script>

<style scoped>
.aside-con{
  height: 100vh;
  overflow: hidden;
  background-color: #f6f6f6;
}
.el-menu-vertical-demo{
  background: #f6f6f6;
  border-right: none;
}
</style>
