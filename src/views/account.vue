<template>
  <div id="Account">
    <van-nav-bar
      title="账户"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <van-contact-card type="add" @click="onAdd" add-text="添加账户" />

    <van-radio-group
      v-model="checked"
      v-for="(item, index) in accountList"
      :key="index"
    >
      <van-swipe-cell :before-close="beforeClose" :name="item.id">
        <template #left>
          <van-button square type="primary" class="delete-button" text="编辑" />
        </template>
        <van-cell center clickable @click="ClickChecked(item.id)">
          <!-- 使用 title 插槽来自定义标题 -->
          <template #title>
            <div class="accountInfo">
              <van-image
                round
                width="2.5rem"
                height="2.5rem"
                :src="
                  `https://ui-avatars.com/api/?name=` +
                  index +
                  `&background=random&rounded=true`
                "
              />
              <span class="custom-title">{{ item.serverUrl }}</span>
            </div>
          </template>
          <template #right-icon>
            <van-radio
              checked-color="#ff66ff"
              :name="item.id"
              @click="ClickChecked(item.id)"
            />
          </template>
        </van-cell>
        <template #right>
          <van-button square text="删除" type="danger" class="delete-button" />
        </template>
      </van-swipe-cell>
      <div class="line"></div>
    </van-radio-group>
    <!-- 新增账户弹窗 -->
    <van-action-sheet
      v-model:show="show"
      title="新增账户"
      :style="{ height: '50%' }"
    >
      <div id="AccountList">
        <van-image
          round
          width="100px"
          height="100px"
          src="https://img.ichuguang.com/imgs/2022/06/63e13682c4d10b45.jpg"
        />
        <van-form @submit="onSubmit">
          <van-cell-group inset>
            <van-field
              v-model="username"
              name="serverUrl"
              label="服务器"
              placeholder="服务器"
              :rules="[{ required: true, message: '请填服务器地址' }]"
            />
            <van-field
              v-model="password"
              :type="!passwordStatus ? 'password' : 'text'"
              :right-icon="passwordStatus ? 'eye' : 'closed-eye'"
              @click-right-icon="passwordStatus = !passwordStatus"
              name="sign"
              label="秘钥"
              placeholder="秘钥"
              :rules="[{ required: true, message: '请填写秘钥' }]"
            >
            </van-field>
          </van-cell-group>
          <div style="margin: 16px">
            <van-button round block type="primary" native-type="submit">
              确认添加
            </van-button>
          </div>
        </van-form>
      </div>
    </van-action-sheet>
    <!-- 修改账户弹窗 -->
    <van-action-sheet
      v-model:show="editShow"
      title="修改账户"
      :style="{ height: '50%' }"
    >
      <div id="AccountList">
        <van-image
          round
          width="100px"
          height="100px"
          src="https://img.ichuguang.com/imgs/2022/06/63e13682c4d10b45.jpg"
        />
        <van-form @submit="onEditSubmit">
          <van-cell-group inset>
            <van-field
              v-model="username"
              name="serverUrl"
              label="服务器"
              placeholder="服务器"
              :rules="[{ required: true, message: '请填服务器地址' }]"
            />
            <van-field
              v-model="password"
              :type="!passwordStatus ? 'password' : 'text'"
              :right-icon="passwordStatus ? 'eye' : 'closed-eye'"
              @click-right-icon="passwordStatus = !passwordStatus"
              name="sign"
              label="秘钥"
              placeholder="秘钥"
              :rules="[{ required: true, message: '请填写秘钥' }]"
            >
            </van-field>
          </van-cell-group>
          <div style="margin: 16px">
            <van-button round block type="primary" native-type="submit">
              确认修改
            </van-button>
          </div>
        </van-form>
      </div>
    </van-action-sheet>
  </div>
</template>
<script>
import { ref, computed, onBeforeMount } from 'vue'
// 导入Axios
import axios from '@/axios/axios'
import { Notify } from 'vant'
import store from '../store/index'
import { useRouter } from 'vue-router'
import Util from '@/util/SmsForwardUtil'
import { Toast, Dialog } from 'vant'
export default {
    name: 'Account',
    components: {},
    setup() {
        onBeforeMount(() => {
            accountList.value =
                JSON.parse(window.localStorage.getItem('accountList')) ?? []
            checked.value = JSON.parse(window.localStorage.getItem('ID'))
        })
        const checked = ref(null)
        const accountList = ref([])
        const username = ref('')
        const editId = ref(null)
        const password = ref('')
        const passwordStatus = ref(false)
        const show = ref(false)
        const editShow = ref(false)
        const onClickLeft = () => history.back()
        const onAdd = () => {
            show.value = true
            username.value = ''
            password.value = ''
        }
        // 点击切换账户逻辑
        const ClickChecked = (id) => {
            ChangeChecked(id)
        }
        // 切换账户逻辑
        const ChangeChecked = (id) => {
            checked.value = JSON.parse(window.localStorage.getItem('ID'))
            if (id !== checked.value) {
                return new Promise((resolve) => {
                    Dialog.confirm({
                        title: '确定切换账户吗？',
                    })
                        .then((resolve) => {
                            let changeThisSelect = accountList.value.find(
                                (item) => item.id == id
                            )
                            console.log(changeThisSelect)
                            // // 切换账户尝试发起请求逻辑
                            let timestamp = new Date().getTime()
                            let data = {
                                data: {},
                                timestamp: timestamp,
                                sign: Util.sisgn(
                                    timestamp,
                                    changeThisSelect.sign
                                ),
                            }
                            let url =
                                changeThisSelect.serverUrl + '/config/query'
                            axios
                                .post(url, data)
                                .then((response) => {
                                    if (response.data.code === 200) {
                                        Util.serverUrl(
                                            changeThisSelect.serverUrl
                                        )
                                        Util.sign(changeThisSelect.sign)
                                        window.localStorage.setItem(
                                            'ID',
                                            changeThisSelect.id
                                        )
                                        store.dispatch(
                                            'SAVE_SERVER_URL',
                                            changeThisSelect.serverUrl
                                        )
                                        store.dispatch(
                                            'SAVE_SIGN',
                                            changeThisSelect.sign
                                        )
                                        checked.value = changeThisSelect.id
                                        checked.value = JSON.parse(
                                            window.localStorage.getItem('ID')
                                        )
                                        Notify({
                                            type: 'success',
                                            message:
                                                '账户切换成功,请手动刷新页面生效配置',
                                        })
                                    } else {
                                        Notify({
                                            type: 'danger',
                                            message: response.data.msg,
                                        })
                                    }
                                })
                                .catch((response) => {
                                    Notify({
                                        type: 'danger',
                                        message:
                                            '服务器连接失败,请右滑编辑检查账户信息是否正确',
                                    })
                                })
                        })
                        // 取消逻辑
                        .catch(() => { })
                })
            }
        }
        // 新增账户本地操作
        const onSubmit = (values) => {
            // 取最大id递增,防止用索引删除造成id冲突
            // 新增操作
            let arr = accountList.value.map((item) => item.id)
            let max = Math.max.apply(null, arr)
            values.id = max + 1
            accountList.value.push(values)
            let locAccountList = JSON.stringify(accountList.value)
            window.localStorage.setItem('accountList', locAccountList)
            Notify({
                type: 'success',
                message: '账户添加成功,请选择账户进行登陆校验',
            })
            show.value = false
        }
        // 修改账户本地操作
        const onEditSubmit = (values) => {
            // 取最大id递增,防止用索引删除造成id冲突
            // 新增操作
            values.id = editId
            let numID = accountList.value
                .map((item) => item.id)
                .indexOf(editId.value)
            accountList.value.splice(numID, 1, values)
            let locAccountList = JSON.stringify(accountList.value)
            window.localStorage.setItem('accountList', locAccountList)
            Notify({
                type: 'success',
                message: '账户本地修改成功,请选择账户进行登陆校验',
            })
            editShow.value = false
        }
        // 编辑账户本地操作
        const onEdit = (id) => {
            if (id === JSON.parse(window.localStorage.getItem('ID'))) {
                return Notify({
                    type: 'warning',
                    message: '请勿编辑当前选择项，你可以尝试新增账户',
                })
            } else {
                editShow.value = true
                // 取最大id递增,防止用索引删除造成id冲突
                let obj = accountList.value.find((item) => item.id === id)
                username.value = obj.serverUrl
                password.value = obj.sign
                editId.value = id
            }
        }
        // 删除账户逻辑操作,position 为关闭时点击的位置
        const beforeClose = ({ position, name }) => {
            switch (position) {
                case 'left':
                    return onEdit(name)
                case 'cell':
                case 'outside':
                    return true
                case 'right':
                    return new Promise((resolve) => {
                        Dialog.confirm({
                            title: '确定删除吗？',
                        })
                            .then((resolve) => {
                                if (
                                    name ===
                                    JSON.parse(
                                        window.localStorage.getItem('ID')
                                    )
                                ) {
                                    return Notify({
                                        type: 'warning',
                                        message:
                                            '不能删除当前启用项,请切换账号再尝试删除',
                                    })
                                } else {
                                    let numID = accountList.value
                                        .map((item) => item.id)
                                        .indexOf(name)
                                    accountList.value.splice(numID, 1)
                                    let locAccountList = JSON.stringify(
                                        accountList.value
                                    )
                                    window.localStorage.setItem(
                                        'accountList',
                                        locAccountList
                                    )
                                }
                            })
                            .catch(() => {
                                // on cancel
                            })
                    })
            }
        }
        return {
            onClickLeft,
            onAdd,
            checked,
            show,
            editId,
            editShow,
            username,
            password,
            accountList,
            onSubmit,
            passwordStatus,
            beforeClose,
            ClickChecked,
            ChangeChecked,
            onEditSubmit,
        }
    },
}
</script>
<style scoped lang="less">
#Account {
  height: 100vh;
  overflow: auto;
  background-color: @dominant-tone;
}

::v-deep .van-contact-list__bottom {
  display: none;
}

.goods-card {
  margin: 0;
  background-color: @dominant-tone;
}

.delete-button {
  height: 100%;
}

.van-image {
  float: left;
}

.accountInfo {
  display: flex;
  align-items: center;
}

.custom-title {
  margin-left: 0.31rem;
}

.line {
  height: 2px;
  background: repeating-linear-gradient(
    245deg,
    #c18c8c 0,
    #966affc4 20%,
    #ac7bd1cc 0,
    #726e45 25%,
    #dfcdcd 0,
    #d919fa0d 45%,
    transparent 0,
    transparent 50%
  );
  background-size: 80px;
}

.content {
  padding: 16px 16px 160px;
}

#AccountList {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: @dominant-tone;
}
</style>
