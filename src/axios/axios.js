/**
 * Axios拦截器
 */
// 导入Axios
import axios from 'axios'
// 导入Router和Stores
import router from '@/router/index.js'
import store from '@/store/index.js'
import { Notify } from 'vant';
let instance = axios.create({
  // 设置响应超时时长
  timeout: 1000 * 60 * 5,
  // 请求头设置
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
})
// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 是否关闭加载动画
    let cancelLoading = config && config.params && config.params.cancelLoading
    // 启动动画
    !cancelLoading ? store.dispatch('HANDLE_SET_LOADING', true) : ''
    if(localStorage.getItem('serverUrl')) {
      store.dispatch('IS_LOGIN_POPUP', false)
    }else {
      store.dispatch('IS_LOGIN_POPUP', true)
      router.replace({ path: '/' })
    }
    return config
  },
  // 返回错误信息
  error => {
    Notify({  type: 'danger', message: '服务器连接失败,请检查地址或重新再试'});
    return Promise.reject(error)
  })

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 关闭动画
    store.dispatch('HANDLE_SET_LOADING', false)
    // 拦截响应
    if (response.data.code) {
      switch (response.data.code) {
        // 如果状态码为500跳转到首页，重新登录
        case (500):
          Notify({  type: 'danger', message: response.data.msg});
          localStorage.clear();
          router.replace({ path: '/' })
          store.dispatch('IS_LOGIN_POPUP', true)
      }
    }
    return response
  },
  // 接口无响应时处理
  (error) => {
    if (error) {
      let time = new Date()
      Notify({  type: 'danger', message: '网络响应繁忙,请检查接口重新登录并刷新页面'});
      // localStorage.clear();
      // router.replace({ path: '/' })
      // store.dispatch('IS_LOGIN_POPUP', true)
      // 异常捕捉
      store.dispatch('HANDLE_SET_LOADING', false)
      console.warn('SMS' + error + '.' + ' ( ' + time.toLocaleString() + ' ) ')
    }
    // 返回接口返回的错误信息
    return Promise.reject(error)
  })

export default instance
