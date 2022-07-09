<template>
  <div class="sendSmsContent">
    <van-field class="recipient" v-model="phone_numbers" label-width="3.5em" label="收件人" :autofocus="true"
      :formatter="formatter" round placeholder="请输入收件人手机号,如有多个号码请用,分开" />
    <div class="sendMain">
      <div :id="'zm_' + index" v-for="(item, index) in sendList" :key="index">
        <p>{{ item }}</p>
      </div>
    </div>
    <van-field class="sendContent" v-model="msg_content" rows="1" label-width="2.5em" autosize label="内容" maxlength="70"
      type="textarea" placeholder="请输入发信内容">
      <template #button>
        <van-popover v-model:show="showPopover" :actions="actions" @select="onSelect" placement="top">
          <template #reference>
            <svg class="icon sim" aria-hidden="true">
              <use class="con-SIMqia" xlink:href="#icon-Simcard"></use>
            </svg>
          </template>
        </van-popover>

        <svg class="icon send" aria-hidden="true" @click="sendSms">
          <use xlink:href="#icon-fasong"></use>
        </svg>
      </template>
    </van-field>
  </div>
</template>
<script>
import { ref, defineComponent } from 'vue';
import { Toast } from 'vant';
import axios from '@/axios/axios'
import { SEND_SMS } from "@/assets/api/api.js";
import Util from "@/util/SmsForwardUtil";

export default defineComponent({
  name: "sendSmsContent",
  props: {
    number: String,
    key: Number
  },
  setup(props, { emit }) {
    const phone_numbers = ref('')
    const msg_content = ref('')
    const sim_slot = ref(1)
    const showPopover = ref(false);
    const sendList = ref([])
    const actions = [
      { text: 'SIM1', icon: 'https://img.ichuguang.com/imgs/2022/06/0c98dc6c6b4e370d.png' },
      { text: 'SIM2', icon: 'https://img.ichuguang.com/imgs/2022/06/e63c357e3a7ae6b0.png' },
    ];
    if (props.number) {
      phone_numbers.value = props.number
    }
    const close = () => {
      sendList.value = []
      sendList.value = ''
      phone_numbers.value = ''
    }
    const onSelect = (action) => {
      Toast(action.text);
      sim_slot.value = action.text === 'SIM1' ? 1 : 2
    }
    // 发送短信
    const sendSms = () => {
      if (phone_numbers.value === '' || phone_numbers.value === '') {
        return
      }
      let timestamp = new Date().getTime();
      let data = {
        "data": {
          "sim_slot": sim_slot.value,
          "phone_numbers": phone_numbers.value,
          "msg_content": msg_content.value
        },
        "timestamp": timestamp,
        "sign": Util.sisgn(timestamp, Util.sign())
      }
      axios.post(SEND_SMS, data).then(response => {
        if (response.data.code === 200) {
          Toast({
            message: '短信发送成功',
            icon: 'https://img.ichuguang.com/imgs/2022/06/7c682f7e147a30ce.png',
          })
          sendList.value.push(msg_content.value)
          setTimeout(() => {
            emit('close')
          }, 1500);
        } else {
          Toast({
            message: '短信发送失败',
            icon: 'https://img.ichuguang.com/imgs/2022/06/5d2451c1941ae791.png',
          })
        }
      })
    }
    const formatter = (value) => value.replace(/[^\d+(,\d\d\d)\d+$]/g, '');
    return {
      phone_numbers,
      msg_content,
      formatter,
      showPopover,
      actions,
      onSelect,
      sendSms,
      sim_slot,
      sendList,
      close
    };
  },
});
</script>
<style scoped lang="less">
.sendSmsContent {
  display: flex;
  flex: 1;
  flex-direction: column;

  // 为发送短信器气泡样式,可切换类名索引排序

  .sendMain {
    width: 100vw;
    flex: 1;
    background-color: @send-sms-content;

    /*WordPress宇宙超级无敌美化框 by:zmki  www.zmki.cn/5458.html*/
    #zm_0,
    #zm_1,
    #zm_2,
    #zm_3,
    #zm_4,
    #zm_5,
    #zm_6,
    #zm_7,
    #zm_8 {
      /*圆角值,在此定义*/
      border-radius: 1.25rem;
      width: 60%;
      height: auto;
      float: right;
    }

    /*迷幻紫*/
    #zm_2 {
      color: #555555;
      overflow: hidden;
      margin: 10px 0;
      padding: 15px 15px 15px 35px;
      /*border-radius: 10px;*/
      box-shadow: 6px 0 12px -5px rgb(190, 196, 252),
        -6px 0 12px -5px rgb(189, 196, 252);
      background-color: #8ec5fc;
      background-image: linear-gradient(62deg, #8ec5fc 0%, #e0c3fc 100%);
      background-image: -webkit-linear-gradient(62deg,
          #8ec5fc 0%,
          #e0c3fc 100%);
    }

    /*西瓜红*/
    #zm_1 {
      color: #555555;
      overflow: hidden;
      margin: 10px 0;
      padding: 15px 15px 15px 35px;
      /*border-radius: 10px;*/
      box-shadow: 6px 0 12px -5px rgb(255, 176, 172),
        -6px 0 12px -5px rgb(255, 161, 174);
      background-color: #ff9a8b66;
      background-image: linear-gradient(220deg,
          #ff9a8b 0%,
          #ff6a8838 55%,
          #ff99ac 100%);
      background-image: -webkit-linear-gradient(220deg,
          #ff9a8b7a 0%,
          #ff6a88ab 55%,
          #ff99ac82 100%);
    }

    /*华为P30 天空之境*/
    #zm_3 {
      color: #555555;
      overflow: hidden;
      margin: 10px 0;
      padding: 15px 15px 15px 35px;
      /*border-radius: 10px;*/
      box-shadow: 6px 0 12px -5px rgb(253, 223, 234),
        -6px 0 12px -5px rgb(215, 240, 243);
      background-color: #ffdee9;
      background-image: linear-gradient(0deg, #ffdee9c4 0%, #b5fffc8f 100%);
      background-image: -webkit-linear-gradient(0deg,
          #ffdee9c4 0%,
          #b5fffc8f 100%);
    }

    /*小宇宙*/
    #zm_0 {
      color: #eeeeee;
      overflow: hidden;
      margin: 10px 0;
      padding: 15px 15px 15px 35px;
      /*border-radius: 10px;*/
      box-shadow: 6px 0 12px -5px rgb(12, 85, 141),
        -6px 0 12px -5px rgba(10, 58, 93, 0);
      background-image: radial-gradient(circle 263px at 100.2% 3%,
          rgba(12, 85, 141, 1) 31.1%,
          rgba(205, 181, 93, 1) 36.4%,
          rgba(244, 102, 90, 1) 50.9%,
          rgba(199, 206, 187, 1) 60.7%,
          rgba(249, 140, 69, 1) 72.5%,
          rgba(12, 73, 116, 1) 72.6%);
    }

    /*橄榄绿*/
    #zm_4 {
      color: #eeeeee;
      overflow: hidden;
      margin: 10px 0;
      padding: 15px 15px 15px 35px;
      /*border-radius: 10px;*/
      box-shadow: 6px 0 12px -5px rgb(68, 110, 92),
        -6px 0 12px -5px rgb(204, 212, 163);
      background-image: linear-gradient(102deg,
          rgba(68, 110, 92, 1) 17.4%,
          rgba(107, 156, 120, 1) 49.3%,
          rgba(154, 183, 130, 1) 83.4%,
          rgba(247, 237, 191, 1) 110.3%);
    }

    /*小太阳*/
    #zm_5 {
      color: #ffffff;
      overflow: hidden;
      margin: 10px 0;
      padding: 15px 15px 15px 35px;
      /*border-radius: 10px; */
      box-shadow: 6px 0 12px -5px rgb(253, 223, 234),
        -6px 0 12px -5px rgb(215, 240, 243);
      background-image: radial-gradient(circle farthest-corner at -8.9% 51.2%,
          rgba(255, 124, 0, 1) 0%,
          rgba(255, 124, 0, 1) 15.9%,
          rgba(255, 163, 77, 1) 15.9%,
          rgba(255, 163, 77, 1) 24.4%,
          rgba(19, 30, 37, 1) 24.5%,
          rgba(19, 30, 37, 1) 66%);
    }

    /*优雅紫*/
    #zm_6 {
      color: #ffffff;
      overflow: hidden;
      margin: 10px 0;
      padding: 15px 15px 15px 35px;
      /*border-radius: 10px;*/
      box-shadow: 6px 0 12px -5px rgb(175, 160, 208),
        -6px 0 12px -5px rgba(177, 161, 207, 0);
      background-image: radial-gradient(circle farthest-corner at 10% 20%,
          rgba(95, 117, 227, 1) 0%,
          rgba(188, 167, 205, 1) 90%);
    }

    /*深邃黑*/
    #zm_7 {
      color: #c7c7c7;
      overflow: hidden;
      margin: 10px 0;
      padding: 15px 15px 15px 35px;
      /*border-radius: 5px;*/
      box-shadow: 6px 0 12px -5px rgb(155, 170, 185),
        -6px 0 12px -5px rgba(177, 161, 207, 0);
      background-image: radial-gradient(circle farthest-corner at 10% 20%,
          rgba(0, 0, 0, 1) 0%,
          rgba(64, 64, 64, 1) 90.2%);
    }
  }

  .sendContent {
    padding: 0.38rem 0.5rem;

    ::v-deep .van-popover__action {
      width: 6.25rem;
    }

    .icon {
      width: 1.5rem;
      height: 1.5rem;
    }

    .sim {
      margin-right: 0.5rem;
    }
  }
}
</style>
