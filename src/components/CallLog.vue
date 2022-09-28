<template>
  <div id="calllog">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        :finished-text="list.length > 0 ? '没有更多了' : ''"
        @load="onLoad"
      >
        <!-- <van-cell
          v-for="(item, index) in list"
          :key="index"
          :title="item.number"
        /> -->
        <ul>
          <li class="callloglist" v-for="(item, index) in list" :key="index">
            <!-- 图标及电话号和通话时长 -->
            <div class="callImgInfo">
              <!-- 未接 -->
              <svg class="icon" aria-hidden="true" v-if="item.type === 3">
                <use
                  xlink:href="#icon-dianhuabujieting-
"
                ></use>
              </svg>
              <!-- 呼出 -->
              <svg class="icon" aria-hidden="true" v-if="item.type === 1">
                <use
                  xlink:href="#icon-caidanlan-bangong-laidianCTI
"
                ></use>
              </svg>
              <!-- 呼入 -->
              <svg class="icon" aria-hidden="true" v-if="item.type === 2">
                <use
                  xlink:href="#icon-caidanlan-bangong-kuaisulaidianjilu
"
                ></use>
              </svg>
              <div class="callinfo">
               <span> {{ item.name ? item.name : item.number }}</span>
                <p>通话时长:{{ getTime(item.duration) }}</p>
              </div>
            </div>
            <!-- 通话时间及其他操作 -->
            <div class="callOtherBtn">
              <span style="margin-right: 0.63rem">{{
                format(item.dateLong, "yyyy-MM-dd HH:mm:ss")
              }}</span>
              <!-- SIM卡1 -->
              <svg
                class="icon sim"
                style="color: #b2e7a7"
                aria-hidden="true"
                v-if="item.sim_id === 0"
              >
                <use xlink:href="#icon-dual-sim-1-line"></use>
              </svg>
              <!-- SIM卡2 -->
              <svg
                class="icon sim"
                style="color: #1296db"
                aria-hidden="true"
                v-if="item.sim_id === 1"
              >
                <use xlink:href="#icon-dual-sim-2-line"></use>
              </svg>
              <!-- 未知卡 -->
              <svg
                class="icon sim"
                style="color: #75bfdb"
                aria-hidden="true"
                v-if="item.sim_id === -1"
              >
                <use xlink:href="#icon-Sim-Card"></use>
              </svg>
              <div class="callSms">
                <!-- 拨打电话 -->
                <a :href="'tel:'+(item.number).replace(/\s+/g, '')"><svg class="icon call" aria-hidden="true">
                  <use xlink:href="#icon-dianhua"></use>
                </svg></a>
                <!-- 发送短信 -->
                <svg class="icon sms" aria-hidden="true" @click="sendSms(item.number)">
                  <use xlink:href="#icon-duanxin-"></use>
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
import { ref,onBeforeMount } from 'vue';
  import axios from '@/axios/axios'
import Util from "@/util/SmsForwardUtil";
  import { useRouter } from 'vue-router'
import DateFormat from '@/util/dateFormat';
  import { GET_CALL_LIST} from "@/assets/api/api.js";
export default {
    name: "CallLog",
     props:{
        type:Number,
        phone_number:String
    },
    setup(props) {
    const list = ref([]);
    const loading = ref(false);
    const finished = ref(false);
    const refreshing = ref(false);
    const router = useRouter();
    // 初始化类型
    const type = props.type;
    const phone_number = props.phone_number;
    const page_num = ref(1);
    const page_size = ref(10);
    onBeforeMount(() => {
      
      })
      // 获取通话记录数据
      const getPageList = () => {
        let timestamp = new Date().getTime();
         let data= {
          "data": {
            "type": props.type,
            "page_num": page_num.value,
            "page_size": page_size.value,
            'phone_number':props.phone_number
          },
          "timestamp": timestamp,
          "sign": Util.sisgn(timestamp,  Util.sign())
        }
        axios.post( GET_CALL_LIST, data).then(response => {
          if (response.data.code === 200) {
            if(response.data.data.length >=1) {
            loading.value = false;
            list.value.push(...response.data.data)
            }else {
             finished.value = true;
            }
          }
        })
      }
    const onLoad = () => {
      	// 调用上面方法,请求数据
        getPageList();				
        // 页面增加
        page_num.value++		
    };
   const format=(date, fmt)=> {
      return DateFormat.format(new Date(date), fmt)
    }
     const getTime=(date)=> {
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
    // 发送短信去除通话手机号空格
     const sendSms = (num) => {
        let number = num.replace(/\s+/g, '')
        // 路由传参至短信页面
        router.push(`/sms?number=${number}`)
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
      type,
      sendSms,
      phone_number,
      getPageList,
      page_num,page_size
    };
  },
};
</script>
<style scoped lang="less">

#calllog {
  padding: 0.5rem;
  .van-list {
    margin-bottom: 3.25rem;
  }
  .callloglist {
    position: relative;
    margin-top: 0.5rem;
    width: 100%;
    height: 3.13rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: @list-background;
    border: .96px solid @border-frame;
    border-radius: .83rem;
    box-sizing: border-box;
    .callImgInfo {
      display: flex;
      align-items: center;
      justify-content: center;
      .callinfo {
    width: 7.5rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
        p {
          font-size: 0.88rem;
          color: @white;
        }
        span {
          color: @white;
        }
      }
      .icon {
        width: 2.25rem;
        height: 2.25rem;
      }
    }
    .callOtherBtn {
      display: flex;
      flex-direction: column;
      span {
        font-size: .88rem;
        color: @white;
      }
      .icon {
        width: 1.25rem;
        height: 1.25rem;
      }
      .sim {
        position: absolute;
        top: .18rem;
        right: .18rem;
      }
      .callSms {
        display: flex;
        justify-content: flex-end;
        margin-right: .63rem;
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