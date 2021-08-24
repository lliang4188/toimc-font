import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import store from '@/store'
import jwt from 'jsonwebtoken'
import moment from 'dayjs'

Vue.use(Router)

const Login = () => import(/* webpackChunkName: 'login' */'./views/Login.vue')
const Reg = () => import(/* webpackChunkName: 'reg' */'./views/Reg.vue')
const Forget = () => import(/* webpackChunkName: 'forget' */'./views/Forget.vue')
const Index = () => import(/* webpackChunkName: 'index' */'./views/channels/Index.vue')
const Template1 = () => import(/* webpackChunkName: 'template1' */'./views/channels/Template1.vue')
const Center = () => import(/* webpackChunkName: 'center' */'./views/Center.vue')
const UserCenter = () => import(/* webpackChunkName: 'user-center' */'./components/user/Center.vue')
const Setting = () => import(/* webpackChunkName: 'setting' */'./components/user/Setting.vue')
const Posts = () => import(/* webpackChunkName: 'user-posts' */'./components/user/Post.vue')
const Msg = () => import(/* webpackChunkName: 'user-msg' */'./components/user/Msg.vue')
const Other = () => import(/* webpackChunkName: 'other' */'./components/user/Other.vue')
const User = () => import(/* webpackChunkName: 'user' */'./views/User.vue')
const MyInfo = () => import(/* webpackChunkName: 'info' */'./components/user/common/MyInfo.vue')
const PicUpload = () => import(/* webpackChunkName: 'pic-upload' */'./components/user/common/PicUpload.vue')
const Passwd = () => import(/* webpackChunkName: 'password' */'./components/user/common/Password.vue')
const Accounts = () => import(/* webpackChunkName: 'accounts' */'./components/user/common/Accounts.vue')
const MyPost = () => import(/* webpackChunkName: 'mypost' */'./components/user/common/MyPost.vue')
const MyCollection = () => import(/* webpackChunkName: 'mycollection' */'./components/user/common/MyCollection.vue')
const NoFound = () => import(/* webpackChunkName: '404' */'./views/Nofound.vue')
const Confirm = () => import(/* webpackChunkName: 'confirm' */'./views/Confirm.vue')
const Reset = () => import(/* webpackChunkName: 'reset' */'./views/Reset.vue')
const Add = () => import(/* webpackChunkName: 'add' */'./components/contents/Add.vue')
const Edit = () => import(/* webpackChunkName: 'edit' */'./components/contents/Edit.vue')
const Detail = () => import(/* webpackChunkName: 'detail' */'./components/contents/Detail.vue')

const router = new Router({
  linkExactActiveClass: 'layui-this',
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '',
          name: 'index',
          component: Index
        },
        {
          path: '/index/:catalog',
          name: 'catalog',
          component: Template1
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/reg',
      name: 'reg',
      component: Reg,
      beforeEnter: (to, from, next) => {
        if (from.name === 'login') {
          next()
        } else {
          next('/login')
        }
      }
    },
    {
      path: '/confirm',
      name: 'confirm',
      component: Confirm
    },
    {
      path: '/reset',
      name: 'reset',
      component: Reset
    },
    {
      path: '/forget',
      name: 'forget',
      component: Forget
    },
    {
      path: '/add',
      name: 'add',
      component: Add,
      meta: { requiredAuth: true }
    },
    {
      path: '/edit/:tid',
      props: true,
      name: 'edit',
      component: Edit,
      meta: { requiredAuth: true },
      beforeEnter (to, from, next) {
        // 正常情况 detail
        if (['detail', 'mypost'].indexOf(from.name) !== -1 && to.params.page && to.params.page.isEnd === '0') {
          next()
        } else {
          const editData = localStorage.getItem('editData')
          if (editData && editData !== '') {
            const editObj = JSON.parse(editData)
            if (editObj.isEnd === '0') {
              next()
            } else {
              next('/')
            }
          } else {
            next('/')
          }
        }
      }
    },
    {
      path: '/detail/:tid',
      name: 'detail',
      props: true,
      component: Detail
    },
    {
      path: '/user/:uid',
      name: 'home',
      props: true,
      component: User
    },
    {
      path: '/center',
      component: Center,
      linkActiveClass: 'layui-this',
      meta: { requiredAuth: true },
      children: [
        {
          path: '',
          name: 'center',
          component: UserCenter
        },
        {
          path: 'set',
          component: Setting,
          children: [
            {
              path: '',
              name: 'info',
              component: MyInfo
            },
            {
              path: 'pic',
              name: 'pic',
              component: PicUpload
            },
            {
              path: 'passwd',
              name: 'passwd',
              component: Passwd
            },
            {
              path: 'account',
              name: 'account',
              component: Accounts
            }
          ]
        },
        {
          path: 'posts',
          component: Posts,
          children: [
            {
              path: '',
              name: 'mypost',
              component: MyPost
            },
            {
              path: 'mycollection',
              name: 'mycollection',
              component: MyCollection
            }
          ]
        },
        {
          path: 'msg',
          name: 'msg',
          component: Msg
        },
        {
          path: 'other',
          name: 'other',
          component: Other
        }
      ]
    },
    {
      path: '/404',
      name: '404',
      component: NoFound
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})

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
