import store from '@/store'
import jwt from 'jsonwebtoken'
import moment from 'dayjs'
import routes from './routers'

import Vue from 'vue'
import Router from 'vue-router'
// import { instance } from '@/utils/errorHandle'

Vue.use(Router)

const router = new Router(routes)

// 1. 基于角色的路由守卫
// 2. 组件级的权限控制 -> directive
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  if (token !== '' && token !== null) {
    const payload = jwt.decode(token)
    if (moment().isBefore(moment(payload.exp * 1000))) {
      // 取 localStorage缓存里面的token信息 + 用户信息
      // 8-24小，refresh token 1个月
      store.commit(
        'setToken',
        token
      )
      store.commit(
        'setUserInfo',
        userInfo
      )
      store.commit(
        'setIsLogin',
        true
      )
      if (!store.state.ws) {
        store.commit('initWebSocket', {})
      }
    } else {
      localStorage.clear()
    }
  }
  // 权限判，meta远数据
  if (to.matched.some(record => record.meta.requiredAuth)) {
    const isLogin = store.state.isLogin
    // 需要用户登录的页面
    if (isLogin) {
      // 已经登录状态
      next()
    } else {
      // 未登录状态
      next('/login')
    }
  } else {
    // 公共页面，不需要用户登录
    next()
  }
})

export default router
