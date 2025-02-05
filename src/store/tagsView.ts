import { defineStore } from 'pinia'

export const useTagsViewStore = defineStore('tagsView', {
    state: () => {
        return {
            visitedViews: new Array<any>(),
            cachedViews: ['Dashboard']//缓存的路由
        }
    },
    actions: {
        addView(view:any) {
            this.addVisitedView(view)
            this.addCachedView(view)
        },
        addVisitedView(view:any) {
            if (this.visitedViews.some((v:any) => v.path === view.path)) return
            this.visitedViews.push(
                Object.assign({}, view, {
                    title: view.meta.title || 'no-name'
                })
            )
        },
        addCachedView(view:any) {
            if (this.cachedViews.includes(view.name)) return
            this.cachedViews.push(view.name)
            // console.vlog("cachedViews",this.cachedViews);
        },
        delView(view:any) {
            return new Promise((resolve) => {
                this.delVisitedView(view)
                this.delCachedView(view)
                resolve({
                    visitedViews: [...this.visitedViews],
                    cachedViews: [...this.cachedViews]
                })
            })
        },
        delVisitedView(view:any) {
            return new Promise((resolve) => {
                for (const [i, v] of this.visitedViews.entries()) {
                    if (v.path === view.path) {
                        this.visitedViews.splice(i, 1)
                        break
                    }
                }
                resolve([...this.visitedViews])
            })
        },
        delCachedView(view:any) {
            return new Promise((resolve) => {
                const index = this.cachedViews.indexOf(view.name)
                index > -1 && this.cachedViews.splice(index, 1)
                resolve([...this.cachedViews])
            })
        },
        delOthersViews(view:any) {
            return new Promise((resolve) => {
                this.delOthersVisitedViews(view)
                this.delOthersCachedViews(view)
                resolve({
                    visitedViews: [...this.visitedViews],
                    cachedViews: [...this.cachedViews]
                })
            })
        },
        delOthersVisitedViews(view:any) {
            return new Promise((resolve) => {
                this.visitedViews = this.visitedViews.filter((v) => {
                    return v.meta.affix || v.path === view.path
                })
                resolve([...this.visitedViews])
            })
        },
        delOthersCachedViews(view:any) {
            return new Promise((resolve) => {
                const index = this.cachedViews.indexOf(view.name)
                if (index > -1) {
                    this.cachedViews = this.cachedViews.slice(index, index + 1)
                } else {
                    // if index = -1, there is no cached tags
                    this.cachedViews = []
                }
                resolve([...this.cachedViews])
            })
        },
        delAllViews() {
            return new Promise((resolve) => {
                this.delAllVisitedViews()
                this.delAllCachedViews()
                resolve({
                    visitedViews: [...this.visitedViews],
                    cachedViews: [...this.cachedViews]
                })
            })
        },
        delAllVisitedViews() {
            return new Promise((resolve) => {
                // keep affix tags
                const affixTags = this.visitedViews.filter((tag) => tag.meta.affix)
                this.visitedViews = affixTags
                resolve([...this.visitedViews])
            })
        },
        delAllCachedViews() {
            return new Promise((resolve) => {
                this.cachedViews = []
                resolve([...this.cachedViews])
            })
        },
        updateVisitedView(view:any) {
            for (let v of this.visitedViews) {
                if (v.path === view.path) {
                    v = Object.assign(v, view)
                    break
                }
            }
        }
    }
})
