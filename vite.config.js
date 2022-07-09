import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import themePreprocessorPlugin from "@zougt/vite-plugin-theme-preprocessor";
const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(),
      themePreprocessorPlugin({
        less: {
          // 是否启用任意主题色模式，这里不启用
          arbitraryMode: false,
          // 提供多组变量文件
          multipleScopeVars: [
            {
              scopeName: "light",
              // 变量文件内容不应该夹带样式代码，设定上只需存在变量
              path: path.resolve("src/assets/stylesheets/theme/light.less"),
            },
            {
              scopeName: "dark",
              path: path.resolve("src/assets/stylesheets/theme/dark.less"),
            },
          ],
          // css中不是由主题色变量生成的颜色，也让它抽取到主题css内，可以提高权重
          includeStyleWithColors: [
            {
              color: "#ffffff",
              // 此类颜色的是否跟随主题色梯度变化，默认false
              // inGradient: true,
            },
          ],
          // 默认取 multipleScopeVars[0].scopeName
          defaultScopeName: "",
          // 在生产模式是否抽取独立的主题css文件，extract为true以下属性有效
          extract: true,
          // 独立主题css文件的输出路径，默认取 viteConfig.build.assetsDir 相对于 (viteConfig.build.outDir)
          outputDir: "",
          // 会选取defaultScopeName对应的主题css文件在html添加link
          themeLinkTagId: "theme-link-tag",
          // "head"||"head-prepend" || "body" ||"body-prepend"
          themeLinkTagInjectTo: "head",
          // 是否对抽取的css文件内对应scopeName的权重类名移除
          removeCssScopeName: false,
          // 可以自定义css文件名称的函数
          customThemeCssFileName: (scopeName) => scopeName,
        },
        // less: {
        //   multipleScopeVars: [
        //     {
        //       scopeName: "theme-default",
        //       path: path.resolve("src/theme/default-vars.less"),
        //     },
        //     {
        //       scopeName: "theme-mauve",
        //       path: path.resolve("src/theme/mauve-vars.less"),
        //     },
        //   ],
        // },
      }),],
    publicPath:'./',
    base: './',
    resolve: {
        extensions: ['.vue', '.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
        alias: {
          '@': path.resolve(__dirname, 'src')
        }
    },

    server: {
        proxy: {
            '/api': {
                target: 'www.baidu.com',
                changeOrigin: true,
                rewrite: (path) =>
                    path.replace(/^\/api/, 'www.baidu.com'),
            },
        },
        port: 8899,
        host: '0.0.0.0',
    },
    define: {
        'process.env': {
            APP_BUILD_ENV: 'dev',
        },
    },
    // css: {
    //     preprocessorOptions: {
    //       less: {
    //         modifyVars: {
    //           hack: `true; @import (reference) "${path.resolve('src/assets/stylesheets/config.less')}";`,
    //         },
    //         javascriptEnabled: true
    //       }
    //     }
    //   },
})

