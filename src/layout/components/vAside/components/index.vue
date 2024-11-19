
<template>
  <el-sub-menu
      :index="item.path"
      v-if="item && !item.hidden && item.children && item.name!='Dashboard'"
  >
    <template #title>
      <el-icon>
        <component :is="item.meta.icon"></component>
      </el-icon>
      <span>{{item.meta.title}}</span>
    </template>
      <el-menu-item
          style="background: #f6f6f6"
          v-for="route in item.children"
          :key="route.path"
          :index="route.path"
      >
        <span>{{route.meta.title}}</span>
      </el-menu-item>

  </el-sub-menu>
  <el-menu-item style="background: #f6f6f6" :index="item.children[0].path" v-else-if="item && !item.hidden && item.name=='Dashboard'">
    <el-icon>
      <component :is="item.meta.icon"></component>
    </el-icon>
    <template #title>{{item.meta.title}}</template>
  </el-menu-item>
  <el-menu-item style="background: #f6f6f6" :index="item.path" v-else-if="item && !item.hidden">
    <el-icon>
      <component :is="item.meta.icon"></component>
    </el-icon>
    <template #title>{{item.meta.title}}</template>
  </el-menu-item>

</template>
<script setup lang="ts" name="SidebarItem">

const props = defineProps({
  item: { type: Object, default: () => {} }
})


</script>

<style scoped>

</style>
