<template>
  <div class="panel margin pd20 layui-clear">
    <div class="msg">Hi, {{ userInfo.name }}, 你已经是我们的正式会员！</div>
    <div class="layui-row layui-col-space20">
      <div class="layui-col-md6">
        <div class="panel border">
           <div class="title">我的会员信息</div>
          <div class="content">
            <p>积分经验值：<span class="layui-font-red">{{ userInfo.favs }}</span></p>
            <p>您当前为：<span class="layui-font-red">{{ userInfo.isVip === '0' ? '非vip' : 'VIP' + userInfo.isVip }}</span></p>
          </div>
        </div>
      </div>
      <div class="layui-col-md6">
        <imooc-sign class="border"></imooc-sign>
      </div>
    </div>
    <div class="layui-col-md12 mt20">
      <div class="panel border">
        <div class="title">快捷方式</div>
        <div class="content">
          <ul class="layui-row layui-col-space10">
          <li class="layui-col-sm3 layui-col-xs4" v-for="(item,index) in lists" :key="'nav'+ index">
            <router-link :to="{name: item.link}">
              <a href="javascript:;">
                <div class="layui-icon shortcut" :class="item.icon"></div>
                <span>{{ item.name }}</span>
              </a>
            </router-link>
          </li>
        </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sign from '@/components/sidebar/Sign'
export default {
  name: 'user-center',
  components: {
    'imooc-sign': Sign
  },
  data () {
    return {
      lists: [
        {
          name: '修改信息',
          icon: 'layui-icon-set',
          link: 'info'
        },
        {
          name: '修改头像',
          icon: 'layui-icon-face-smile',
          link: 'pic'
        },
        {
          name: '修改密码',
          icon: 'layui-icon-password',
          link: 'passwd'
        },
        {
          name: '账号绑定',
          icon: 'layui-icon-app',
          link: 'account'
        },
        {
          name: '发表新帖',
          icon: 'layui-icon-add-circle',
          link: ''
        },
        {
          name: '查看分享',
          icon: 'layui-icon-share',
          link: ''
        },
        {
          name: '我的帖子',
          icon: 'layui-icon-username',
          link: ''
        },
        {
          name: '我的收藏',
          icon: 'layui-icon-star-fill',
          link: ''
        },
        {
          name: '其他资料',
          icon: 'layui-icon-template-1',
          link: ''
        },
        {
          name: '关注公众号',
          icon: 'layui-icon-login-wechat',
          link: ''
        },
        {
          name: '文档',
          icon: 'layui-icon-read',
          link: ''
        },
        {
          name: '后台管理',
          icon: 'layui-icon-user',
          link: ''
        }
      ]
    }
  },
  computed: {
    userInfo () {
      return this.$store.state.userInfo
    }
  }
}
</script>

<style lang="scss" scoped>
 @media screen and (max-width: 768px){
    .margin {
      margin-left: 0 !important;
    }
 }
  .panel{
    border-radius: 2px;
    background-color: #fff;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
    font-size: 14px;
    color: #333;
  }
  .margin{
    margin: 0 0 10px 215px;
     transition: all .2s;
  }
  .msg {
    padding: 10px 15px;
    margin-bottom: 20px;
    background-color: #f8f8f8;
    color: #666;
  }
  .border{
    border: 1px solid #e6e6e6;
  }
  .pd20 {
    padding: 20px;
  }
  .title {
    height: 50px;
    line-height: 50px;
    padding: 0 15px;
    border-bottom: 1px dotted #e9e9e9;
  }

  .content{
    padding: 18px 15px;
    line-height: 25px;
  }

  .fly-panel{
    margin-bottom: 0;
  }

  .mt20 {
    margin-top: 20px;
  }
  li {
    display: flex;
    flex-direction: column;
    text-align: center;
    padding: 5px;
  }

  .shortcut{
    width: 100%;
    background-color: #2f9688;
    height: 60px;
    line-height: 60px;
    text-align: center;
    font-size: 30px;
    border-radius: 2px;
    color: #fff;
  }
  li {
    display: flex;
    flex-direction: column;
    text-align: center;
    padding: 5px;
  }

  .shortcut{
    width: 100%;
    background-color: #2f9688;
    height: 60px;
    line-height: 60px;
    text-align: center;
    font-size: 30px;
    border-radius: 2px;
    color: #fff;
  }
</style>
