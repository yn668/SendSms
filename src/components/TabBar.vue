<template>
<van-tabbar route>
  <van-tabbar-item replace to="/phone" icon="phone-o">电话</van-tabbar-item>
  <van-tabbar-item replace to="/contacts" icon="friends-o">通讯录</van-tabbar-item>
  <van-tabbar-item replace to="/sms" icon="chat-o">短信</van-tabbar-item>
  <van-tabbar-item replace to="/setting" icon="setting-o">设置</van-tabbar-item>
</van-tabbar>
</template>
<script>
export default {
    name: "TabBar",
  setup() {

  },
};
</script>
<style scoped>

</style>
