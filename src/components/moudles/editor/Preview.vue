<template>
   <transition name="fade">
    <div
      id="perview"
      class="layui-layer-page layui-layer-prompt layui-flyer edit-content"
      v-show="isShow"
    >
      <div class="layui-layer-title">预览</div>
      <div class="layui-layer-content">
        <div class="detail-body" v-html="replaceContent"></div>
      </div>
      <span class="layui-layer-setwin" @click="cancel()">
        <a
          href="javascript:void(0)"
          class="layui-layer-ico layui-layer-close layui-layer-close1"
        ></a>
      </span>
    </div>
  </transition>
</template>

<script>
import { escapeHtml } from '@/utils/escapeHtml'
export default {
  name: 'Perview',
  props: ['isShow', 'content'],
  watch: {
    isShow (newval, oldval) {
      if (newval) {
        this.$store.commit('setHide', true)
      } else {
        this.$store.commit('setHide', false)
      }
    }
  },
  computed: {
    replaceContent () {
      // 根据content的内容，转译为html代码
      if (typeof this.content === 'undefined' || this.content.trim() === '') {
        return
      }
      return escapeHtml(this.content)
    }
  },
  methods: {
    cancel () {
      this.$emit('closeEvent')
    }
  }
}
</script>

<style lang="scss">
  #perview {
    position: fixed;
    width: 100%;
    height: 100%;
    top:0;
    left: 0;
    background-color: #fff;
    z-index: 10000;
    overflow-y: auto;
  }
  .detail-body {
    max-width: 1000px;
    margin: 0 auto;
  }
  pre{
    position: relative;
    margin: 10px 0;
    padding: 15px;
    line-height: 20px;
    background-color: #f2f2f2;
    color: #333;
    font-family: 'Courier New', Courier, monospace, serif;
    font-size: 12px;
    border-left:5px solid #ddd;
  }
</style>
