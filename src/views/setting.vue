<template>
  <div id="Setting">
    <van-nav-bar title="设置" />
    <Cell></Cell>
    <van-cell-group inset>
      <van-cell icon="https://img.ichuguang.com/imgs/2022/07/71c1a8c32da1772e.png" title="切换配置" is-link @click="msg" />
      <van-cell icon="https://img.ichuguang.com/imgs/2022/07/173ff349af76e415.png" title="切换主题" is-link
        @click="switchoverTheme" />
      <van-cell icon="https://img.ichuguang.com/imgs/2022/07/21a8fbfb9459ddc6.png" title="留言反馈" is-link @click="msg" />
      <van-cell icon="https://img.ichuguang.com/imgs/2022/07/f1e062a931e18557.png" title="退出登录" is-link
        @click="logOut" />
    </van-cell-group>
  </div>
</template>
<script>
import store from '@/store/index.js'
import { useRouter } from 'vue-router'
import Util from "@/util/SmsForwardUtil";
import Cell from '@/components/Cell.vue'

import { Toast } from 'vant';
export default {
  name: "Setting",
  components: {
    Cell
  },
  setup() {
    const router = useRouter();
    const logOut = () => {
      localStorage.clear();
      store.dispatch('IS_LOGIN_POPUP', true)
      router.replace({ path: '/' })
    }
    const msg = () => {
      Toast({
        message: '下次再说',
        icon: 'like-o',
      });
    }
     const switchoverTheme = () => {
      
       Util.theme()
      }
    return {
      logOut,
      msg,
      switchoverTheme
    };
  },
};
</script>
<style scoped lang="less">
#Setting {
  height: 100vh;
  overflow: auto;
  background-color: @dominant-tone;

  .van-cell-group {
    margin-top: 2.5rem;
  }

  ::v-deep .van-icon__image {
    width: 1.5em;
    height: 1.5em;
  }
}
</style>
