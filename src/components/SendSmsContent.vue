<template>
  <div class="sendSmsContent">
    <van-field
      class="recipient"
      v-model="phone_numbers"
      label-width="3.5em"
      label="收件人"
      :autofocus="true"
      :formatter="formatter"
      round
      placeholder="请输入收件人手机号,如有多个号码请用,分开"
    />
    <div class="sendMain">
      <div v-for="(item, index) in sendList" :key="index">
        <div :id="'zm_6'" style="float:left" v-if="item.type === 1">
          <p>{{ item.content }}</p>
        </div>
        <div :id="'zm_0'" style="float:right" v-if="item.type === 2">
          <p>{{ item.content }}</p>
        </div>
      </div>
    </div>
    <van-field
      class="sendContent"
      v-model="msg_content"
      rows="1"
      label-width="2.5em"
      autosize
      label="内容"
      maxlength="70"
      type="textarea"
      placeholder="请输入发信内容"
    >
      <template #button>
        <van-popover
          v-model:show="showPopover"
          :actions="actions"
          @select="onSelect"
          placement="top"
        >
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
    smsContent: Object,
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
    if (props.smsContent) {
       sendList.value.push(props.smsContent)
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
        const data=   {
            content:msg_content.value,
            type:2
          }
          sendList.value.push(data)
          setTimeout(() => {
            emit('close')
          }, 2500);
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
    #zm_6{
      /*圆角值,在此定义*/
      border-radius: 1.25rem;
      width: 60%;
      height: auto;
      float: right;
      word-break: break-all;
    }

    /*小宇宙*/
    #zm_0 {
      color: #eeeeee;
      overflow: auto;
      max-height: 50vh;
      margin: 10px 10px;
      padding: 15px 15px 15px 35px;
      /*border-radius: 10px;*/
      box-shadow: 6px 0 12px -5px rgb(12, 85, 141),
        -6px 0 12px -5px rgba(10, 58, 93, 0);
      background-image: radial-gradient(
        circle 263px at 100.2% 3%,
        rgba(12, 85, 141, 1) 31.1%,
        rgba(205, 181, 93, 1) 36.4%,
        rgba(244, 102, 90, 1) 50.9%,
        rgba(199, 206, 187, 1) 60.7%,
        rgba(249, 140, 69, 1) 72.5%,
        rgba(12, 73, 116, 1) 72.6%
      );
    }


    /*优雅紫*/
    #zm_6 {
      color: #ffffff;
      overflow: auto;
      max-height: 50vh;
      margin: 10px 10px;
      padding: 15px 15px 15px 35px;
      /*border-radius: 10px;*/
      box-shadow: 6px 0 12px -5px rgb(175, 160, 208),
        -6px 0 12px -5px rgba(177, 161, 207, 0);
      background-image: radial-gradient(
        circle farthest-corner at 10% 20%,
        rgba(95, 117, 227, 1) 0%,
        rgba(188, 167, 205, 1) 90%
      );
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
