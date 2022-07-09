<template>
  <div id="Sms">
    <van-nav-bar
      title="短信"
      :left-text="type === 1 ? '收件箱' : '发件箱'"
      @click-left="onClickType"
      @click-right="onSendSms"
    >
      <template #right>
        <van-icon name="plus" size="18" />
      </template>
    </van-nav-bar>
    <SmsList
      ref="typenum"
      :key="key"
      :type="type"
      @openSendContent="showSendOpen"
    ></SmsList>
    <van-popup
      v-model:show="show"
      @closed="closed"
      round
      position="bottom"
      :style="{ height: '80%' }"
    >
      <SendSmsContent
        @close="closeSendSms"
        :number="number"
        ref="close"
        :key="keys"
      ></SendSmsContent>
    </van-popup>
  </div>
</template>
<script>
import { ref ,onBeforeMount} from 'vue';
import { Toast } from 'vant';
import SmsList from '../components/SmsList.vue'
  import { useRouter } from 'vue-router'
import SendSmsContent from '../components/SendSmsContent.vue'
export default {
    name: "SMS",
     components:{
      SmsList,
      SendSmsContent
    },
  setup() {
    const type = ref(1)
    const typenum = ref(1);
     const number = ref('');
     const key = ref(0);
      const keys = ref(0);
     const close = ref()
     const router = useRouter()
      const show = ref(false);
       onBeforeMount(() => {
            showSend()
      })
    if(!window.localStorage.getItem('Toast')){
     Toast({
      message: '点击上方按钮可切换信箱哦',
      icon: 'https://img.ichuguang.com/imgs/2022/06/739fd73c24bd4159.png',
      });;
      window.localStorage.setItem('Toast','true')
      }
      // 判断路由是否传参
      const showSend = ()=>{
       if(router.currentRoute.value.query.number) {
        show.value = true;
        number.value = router.currentRoute.value.query.number
     }
      }
      // 打开发送窗口并且传参给子组件
        const showSendOpen = (num)=>{
          number.value = num
          keys.value++
          show.value = true;
           
      }
      // 切换收发件信箱
      const onClickType = ()=>{
        type.value ===1 ? type.value =2 : type.value = 1
        typenum.value.getPageList()
        key.value++

      }
      const onSendSms = () => {
      show.value = true;
    };
       const closeSendSms = () => {
      show.value = false;
    };
    // 调用子组件方法
      const closed = () => {
        close.value.close()
    };

      return {
        onClickType,
        type,
        key,
        keys,
        typenum,
        onSendSms,
        show,
        closed,
        close,
        number,
        showSend,
        showSendOpen,
        closeSendSms,
    };
  
  },
};
</script>
<style scoped lang="less">
#Sms {
    height: 100vh;
  overflow: auto;
  background-color: @dominant-tone;
}
::v-deep .van-popup {
  box-sizing: border-box;
  background-color: @dominant-tone;
}
</style>
