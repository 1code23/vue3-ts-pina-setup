<template>
  <div class="drawer-wrapper">
    <el-drawer
        v-model="showSettings"
        title="系统配置"
        direction="rtl"
        size="310px"
    >
      <el-divider>布局方式</el-divider>
      <div class="layout-wrapper">
        <el-row :gutter="20">
          <el-col @click="handleLayoutMode('Classic')" :span="12">
            <div
                class="classic"
                :class="{'active-layout': layoutMode === 'Classic' ? true : false}"
            >
              <div class="sidebar"></div>
              <div class="main-wrapper">
                <div class="main-header"></div>
                <div class="main"></div>
              </div>
              <div class="introduce">经典</div>
            </div>
          </el-col>
          <el-col @click="handleLayoutMode('Streamline')" :span="12">
            <div
                class="streamline"
                :class="{'active-layout': layoutMode === 'Streamline' ? true : false}"
            >
              <div class="main-wrapper">
                <div class="main-header"></div>
                <div class="main"></div>
              </div>
              <div class="introduce">单栏</div>
            </div>
          </el-col>
        </el-row>
      </div>

    </el-drawer>
  </div>
</template>
<script setup lang="ts">
import { reactive, toRefs,computed } from 'vue'
import { useSettingsStore } from '@/store/settings'
const settingsStore = useSettingsStore()
const state = reactive({
  showSettings:false,
  layoutMode:null
})
const {
  showSettings
} = toRefs(state)

const layoutMode = computed(() => settingsStore.layoutMode)
const handleLayoutMode = (mode:any) => {
  state.layoutMode = mode
  state.showSettings = false
  settingsStore.changeSetting({
    key: 'layoutMode',
    value: mode
  })
}
defineExpose({
  showSettings
})
</script>


<style scoped>
.active-layout {
  border: 1px solid #409eff;
}
.streamline{
  cursor: pointer;
  position: relative;
  display: flex;
  height: 100px;
  box-sizing: border-box;
}
.classic{
  cursor: pointer;
  position: relative;
  display: flex;
  height: 100px;
  box-sizing: border-box;
}
.sidebar {
  width: 20%;
  background-color: #ebeef5;
}


.main-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 5px;

  .main-header {
    height: 10%;
    background-color: #dcdfe6;
  }

  .main {
    flex: 1;
    margin-top: 5px;
    background-color: #f2f6fc;
  }
}
.introduce{
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: #a0cfff;
}
</style>
