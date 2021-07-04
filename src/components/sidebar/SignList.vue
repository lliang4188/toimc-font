<template>
  <div class="model" v-show="isShow">
    <div class="mask" @click="close()"></div>
    <div class="layui-layer layui-layer-page" :class="{ active: isShow }">
      <div class="layui-layer-title">
        签到活跃榜-TOP20<i
          class="layui-icon layui-icon-close pull-right"
          @click="close()"
        ></i>
      </div>
      <div class="layui-layer-content pd0">
        <div class="layui-tab layui-tab-brief">
          <ul class="layui-tab-title">
            <li :class="{ 'layui-this': current === 0 }" @click="choose(0)">
              最新签到
            </li>
            <li :class="{ 'layui-this': current === 1 }" @click="choose(1)">
              今日最快
            </li>
            <li :class="{ 'layui-this': current === 2 }" @click="choose(2)">
              签到总榜
            </li>
          </ul>
          <div class="layui-tab-content">
            <ul class="layui-tab-item layui-show">
              <li v-for="(item, index) in lists" :key="'sign' + index">
                <img src="/img/head.jpeg" class="mr10" />
                <cite class="fly-link">{{ item.name }}</cite>
                <span class="fly-gray" v-if="current !== 2"
                  >签到于 <i class="orange">{{ item.created }}</i></span
                >
                <span class="fly-gray" v-else
                  >已经连续签到 <i class="orange">{{ item.count }}</i></span
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sign-list',
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    lists: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      current: 0
    }
  },
  methods: {
    close () {
      this.$emit('closeModal')
    },
    choose (val) {
      this.current = val
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
