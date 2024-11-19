import {defineStore} from 'pinia'
import {getToken,setToken} from "@/utils/storage.ts";

export const useSettingsStore = defineStore('settings', {
    state: () => {
        return {
            menuCollapse: false,//// 是否水平折叠收起菜单
            // 布局方式 Classic 经典布局  Streamline 单行布局
            layoutMode: getToken('layoutMode')?getToken('layoutMode'):'Classic'
        }
    },
    actions: {
        // @ts-ignore
        changeSetting({ key, value }) {
            //改变全局变量的方法
            // @ts-ignore
            this[key] = value
            setToken(key, value)
        },
    }
})
