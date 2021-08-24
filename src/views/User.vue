<template>
  <div>
    <div class="fly-home fly-panel" style="background-image: url()">
      <img
        :src="userInfo.pic ? userInfo.pic : '/img/header.jpeg'"
        :alt="userInfo.name ? userInfo.name : 'imooc'"
      />
      <i class="iconfont icon-renzheng" title="Imooc社区认证"></i>
      <h1>
        {{ userInfo.name ? userInfo.name : 'imooc'}}
        <i class="iconfont" :class="{ 'icon-nan': userInfo.gender === '0', 'icon-nv': userInfo.gender === '1' }"></i>
        <!-- <i class="iconfont icon-nv"></i>  -->
        <i class="layui-badge fly-badge-vip ml10">{{ userInfo.isVip !== '0' ? 'VIP'+userInfo.isVip : '非VIP'}}</i>
        <!--
    <span style="color:#c00;">（管理员）</span>
    <span style="color:#5FB878;">（社区之光）</span>
    <span>（该号已被封）</span>
    -->
      </h1>

      <!-- <p style="padding: 10px 0; color: #5fb878">认证信息：layui 作者</p> -->

      <p class="fly-home-info">
        <i class="iconfont icon-kiss" title="积分"></i
        ><span style="color: #ff7200">{{ userInfo.favs }}积分</span>
        <i class="iconfont icon-shijian"></i><span>{{ userInfo.created | moment }} 加入</span>
        <i class="iconfont icon-chengshi"></i><span>{{ userInfo.location }}</span>
      </p>

      <p class="fly-home-sign">{{ userInfo.regmark }}</p>

      <div class="fly-sns" data-user="">
        <a
          href="javascript:;"
          class="layui-btn layui-btn-primary fly-imActive"
          data-type="addFriend"
          >加为好友</a
        >
        <a
          href="javascript:;"
          class="layui-btn layui-btn-normal fly-imActive"
          data-type="chat"
          >发起会话</a
        >
      </div>
    </div>
    <div class="layui-container">
      <div class="layui-row layui-col-space15">
        <div class="layui-col-md6 fly-home-jie">
          <div class="fly-panel">
            <h3 class="fly-panel-title">{{ userInfo.name }} 最近的提问</h3>
            <ul class="jie-row">
              <li v-for="(item,index) in postList" :key="'postlist'+ index">
                <span class="layui-badge" v-for="(tag, index) in item.tags" :key="'tag'+ index" :class="tag.class">{{ tag.name }}</span>
                <router-link :to="{ name:'detail', params:{ tid: item._id }}" class="jie-title">{{ item.title }}</router-link>
                <i>{{ item.created | moment }}</i>
                <em class="layui-hide-xs">{{ item.reads }}阅/{{ item.answer }}答</em>
              </li>
            </ul>
             <div class="fly-none" v-if="postList.length === 0" style="min-height: 50px; padding:30px 0; height:auto;"><span>没有发布任何求解</span></div>
          </div>
        </div>

        <div class="layui-col-md6 fly-home-da">
          <div class="fly-panel">
            <h3 class="fly-panel-title">{{ userInfo.name }} 最近的回答</h3>
            <ul class="home-jieda" >
              <li v-for="(item, index) in commentList" :key="'comments'+ index">
                <p>
                  <span>{{ item.created | moment }}</span>
                  在<router-link :to="item.tid ? {name: 'detail', params:{tid: item.tid._id ? item.tid._id : ''}} : { name: '404' }">{{ item.tid ? item.tid.title: '用户已经删除该贴' }}</router-link>中回答：
                </p>
                <div class="home-dacontent" v-richtext="item.content">
                </div>
              </li>
            </ul>
            <div class="fly-none" v-if="commentList.length === 0" style="min-height: 50px; padding:30px 0; height:auto;"><span>没有回答任何问题</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getInfo, getCommentList, getPostPublic } from '@/api/user'
export default {
  name: 'home',
  props: ['uid'],
  data () {
    return {
      postList: [],
      commentList: [],
      userInfo: {}
    }
  },
  mounted () {
    this.getUserInfo()
    this.getPostList()
    this.getCommentList()
    console.log(this.userInfo.created)
  },
  methods: {
    getUserInfo () {
      // 获取用户基本信息
      getInfo({ uid: this.uid }).then((res) => {
        if (res.code === 200) {
          this.userInfo = res.data
        }
      })
    },
    getPostList () {
      // 获取最近发帖列表
      getPostPublic({
        uid: this.uid,
        page: 0,
        limit: 20
      }).then((res) => {
        if (res.code === 200) {
          this.postList = res.data
        }
      })
    },
    getCommentList () {
      // 获取最近评论信息
      getCommentList({
        uid: this.uid,
        page: 0,
        limit: 20
      }).then((res) => {
        if (res.code === 200) {
          this.commentList = res.data
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
