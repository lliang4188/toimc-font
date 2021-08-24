const Center = () => import(/* webpackChunkName: 'center' */'@/views/Center.vue')
const UserCenter = () => import(/* webpackChunkName: 'user-center' */'@/components/user/Center.vue')
const Setting = () => import(/* webpackChunkName: 'setting' */'@/components/user/Setting.vue')
const Posts = () => import(/* webpackChunkName: 'user-posts' */'@/components/user/Post.vue')
const Msg = () => import(/* webpackChunkName: 'user-msg' */'@/components/user/Msg.vue')
const Others = () => import(/* webpackChunkName: 'other' */'@/components/user/Other.vue')
const MyInfo = () => import(/* webpackChunkName: 'info' */'@/components/user/common/MyInfo.vue')
const PicUpload = () => import(/* webpackChunkName: 'pic-upload' */'@/components/user/common/PicUpload.vue')
const Passwd = () => import(/* webpackChunkName: 'password' */'@/components/user/common/Password.vue')
const Accounts = () => import(/* webpackChunkName: 'accounts' */'@/components/user/common/Accounts.vue')
const MyPost = () => import(/* webpackChunkName: 'mypost' */'@/components/user/common/MyPost.vue')
const MyCollection = () => import(/* webpackChunkName: 'mycollection' */'@/components/user/common/MyCollection.vue')
const User = () => import(/* webpackChunkName: 'user' */'@/views/User.vue')

export default [
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
        path: 'others',
        name: 'others',
        component: Others
      }
    ]
  },
  {
    path: '/user/:uid',
    name: 'home',
    props: true,
    component: User
  }
]
