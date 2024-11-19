<template>
  <div class="sidebar-logo-container" :class="{ menuCollapse: menuCollapse }">
    <transition name="sidebarLogoFade">
      <router-link
          class="sidebar-logo-link"
          to="/"
      >
        <img :src="LogoImg" class="sidebar-logo" />
        <span class="sidebar-title">{{title}}</span>
      </router-link>
    </transition>
  </div>
</template>
<script setup lang="ts">
import { reactive, toRefs } from 'vue'
import LogoImg from '@/assets/logo.png'
const state = reactive({
  title: 'Spurs-Admin'
})

const { title, logo } = toRefs(state)
const props = defineProps({
  menuCollapse: {
    type: Boolean,
    required: true
  }
})
// console.log(props.menuCollapse);
</script>

<style scoped>
.sidebar-logo{
  width: 40px;
  height: 40px;
  vertical-align: middle;
  margin-right: 12px;
  padding-bottom: 4px;
}
.sidebar-title{
  line-height: 50px;
  font-weight: bold;
  display: inline-block;
  vertical-align: middle;
  color: #333;
  font-size: 18px;
}
.sidebar-logo-container{
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #ddd;
  text-align: center;
  box-sizing: border-box;
  overflow: hidden;
}
.sidebar-logo-link{
  width: 100%;
  height: 100%;
}
</style>
