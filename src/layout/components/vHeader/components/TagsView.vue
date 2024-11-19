<template>
  <div class="tags-view-container">
    <el-scrollbar
        @scroll="handleScroll"
        ref="refScrollbar"
        class="tags-view-wrapper"
    >
      <router-link
          to='/'
          :class="route.path=='/dashboard' ? 'active' : ''"
          class="tags-view-item"
      >
        <span class="tags-title">首页</span>
      </router-link>
      <router-link
          v-for="tag in visitedViews"
          ref="refTag"
          :class="isActive(tag) ? 'active' : ''"
          class="tags-view-item"
          :to="tag.path"
          :key="tag.path"
          @click.middle="!isAffix(tag) ? closeSelectedTag(tag) : ''"
          @contextmenu.prevent="openMenu(tag, $event)"
      >
        <span class="tags-title">{{tag.meta.title}}</span>
        <el-icon  @click.prevent.stop="closeSelectedTag(tag)" class="tags-icon">
          <Close />
        </el-icon>
      </router-link>
    </el-scrollbar>
    <ul
        v-show="visible"
        :style="{ left: left + 'px', top: top + 'px' }"
        class="contextmenu"
    >
      <li @click="refreshSelectedTag(selectedTag)">刷新</li>
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">
        关闭
      </li>
      <li @click="closeAllTags(selectedTag)">关闭全部</li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { computed, nextTick, onMounted, reactive, toRefs, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTagsViewStore } from '@/store/tagsView'
const tagsViewStore = useTagsViewStore()
import {useSettingsStore} from '@/store/settings'
const settingsStore = useSettingsStore()
const visitedViews = computed(() => tagsViewStore.visitedViews)
const tagAndTagSpacing = 4 // tagAndTagSpacing
const state = reactive({
  visible: false,
  top: 0,
  left: 0,
  selectedTag: {},
  affixTags: [],
  refTag: null,
  refScrollbar: null
})
const { visible, top, left, selectedTag, refTag, refScrollbar } = toRefs(state)
const router = useRouter()
const route = useRoute()
// console.log(router);
// console.log(route);

const isActive = (tag) => {
  return tag.path === route.path
}
const isAffix = (tag) => {
  return tag.meta && tag.meta.affix
}
const addTags = () => {
  const { name } = route
  if (name && name!='Dashboard') {
    tagsViewStore.addView(route)
  }
  return false
}
const moveToTarget = (currentTag) => {
  const $container = refScrollbar.value.wrapRef
  const $containerWidth = $container.offsetWidth
  const $scrollWidth = $container.scrollWidth
  const tagList = refTag.value

  let firstTag = null
  let lastTag = null
  // find first tag and last tag
  if (tagList.length > 0) {
    firstTag = tagList[0]
    lastTag = tagList[tagList.length - 1]
  }

  if (firstTag === currentTag) {
    $container.scrollLeft = 0
  } else if (lastTag === currentTag) {
    $container.scrollLeft = $scrollWidth - $containerWidth
  } else {
    // find preTag and nextTag
    const currentIndex = tagList.findIndex((item) => item === currentTag)
    const prevTag = tagList[currentIndex - 1]
    const nextTag = tagList[currentIndex + 1]

    // the tag's offsetLeft after of nextTag
    const afterNextTagOffsetLeft =
        nextTag.$el.offsetLeft + nextTag.$el.offsetWidth + tagAndTagSpacing

    // the tag's offsetLeft before of prevTag
    const beforePrevTagOffsetLeft = prevTag.$el.offsetLeft - tagAndTagSpacing

    if (afterNextTagOffsetLeft > $container.scrollLeft + $containerWidth) {
      $container.scrollLeft = afterNextTagOffsetLeft - $containerWidth
    } else if (beforePrevTagOffsetLeft < $container.scrollLeft) {
      $container.scrollLeft = beforePrevTagOffsetLeft
    }
  }
}

const moveToCurrentTag = () => {
  nextTick(() => {
    for (const tag of refTag.value) {
      if (tag.to.path === route.path) {
        moveToTarget(tag)
        // when query is different then update
        if (tag.to.fullPath !== route.fullPath) {
          tagsViewStore.updateVisitedView(route)
        }
        break
      }
    }
  })
}

const refreshSelectedTag = (view) => {
  // console.vlog(view);
  tagsViewStore.delCachedView(view).then(() => {
    const { fullPath } = view
    nextTick(() => {
      console.log(fullPath);
      router.replace({
        path: '/redirect' + fullPath
      })
    })
  })
}

const closeSelectedTag = (view) => {
  tagsViewStore.delView(view).then(({ visitedViews }) => {
    if (isActive(view)) {
      toLastView(visitedViews, view)
    }
  })
}

const closeOthersTags = () => {
  router.push(selectedTag)
  tagsViewStore.delOthersViews(selectedTag).then(() => {
    moveToCurrentTag()
  })
}

const closeAllTags = (view) => {
  tagsViewStore.delAllViews().then(({ visitedViews }) => {
    if (state.affixTags.some((tag) => tag.path === view.path)) {
      return
    }
    toLastView(visitedViews, view)
  })
}

const toLastView = (visitedViews, view) => {
  const latestView = visitedViews.slice(-1)[0]
  if (latestView) {
    router.push(latestView.fullPath)
  } else {
    // now the default is to redirect to the home page if there is no tags-view,
    // you can adjust it according to your needs.
    if (view.name === 'Dashboard') {
      // to reload home page
      router.replace({ path: '/redirect' + view.fullPath })
    } else {
      router.push('/')
    }
  }
}

const openMenu = (tag, e) => {
  const menuMinWidth = 105
  let offsetLeft:number = 0;
  if(!settingsStore.menuCollapse && settingsStore.layoutMode!='Streamline'){
    offsetLeft = refScrollbar.value.wrapRef.getBoundingClientRect().left-200 // container margin left
  }else {
    offsetLeft = refScrollbar.value.wrapRef.getBoundingClientRect().left // container margin left
  }

  const offsetWidth = refScrollbar.value.offsetWidth // container width
  const maxLeft = offsetWidth - menuMinWidth // left boundary
  const currentLeft = e.clientX - offsetLeft + 15 // 15: margin right

  if (currentLeft > maxLeft) {
    state.left = maxLeft
  } else {
    state.left = currentLeft
  }

  state.top = e.clientY
  state.visible = true
  state.selectedTag = tag
}

const closeMenu = () => {
  state.visible = false
}

const handleScroll = () => {
  closeMenu()
}
onMounted(() => {
  addTags()
})
watch(
    () => route.path,
    () => {
      addTags()//增加导航标签栏
    }
)
watch(
    () => state.visible,
    (newValue) => {
      if (newValue) {
        document.body.addEventListener('click', closeMenu)
      } else {
        document.body.removeEventListener('click', closeMenu)
      }
    }
)
// console.vlog(router);
// console.vlog(route);
</script>

<style scoped>

.tags-view-wrapper{
  display: flex;
  align-items: center;
  height: 40px;
}
.tags-view-item{
  display: inline-block;
  position: relative;
  height: 26px;
  line-height: 26px;
  border: 1px solid #d8dce5;
  padding: 0 10px;
  margin-top: 7px;
  color: #495060;
  font-size: 12px;
  margin-right: 10px;
}
.tags-title{
}
.tags-icon{
  margin-top: -2px;
  vertical-align:middle;
  margin-left: 4px;
  border-radius: 50%;
}
.tags-icon:hover{
  background-color: #b4bccc;
  color: #fff;
}
.active{

  color: #000c;
  margin-right: 10px;
}
.active .tags-title:before{
  content: "";
  background: #16baaa;
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  position: relative;
  margin-right: 5px;
}
.contextmenu {
  margin: 0;
  background: #fff;
  z-index: 3000;
  position: absolute;
  list-style-type: none;
  padding: 5px 0;

  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
}
.contextmenu li{
  margin: 0;
  padding: 7px 16px;
  cursor: pointer;
}
.contextmenu li:hover{
  background: #eee;
}
</style>
