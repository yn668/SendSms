<template>
  <div class="phone">
    <div class="notice" v-show="notice">
      <van-notice-bar color="#1989fa" background="#ecf9ff" left-icon="info-o" v-if="value !== ''">
        当前查询的手机号字段为：{{ value }}
      </van-notice-bar>
      <van-icon name="cross" size="20" @click="close" class="noticeIcon" />
    </div>
    <van-nav-bar title="通话记录">
      <template #right>
        <van-icon name="search" size="18" @click="showPopup" />
      </template>
    </van-nav-bar>
    <van-tabs v-model:active="activeName" animated>
      <van-tab title="所有" name="a">
        <CollLog :type="0" :phone_number="value" ref="num" :key="key"></CollLog>
      </van-tab>
      <van-tab title="来电" name="b">
        <CollLog :type="1" :phone_number="value" ref="num" :key="key"></CollLog>
      </van-tab>
      <van-tab title="去电" name="c">
        <CollLog :type="2" :phone_number="value" ref="num" :key="key"></CollLog>
      </van-tab>
      <van-tab title="未接" name="d">
        <CollLog :type="3" :phone_number="value" ref="num" :key="key"></CollLog>
      </van-tab>
    </van-tabs>
    <van-popup v-model:show="show" position="top" :style="{ height: '3.13rem' }">
      <van-search shape="round" autofocus right-icon="search" left-icon="" @search="search" @click-right-icon="search"
        :style="{ width: '100%', overflow: 'hidden' }" v-model.trim="value" placeholder="请输入搜索的手机号码" />
    </van-popup>
  </div>
</template>
<script>
import { ref } from 'vue';
import CollLog from '../components/CallLog.vue'

export default {
  name: "Iphone",
  components: {
    CollLog
  },
  setup() {
    const activeName = ref('a');
    const value = ref('');
    const num = ref();
    const key = ref(0);
    const notice = ref(false);
    const tagShow = ref(true);
    const show = ref(false);
    const showPopup = () => {
      show.value = true;
    };
    // 关闭搜索栏
    const close = () => {
      value.value = ''
      notice.value = false
      num.value.getPageList()
      key.value++
    };
    // 搜索
    const search = () => {
      num.value.getPageList()
      key.value++
      show.value = false;
      notice.value = true
    };
    return {
      activeName, show, showPopup, value, search, num, key, tagShow,
      close, notice
    };
  },
};
</script>
<style scoped lang="less">
.phone {
    height: 100vh;
  overflow: auto;
  background-color: @dominant-tone;
  .van-search {
  width: 100%;
}

.notice {
  position: relative;

  .noticeIcon {
    position: absolute;
    top: .8rem;
    right: 1.2rem;
    color:@nav-ico-text-color;
  }
}
}

</style>
