/**
 * 后台接口
 */
import { ENVIRONMENT_CONFIG } from './config'
import store from '@/store/index.js'
// 当前环境
export const AT_PRESENT_ENVIRONMENT = ENVIRONMENT_CONFIG

// Api代理
// @ts-ignore
const API_PROXY = store.state.serverUrl ? store.state.serverUrl : localStorage.getItem('serverUrl')
/**
 * 配置
 */
// 查取可用配置
export const GET_CONFIGURATION = API_PROXY + '/config/query'
// 一键换新机
export const UPGRADE = API_PROXY + '/clone/pull'
//远程查通话
export const GET_CALL_LIST = API_PROXY + '/call/query'
//远程查话谱
export const GET_CONTACTS = API_PROXY + '/contact/query'
//远程查短信
export const GET_SMS_LIST = API_PROXY + '/sms/query'
//远程发短信
export const SEND_SMS = API_PROXY + '/sms/send'
//远程查电量
export const GET_CELL = API_PROXY + '/battery/query'

