<template>
  <div id="smsList">
    <van-search v-model="keyword" placeholder="搜索短信" shape="round" clear-trigger="always" />
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list v-model:loading="loading" :finished="finished" :finished-text="list.length > 0 ? '没有更多了' : ''"
        @load="onLoad">
        <ul>
          <li class="smsContentList" v-for="(item, index) in list" :key="index">
            <!-- 图标 -->
            <div class="smsContentImgInfo" @click="sendSms(item)">
              <!-- 进行短信图像生成,如果有姓名,则生成姓名图像,否则生成默认图像 -->
              <van-image round none width="2.5rem" height="2.5rem" :src="
                item.name === `未知号码`
                  ? '../static/image/sms1.png'
                  : `https://ui-avatars.com/api/?name=${item.name}&length=1&background=random&size=58&bold=true&color=ff0000`
              " />
              <div class="smsContentInfo">
                <span>
                  {{ item.name === "未知号码" ? item.number : item.name }}
                </span>
                <p class="smsContentext">
                  {{ item.content }}
                </p>
              </div>
            </div>

            <!-- 通话时间及其他操作 -->
            <div class="smsContentOtherBtn">
              <span class="smstime">{{
                  format(item.date, "MM-dd HH:mm")
              }}</span>
              <!-- SIM卡1 -->
              <svg class="icon sim" style="color: #b2e7a7" aria-hidden="true" v-if="item.sim_id === 0">
                <use xlink:href="#icon-dual-sim-1-line"></use>
              </svg>
              <!-- SIM卡2 -->
              <svg class="icon sim" style="color: #1296db" aria-hidden="true" v-if="item.sim_id === 1">
                <use xlink:href="#icon-dual-sim-2-line"></use>
              </svg>
              <!-- 未知卡 -->
              <svg class="icon sim" style="color: #75bfdb" aria-hidden="true" v-if="item.sim_id === -1">
                <use xlink:href="#icon-Sim-Card"></use>
              </svg>
              <div class="smsContentSend">
                <!-- 发送短信 -->
                <svg class="icon sms" aria-hidden="true" @click="sendSms(item)">
                  <use xlink:href="#icon-duanxin"></use>
                </svg>
              </div>
            </div>
          </li>
        </ul>
      </van-list>
      <van-empty v-if="list.length <= 0" description="暂无数据" />
    </van-pull-refresh>
  </div>
</template>
<script>
import { ref, defineComponent } from 'vue';
import axios from '@/axios/axios'
import Util from "@/util/SmsForwardUtil";
import { useRouter } from 'vue-router'
import { useDebounced } from '@/util/debounce'
import DateFormat from '@/util/dateFormat';
import { GET_SMS_LIST } from "@/assets/api/api.js";
export default defineComponent({
  name: "SmsList",
  components: {
  },
  props: {
    type: Number
  },
  setup(props, { emit }) {
    const list = ref([]);
    const keywords = ref('');
    const loading = ref(false);
    const finished = ref(false);
    const page_num = ref(1);
    const page_size = ref(20);
    const refreshing = ref(false);
    const router = useRouter();

    const getPageList = () => {
      let timestamp = new Date().getTime();
      let data = {
        "data": {
          "type": props.type,
          "page_num": page_num.value,
          "page_size": page_size.value,
          "keyword": keywords.value
        },
        "timestamp": timestamp,
        "sign": Util.sisgn(timestamp, Util.sign())
      }
      axios.post(GET_SMS_LIST, data).then(response => {
        if (response.data.code === 200) {
          if (response.data.data.length >= 1) {
            loading.value = false;
            list.value.push(...response.data.data)
          } else {
            finished.value = true;
          }
        }
      })
    }
    const onLoad = () => {
      getPageList();
      page_num.value++				// 调用上面方法,请求数据		
    };
    const format = (date, fmt) => {
      return DateFormat.format(new Date(date), fmt)
    }
    const getTime = (date) => {
      return DateFormat.getTime(date)
    }
    const onRefresh = () => {
      finished.value = false;
      loading.value = true;
      page_num.value = 1;
      list.value = [];
      getPageList();
      refreshing.value = false
    };
    let keyword = useDebounced('', 500, (v) => {
      list.value = []
      keywords.value = v
      onRefresh()
    })
    const sendSms = (sms) => {
      let number = sms.number.replace(/\s+/g, '')
      emit('openSendContent', number,sms)
    };
    return {
      list,
      onLoad,
      loading,
      finished,
      onRefresh,
      refreshing,
      format,
      getTime,
      sendSms,
      keyword,
      keywords,
      useDebounced,
      getPageList,
      page_num, page_size
    };
  },
});
</script>
<style scoped lang="less">
#smsList {
  padding: 0.5rem;

  .van-search {
    padding: 0 0;
  }

  ::v-deep .van-field__clear {
    display: flex;
    width: 2.19rem;
    justify-content: right;
  }

  .van-list {
    margin-bottom: 3.25rem;
  }

  .smsContentList {
    position: relative;
    padding: 0 0.5rem;
    margin-top: 8px;
    width: 100%;
    height: auto;
    min-height: 4.0rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: @list-background;
    border: 1px solid @border-frame;
    border-radius: 0.83rem;
    box-sizing: border-box;

    .smsContentImgInfo {
      display: flex;
      align-items: flex-start;
      justify-content: center;

      ::v-deep .van-image__img {
        width: 2.5rem !important;
        height: 2.5rem !important;
      }

      .van-image--round {
        overflow: inherit;
      }

      .smsContentInfo {
        margin-left: 0.31rem;

        span {
          color: @sms-list-title-color;
          font-size: 0.88rem;
        }

        .smsContentext {
          font-size: 0.75rem;
          color: @sms-list-text-color;
        }
      }

      .icon {
        width: 2.25rem;
        height: 2.25rem;
      }
    }

    .smsContentOtherBtn {
      display: flex;
      flex-direction: column;

      .smstime {
        font-size: 0.7rem;
        position: absolute;
        top: .25rem;
        right: 2rem;
        color: @sms-list-time-color;
      }

      .icon {
        width: 1.25rem;
        height: 1.25rem;
      }

      .sim {
        position: absolute;
        top: 0.18rem;
        right: 0.18rem;
      }

      .smsContentSend {
        display: flex;
        justify-content: flex-end;
        margin-right: 0.33rem;

        .call,
        .sms {
          width: 1.8rem;
          height: 1.5rem;
        }
      }
    }
  }
}
</style>