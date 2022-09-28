<template>
<div id="APP">
  <router-view />
   <!-- 挂载全局加载动画组件 -->
  <GlobalLoadingAnimate></GlobalLoadingAnimate>
  <Popup />
  <TabBar />
</div>
</template>
<script>
import { ref, computed } from 'vue';
import TabBar from '@/components/TabBar.vue'
import Popup from '@/components//Popup.vue'
// 导入全局加载动画组件
import GlobalLoadingAnimate from '@/components/loadingAnimate.vue'
import { toggleTheme } from "@zougt/vite-plugin-theme-preprocessor/dist/browser-utils";
export default {
    name: "APP",
    components: {
      TabBar,
      Popup,
      GlobalLoadingAnimate
    },
  setup() {
    toggleTheme({
      scopeName:  localStorage.getItem('Theme') ? localStorage.getItem('Theme') : 'light',
});
    return{

    }
  },
};
</script>
  <style lang="less">
#APP {
  .van-popup {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: @dominant-tone;
  }
  .van-form {
    margin-top: 5%;
    background-color: @dominant-tone;
  }
}
  </style>