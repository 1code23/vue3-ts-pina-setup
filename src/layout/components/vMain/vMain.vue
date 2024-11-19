<template>
  <div class="app-main">
    <router-view v-slot="{ Component }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="cachedViews">
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useTagsViewStore } from '@/store/tagsView'

const tagsViewStore = useTagsViewStore()
const cachedViews = computed(() => tagsViewStore.cachedViews)
// console.vlog("cachedViews",cachedViews);
</script>

<style scoped>
.app-main{
  padding: 10px;
  padding-left: 15px;
  box-sizing: border-box;
}
</style>
