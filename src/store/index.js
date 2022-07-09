import { createStore } from 'vuex'

const store = createStore({
    state: {
        // 加载动画
        showLoading: false,
        // 登录弹窗
        loginPopup: false,
        serverUrl: '',
        sign: '',
        theme:'light'
    },
    mutations: {
        // 设置加载动画
        SET_LOADING(state, status) {
            state.showLoading = status
        },
        // 设置加载动画
        SET_LOGIN_POPUP(state, status) {
            state.loginPopup = status
        },
        SET_SIGN(state, sign) {
            state.sign = sign
        },
        SET_SERVER_URL(state, serverUrl) {
            state.serverUrl = serverUrl
        },
        SET_THEME(state, theme) {
            state.theme = theme
        },
    },
    actions: {
        // 设置加载动画
       HANDLE_SET_LOADING(context, status) {
            context.commit('SET_LOADING', status)
        },
        // 隐藏显示登录弹窗
        IS_LOGIN_POPUP(context, status) {
            context.commit('SET_LOGIN_POPUP', status)
        },
        SAVE_SIGN(context, sign) {
            context.commit('SET_SIGN', sign)
        },
        SAVE_SERVER_URL(context, serverUrl) {
            context.commit('SET_SERVER_URL', serverUrl)
        },
        SAVE_THEME(context, theme) {
            context.commit('SET_THEME', theme)
        },
    },
    modules: {},
})

export default store
