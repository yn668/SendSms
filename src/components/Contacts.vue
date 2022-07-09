<template>
  <div id="contacts">
    <van-search v-model="keyword" placeholder="搜索联系人" shape="round" 
    clear-trigger="always" lazy/>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        :finished-text="list.length > 0 ? '没有更多了' : ''"
        @load="onLoad"
      >
        <ul>
          <li class="contactslist" v-for="(item, index) in list" :key="index">
            <!-- 图标 -->
            <div class="contactsImgInfo">
                <van-image
                round
                cover
                width="2.5rem"
                height="2.5rem"
                :src="`https://ui-avatars.com/api/?name=${(item.name)}&length=1&background=random&size=128&bold=true&color=ff0000`"
/>
              <div class="contactsinfo">
               <span> {{ item.name }}</span>
                <p> {{item.phone_number}}</p>
              </div>
            </div>
            <!-- 通话时间及其他操作 -->
            <div class="contactsOtherBtn">
              <div class="contactsSms">
                <!-- 拨打电话 -->
                <a :href="'tel:'+(item.phone_number).replace(/\s+/g, '')"><svg class="icon call" aria-hidden="true">
                  <use xlink:href="#icon-dianhua1"></use>
                </svg></a>
                <!-- 发送短信 -->
                <svg class="icon sms" aria-hidden="true" @click="sendSms(item.phone_number)">
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
import { ref,onBeforeMount } from 'vue';
  import axios from '@/axios/axios'
import Util from "@/util/SmsForwardUtil";
  import { useRouter } from 'vue-router'
import {useDebounced} from '@/util/debounce'
import DateFormat from '@/util/dateFormat';
  import { GET_CONTACTS} from "@/assets/api/api.js";
export default {
    name: "Contacts",
    components:{
    },
     props:{

    },
    setup(props) {
    const list = ref([]);
    const loading = ref(false);
    const finished = ref(false);
    const refreshing = ref(false);
    const router = useRouter();
    onBeforeMount(() => {
      })
      const getPageList = (v) => {
        // 判断用户搜索的手机号还是内容
        let numname = isNaN(v)? v : ''
        let phone_number = isNaN(v) ? '' : v
        let timestamp = new Date().getTime();
        let data= {
          "data": {
            "name": numname,
            'phone_number':phone_number
          },
          "timestamp": timestamp,
          "sign": Util.sisgn(timestamp,  Util.sign())
        }
        axios.post( GET_CONTACTS, data).then(response => {
          if (response.data.code === 200) {
            list.value = response.data.data
            finished.value = true;
          }
        })
      }
    const onLoad = () => {
        getPageList();					// 调用上面方法,请求数据		
    };
   const format=(date, fmt)=> {
      return DateFormat.format(new Date(date), fmt)
    }
     const getTime=(date)=> {
      return DateFormat.getTime(date)
    }
    // 下拉刷新
    const onRefresh = () => {
    finished.value = false;	
    loading.value = true;			
    list.value = [];				
    getPageList(); 
    refreshing.value = false
    };
    // 进行节流操作
     let keyword = useDebounced('',800,(v)=>{
          getPageList(v) 
      })
     const sendSms = (num) => {
        let number = num.replace(/\s+/g, '')
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
      sendSms,
      keyword,
      useDebounced,
      getPageList,
    };
  },
};
</script>
<style scoped lang="less">
#contacts {
  padding: .5rem;
    height: 98vh;
  overflow: auto;
  background-color: @dominant-tone;
  .van-search {
   padding: 0 0;
  }
::v-deep .van-field__clear {
    display: flex;
    width: 2.19rem ;
    justify-content: right;
   }
  .van-list {
    margin-bottom: 3.25rem;
  }
  .contactslist {
    position: relative;
    padding: 0 .5rem;
    margin-top: 8px;
    width: 100%;
    height: 3.13rem;
    display: flex;
    align-items: center;
   justify-content: space-between;
    background-color: @list-background;
    border: 1px solid @border-frame;
    border-radius: 0.83rem;
    box-sizing: border-box;
    .contactsImgInfo {
      display: flex;
      align-items: center;
      justify-content: center;
      .contactsinfo {
        margin-left: .31rem;
        span {
            font-size: .88rem;
            color: @white;
        }
        p {
          font-size: .75rem;
           color: @white;
        }
      }
      .icon {
        width: 2.25rem;
        height: 2.25rem;
      }
    }
    .contactsOtherBtn {
      span {
        font-size: 0.88rem;
      }
      .icon {
        width: 1.25rem;
        height: 1.25rem;
      }
      .contactsSms {
        display: flex;
        justify-content: flex-end;
        margin-right: 0.63rem;
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