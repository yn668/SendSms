import { createRouter, createWebHashHistory} from 'vue-router'
import store from '@/store/index.js'
 
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: () => import('../views/home.vue')
    },
    {
      path: '/phone',
      component: () => import('../views/phone.vue')
    },{
      path: '/contacts',
      component: () => import('../views/contacts.vue')
    },
    {
      path: '/sms',
      component: () => import('../views/sms.vue')
    },
    {
      path: '/setting',
      component: () => import('../views/setting.vue')
    },
    {
      path: '/account',
      component: () => import('../views/account.vue')
    }
  ]
  
})


router.beforeEach((to, from, next) => {
  if (localStorage.getItem('serverUrl')) {
    if (to.path === '/') {
      next({ path: '/phone' })
    }else {
      next()
    }
  } else {
    store.dispatch('IS_LOGIN_POPUP', true)
  }
});

export default router