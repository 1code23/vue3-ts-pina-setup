<template>
  <div class="common-layout">
    <component :is="layoutMode" />
  </div>
</template>
<script setup lang="ts">
import Classic from '@/layout/classic/index.vue'
import Streamline from '@/layout/streamline/index.vue'
import {useSettingsStore} from '@/store/settings'
const settingsStore = useSettingsStore()
import {computed} from 'vue'
const layoutEnum:any = {
  Classic: Classic,//经典布局
  Streamline: Streamline//单栏布局
}
const layoutMode = computed(() => layoutEnum[settingsStore.layoutMode])
</script>
<style scoped>
</style>
