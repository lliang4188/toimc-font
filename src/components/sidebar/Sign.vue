<template>
  <div class="fly-panel fly-signin">
    <div class="fly-panel-title">
      签到
      <i class="fly-mid"></i>
      <a href="javascript:;" class="fly-link" @click="showInfo()">说明</a>
      <i class="fly-mid"></i>
      <a href="javascript:;" class="fly-link" @click="showHot()"
        >活跃榜<span class="layui-badge-dot"></span
      ></a>
      <span class="fly-signin-days" v-if="isSign || isLogin">已连续签到<cite>{{ count }}</cite>天</span>
    </div>
    <div class="fly-panel-main fly-signin-main">
      <template v-if="!isSign">
        <button class="layui-btn layui-btn-danger" type="button" @click="sign()">
          今日签到
        </button>
        <span>可获得<cite>{{ favs }}</cite>飞吻</span>
      </template>

      <!-- 已签到状态 -->
      <template v-else>
          <button class="layui-btn layui-btn-disabled">{{ msg }}</button>
          <span>获得了<cite>{{ favs }}</cite>飞吻</span>
      </template>
    </div>
    <!-- 签到说明 -->
    <sign-info :isShow="isShow" @closeModal="close"></sign-info>
    <!-- 签到总榜 -->
    <sign-list :isShow="showList" @closeModal="close" :lists="lists"></sign-list>
  </div>
</template>

<script>
import SignInfo from './SingInfo.vue'
import SignList from './SignList.vue'
import { userSign } from '@/api/user.js'
import moment from 'dayjs'
export default {
  name: 'sign',
  components: {
    SignInfo,
    SignList
  },
  data () {
    return {
      isShow: false,
      showList: false,
      current: 0,
      lists: [
        {
          name: 'test1',
          count: 5,
          created: '2021-06-26'
        },
        {
          name: 'test2',
          count: 4,
          created: '2021-06-26'
        },
        {
          name: 'test3',
          count: 2,
          created: '2021-06-26'
        }
      ],
      isSign: false,
      msg: '',
      ctrl: ''
    }
  },
  mounted () {
    // 判断用户上一次的签到状态
    // 如果用户上一次签到日期与当前日期相差1天，允许用户签到
    const isSign = this.$store.state.userInfo.isSign
    const lastSign = this.$store.state.userInfo.lastSign
    const nowDate = moment().format('YYYY-MM-DD')
    const lastDate = moment(lastSign).format('YYYY-MM-DD')
    const diff = moment(nowDate).diff(moment(lastDate), 'day')
    if (diff > 0 && isSign) {
      this.isSign = false
    } else {
      this.isSign = isSign
      if (diff === 0 && isSign) {
        this.nextSign()
      } else {
        this.msg = '今日已签到'
      }
    }
  },
  watch: {
    userInfo (newval, oldval) {
      if (newval.isSign === true) {
        this.nextSign()
        this.isSign = true
      } else {
        this.isSign = false
      }
    }
  },
  computed: {
    userInfo () {
      return this.$store.state.userInfo
    },
    isLogin () {
      return this.$store.state.isLogin
    },
    favs () {
      let count = parseInt(this.count)
      let result = 0
      if (count < 5) {
        result = 5
      } else if (count >= 5 && count < 10) {
        result = 10
      } else if (count >= 10 && count < 30) {
        result = 15
      } else if (count >= 30 && count < 100) {
        result = 20
      } else if (count >= 100 && count < 365) {
        result = 30
      } else if (count >= 365) {
        result = 50
      }
      return result
    },
    count () {
      if (this.$store.state.userInfo !== {}) {
        if (typeof this.$store.state.userInfo.count !== 'undefined') {
          return this.$store.state.userInfo.count
        } else {
          return 0
        }
      } else {
        return 0
      }
    }
  },
  methods: {
    nextSign () {
      clearInterval(this.ctrl)
      const nowDate = moment().add(1, 'day').format('YYYY-MM-DD')
      let seconds = moment(nowDate + '00:00:00').diff(moment(), 'second')
      // 测试用
      // const nowDate = moment().add(10, 'second')
      // let seconds = moment(nowDate).diff(moment(), 'second')
      let hour = Math.floor(seconds / 3600)
      let min = Math.floor(seconds % 3600 / 60)
      let second = seconds % 60
      this.msg = `签到倒计时 ${hour}:${min < 10 ? '0' + min : min}:${second < 10 ? '0' + second : second}`
      this.ctrl = setInterval(() => {
        seconds = moment(nowDate + '00:00:00').diff(moment(), 'second')
        // 测试用
        // seconds = moment(nowDate).diff(moment(), 'second')
        hour = Math.floor(seconds / 3600)
        min = Math.floor(seconds % 3600 / 60)
        second = seconds % 60
        this.msg = `签到倒计时${hour}:${min < 10 ? '0' + min : min}:${second < 10 ? '0' + second : second}`
        if (seconds <= 0) {
          clearInterval(this.ctrl)
          this.isSign = false
          let user = this.$store.state.userInfo
          user.isSign = false
          this.$store.commit('setUserInfo', user)
        }
      }, 1000)
    },
    showInfo () {
      this.isShow = true
    },
    showHot () {
      this.showList = true
    },
    close () {
      this.isShow = false
      this.showList = false
    },
    choose (val) {
      this.current = val
    },
    sign () {
      if (!this.isLogin) {
        this.$pop('shake', '请先登录')
        return
      }
      userSign().then((res) => {
        let user = this.$store.state.userInfo
        if (res.code === 200) {
          user.favs = res.favs
          user.count = res.count
          this.$pop('', '签到成功')
        } else {
          // 用户已经签到
          this.$pop('', '用户已经签到')
        }
        user.isSign = true
        user.lastSign = res.lastSign
        this.isSign = true
        this.$store.commit('setUserInfo', user)
      })
      this.nextSign()
    }
  }
}
</script>

<style lang="scss">
@keyframes bounceIn {
  0%{
    opacity: 0;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
.mask{
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: rgba(0,0,0,.8);
  left: 0;
  top:0;
  z-index: 20000;
}
.layui-layer{
  width: 300px;
  height: 480px;
  position: fixed;
  left: 50%;
  top: 50%;
  margin-top: -240px;
  margin-left: -150px;
  background-color: #fff;
  z-index: 21000;
  &.active{
    animation-fill-mode: both;
    animation-duration: 0.2s;
    animation-name: bounceIn;
  }
  .layui-layer-title{
    height: 42px;
    line-height: 42px;
    padding: 0 10px;
    background-color: #fafafa;
    color: #333;
  }
  .layui-layer-content{
    padding: 20px;
  }
  .layui-tab-content{
    padding: 10px;
    li{
      padding: 0 5px;
    }
  }
  .layui-tab-item{
    line-height: 46px;
    li{
      border-bottom: 1px dotted #dcdcdc;
      &:last-child{
        border-bottom: none;
      }
    }
    img{
      width: 30px;
      height: 30px;
      border-radius: 2px;
    }
  }
}
</style>
