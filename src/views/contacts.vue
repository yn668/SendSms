<template>
<div id="Contact">
        <van-nav-bar title="通讯录"></van-nav-bar>
     <Contacts></Contacts>
</div>
</template>
<script>
import Contacts from '../components/Contacts.vue'
export default {
    name: "Contact",
     components:{
   Contacts
    },
  setup() {

    return {};
  },
};
</script>
<style scoped lang="less">
#Contact {
  height: 100vh;
  overflow: auto;
  background-color: @dominant-tone;
}
</style>
