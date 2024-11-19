<template>
  <div class="fixed-header">
    <div class="navbar" v-if="layoutMode=='Classic'">
      <div class="left-menu">
        <div @click="toggleClick" class="hamburger-container">
          <el-icon v-if="menuCollapse" color="#3c3c3c" :size="20">
            <Expand/>
          </el-icon>
          <el-icon v-else="!menuCollapse" color="#3c3c3c" :size="20">
            <Fold/>
          </el-icon>
        </div>
        <div class="breadcrumb-container">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item
                v-for="(item,index) in levelList"
                :key="index"
            >
              <a :href="item.path">{{ item.meta.title }}</a>
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
      <div class="right-menu">
        <div class="user-container">
          <el-icon @click="handleDrawerOpen" style="margin-right: 5px" color="#333" size="20px">
            <Setting />
          </el-icon>
          <el-dropdown trigger="click">
            <div class="user-wrapper">
              <span class="user-icon">
                <el-avatar size="small" shape="square"> {{userInfo.userName.charAt(0)}} </el-avatar>
              </span>
              <span class="user-name">&nbsp;{{userInfo.userName}}</span>
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>

        </div>
      </div>
    </div>
    <div class="navbar-wrapper" v-if="layoutMode=='Streamline'">
      <div class="navbar-logo">
        <logo :menuCollapse="false" />
      </div>
      <div class="navbar-left">
        <el-scrollbar class="vertical-menus-scrollbar">
          <el-menu
              mode="horizontal"
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
      <div class="navbar-right">
        <div class="user-container">
          <el-icon @click="handleDrawerOpen" style="margin-right: 5px" color="#333" size="20px">
            <Setting />
          </el-icon>
          <el-dropdown trigger="click">
            <div class="user-wrapper">
              <span class="user-icon">
                <el-avatar size="small" shape="square"> {{userInfo.userName.charAt(0)}} </el-avatar>
              </span>
              <span class="user-name">&nbsp;{{userInfo.userName}}</span>
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>

        </div>
      </div>
    </div>
    <div class="tags-view">
      <tags-view></tags-view>
    </div>
    <setting-view ref="settingView"></setting-view>
  </div>

</template>
<script setup lang="ts">
import TagsView from "@/layout/components/vHeader/components/TagsView.vue";
import SettingView from "@/layout/components/vHeader/components/SettingView.vue";
import Logo from '@/layout/components/vAside/components/Logo.vue'
const routes = computed(() => permissionStore.routes)
import {computed, reactive, toRefs, watch,ref} from 'vue'
import { useUserStore } from '@/store/user'
import {useSettingsStore} from '@/store/settings'
import { usePermissionStore } from '@/store/permission'
const permissionStore = usePermissionStore()
const userStore = useUserStore()
const userInfo = computed(() => userStore.userInfo)
const settingsStore = useSettingsStore()
const menuCollapse = computed(() => settingsStore.menuCollapse)
const layoutMode = computed(() => settingsStore.layoutMode)
import {useRoute,useRouter} from 'vue-router'
import SidebarItem from "@/layout/components/vAside/components/index.vue";
const settingView:any = ref(null)
const state:any = reactive({
  levelList: null
})

const {levelList} = toRefs(state)
const route = useRoute()
const router = useRouter()
const activeMenu = computed(() => {
  const {path } = route
  return path
})
const toggleClick = () => {
  settingsStore.menuCollapse = !settingsStore.menuCollapse
}
const handleDrawerOpen = () => {
  settingView.value.showSettings = true;
}
const getBreadcrumb = () => {
  state.levelList = route.matched.filter(x => x.name != "Dashboard")
}
getBreadcrumb()
const logout = async () => {
  await userStore.logout()
  router.push('/login')
}
// watch的用法
watch(
    () => route.path,
    () => {
      getBreadcrumb()
    }
)

</script>
<style scoped>
.navbar-wrapper{
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  background-color: #fff;
  border-bottom: solid 1px #e6e6e6;
  box-sizing: border-box;
}
.navbar-left{
  flex: 1;
  width: 50%;
  height: 100%;
}
.navbar-logo{
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 10px;
}
.navbar-right{
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 10px;
}
.tags-view{
  width: 100%;
  padding: 0 15px;
  height: 40px;
  background: #fff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  box-sizing: border-box;
}
.user-container{
  display: flex;
  align-items: center;
  height: 100%;
  transition: background 0.3s;
  cursor: pointer;
}
.navbar {
  display: flex;
  align-items: center; /*上下的位置*/
  justify-content: space-between; /*均匀排列每个元素*/
  height: 50px;
  background: #fff;
  border-bottom: 1px solid #ddd;
  box-sizing: border-box;
}

.left-menu {
  display: flex;
  align-items: center;
  height: 100%;
}

.right-menu {
  display: flex;
  align-items: center;
  justify-content: flex-end; /* 从行尾位置开始排列 */
  height: 100%;
  width: 200px;
}

.hamburger-container {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 15px;
  transition: background 0.3s;
  cursor: pointer;
}

.breadcrumb-container {
  display: flex;
  align-items: center;
  height: 100%;
  margin-left: 10px;
  white-space: nowrap;
}
.user-wrapper{
  position: relative;
  height: 49px;
  line-height: 49px;
  padding: 0 10px;
  padding-left: 5px;
}
.user-wrapper:hover{
  background: #f6f6f6;
}
</style>
