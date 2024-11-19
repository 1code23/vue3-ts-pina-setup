import {defineStore} from 'pinia'
import {getToken, setToken, removeToken} from '@/utils/storage.ts'
import {login,getIndex} from "@/api/user";
interface LoginData {
    loginName: string
    password: string
}

//1.创建store
// store实例相当于一个容器，里面存放的有类似于data，计算属性，方法之类的东西。通过defineStore()方法定义
// 在src下面创建一个store文件夹，再创建与之对应的js文件，比如user.js
// 在pinia中，你可以认为 state 是 store 的数据 (data)，getters 是 store 的计算属性 (computed)，而 actions 则是方法 (methods)，相比vuex，pinia没有mutations
export const useUserStore = defineStore('user', {
    state: () => {
        return {
            token: getToken("Access-Token"), // 登录信息
            // routerList: [], // 路由权限
            init:false,//判断是否获取过路由
            userInfo: null // 用户信息
        }
    },
    actions: {
        userLogin(loginData:LoginData) {
            const data = {
                // 'user': JSON.stringify(userInfo),
                'loginName': loginData.loginName,
                'password': loginData.password
            }
            return new Promise((resolve) => {
                login(data).then((response) => {
                    const {data} = response
                    this.token = data.accessToken;
                    setToken("Access-Token",data.accessToken)
                    resolve(response)
                }).catch((error) => {
                    resolve(error)
                })
            })
        },
        getInfo(){
            return new Promise((resolve, reject) => {
                getIndex().then((response:any) => {
                    const {data} = response
                    // console.log("222",response);
                    this.userInfo = response.user

                    resolve(data)
                }).catch(error => {
                    console.log(error);
                    this.init = false
                    reject(error)
                })
            })
        },
        logout() {
            return new Promise(() => {
                this.token = ''
                this.init = false
                this.userInfo = null;
                removeToken("Access-Token")
                window.location.reload()
            })
        }
    }
})
// import { defineStore } from 'pinia'
// import { getToken, setToken, removeToken } from '@/utils/storage'
// //1.创建store
// // store实例相当于一个容器，里面存放的有类似于data，计算属性，方法之类的东西。通过defineStore()方法定义
// // 在src下面创建一个store文件夹，再创建与之对应的js文件，比如user.js
// console.log(defineStore);
// export const useUserStore = defineStore({
//     id: 'user', // id必填，且需要唯一
//     state: () => {
//         return {
//             name: '以和为贵',
//             age: 20
//         }
//     },
//     actions: {
//         updateName(name: string) {
//             this.name = name
//         },
//         updateAge(age: number) {
//             this.age = age
//         }
//     }
// })
