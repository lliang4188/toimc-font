import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sid: '',
    isLogin: false,
    token: '',
    userInfo: {}
  },
  mutations: {
    setSid (state, value) {
      state.sid = value
    },
    setToken (state, value) {
      state.token = value
      localStorage.setItem('token', value)
    },
    // 设置用户信息
    setUserInfo (state, value) {
      if (value === '') return
      state.userInfo = value
      // 存储用户信息
      localStorage.setItem('userInfo', JSON.stringify(value))
    },
    // 设置登录信息
    setIsLogin (state, value) {
      state.isLogin = value
    }
  },
  getters: {
    uid: (state) => state.userInfo ? state.userInfo._id : ''
  },
  actions: {}
})
