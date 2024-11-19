// https://vitejs.dev/config/
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";//这个path用到了上面安装的@types/node
import vueJsx from '@vitejs/plugin-vue-jsx'//tsx语法
import vitePluginVueSetupExtend from 'vite-plugin-vue-setup-extend'//可以给语法糖组件直接命名比如<script lang="ts" setup name="A"></script>

// https://vitejs.dev/config/
export default ({ mode }) => {
  return defineConfig({
    plugins: [vue(),vitePluginVueSetupExtend(),vueJsx()],
    //这里进行配置别名
    resolve: {
      alias: {
        '@': path.resolve('./src') // @代替src
      }
    },
    // @ts-ignore
    lintOnSave: false,
    server: {
      port: 9527, // 设置服务启动端口号
      open: false, // 设置服务启动时是否自动打开浏览器
      // host: '192.168.1.17',//你自己本地的ip
      host: '192.168.48.152',//你自己本地的ip
      proxy: {
        '/apis': {
          target: 'https://mock.apifox.cn/m1/3365861-0-default', //接口的域名//mock 数据用的是apifox
          secure: false, // 如果是https接口，需要配置这个参数
          changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
          rewrite: (path) => path.replace(/^\/apis/, '/')
        }
      }
    }
  })
}
