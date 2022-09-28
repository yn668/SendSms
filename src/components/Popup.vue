<template>
  <div id="login">
    <van-popup :transition-appear="true" v-model:show="show" :round="true" closeable
      :style="{ height: '350px', width: '95%' ,display: `flex`,flexDirection: `column`,justifyContent:`center`,alignItems: `center`}">
      <van-image round width="100px" height="100px" src="https://img.ichuguang.com/imgs/2022/06/63e13682c4d10b45.jpg" />
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field v-model="username" name="serverUrl" label="服务器" placeholder="服务器"
            :rules="[{ required: true, message: '请填服务器地址' }]" />
          <van-field v-model="password" :type="!passwordStatus ? 'password' : 'text'"
            :right-icon="passwordStatus ? 'eye' : 'closed-eye'" @click-right-icon="passwordStatus = !passwordStatus"
            name="sign" label="秘钥" placeholder="秘钥" :rules="[{ required: true, message: '请填写秘钥' }]">
          </van-field>
        </van-cell-group>
        <div style="margin: 16px">
          <van-button round block type="primary" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
    </van-popup>
  </div>
</template>
<script>
import { ref, computed } from 'vue';
// 导入Axios
import axios from '@/axios/axios'
import { Notify } from 'vant';
import store from '../store/index'
import { useRouter } from 'vue-router'
import Util from "@/util/SmsForwardUtil";
export default {
  name: "Popup",
  setup() {
    const username = ref('');
    const password = ref('');
    const passwordStatus = ref(false);
    const router = useRouter();
    const show = computed(() => {
      return (store.state.loginPopup)
    });
    const onSubmit = (values) => {
      let timestamp = new Date().getTime();
      let data = {
        "data": {},
        "timestamp": timestamp,
        "sign": Util.sisgn(timestamp, values.sign)
      }
      let url = values.serverUrl + '/config/query'
      axios.post(url, data).then(response => {
        if (response.data.code === 200) {
          router.push('/phone')
          Notify({ type: 'success', message: '获取配置成功' });
          Util.serverUrl(values.serverUrl)
          Util.sign(values.sign)
          values.id = 1
          let AccountList = []
          AccountList.push(values)
          let locAccountList = JSON.stringify(AccountList)
          window.localStorage.setItem('accountList', locAccountList)
          window.localStorage.setItem('ID', values.id)
          store.dispatch('SAVE_SERVER_URL', values.serverUrl)
          store.dispatch('SAVE_SIGN', values.sign)
          show.value = false;
        } else {
          Notify({ type: 'danger', message: response.data.msg });
        }
      }).catch(response => {
        Notify({ type: 'danger', message: '服务器连接失败,请检查地址' });
      })
    };
    return {
      show,
      username,
      password,
      onSubmit,
      passwordStatus
    };
  },
};
</script>
<style lang="less" scoped>
#login {
  .van-popup {
    display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: @dominant-tone;
  }

  .van-form {
    margin-top: 5%;
  }
}
</style>
