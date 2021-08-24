<template>
  <transition name="fade">
    <div
      class="layui-layer-page layui-layer-prompt layui-flyer edit-content"
      v-show="isShow"
    >
      <div class="layui-layer-title">请输入引用内容</div>
      <div class="layui-layer-content">
        <textarea
          placeholder="请输入引用内容"
          class="layui-textarea"
          v-model="text"
          ref="textareaItem"
          style="width:300px; height:100px"
        ></textarea>
      </div>
      <span class="layui-layer-setwin" @click="cancel()">
        <a
          href="javascript:void(0)"
          class="layui-layer-ico layui-layer-close layui-layer-close1"
        ></a>
      </span>
      <div class="layui-layer-btn">
        <a class="layui-layer-btn0" @click.prevent="submit()">确定</a>
        <a class="layui-layer-btn" @click.prevent="cancel()">取消</a>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'QuoteAdd',
  props: ['isShow'],
  data () {
    return {
      text: ''
    }
  },
  methods: {
    cancel () {
      this.$emit('closeEvent')
      this.text = ''
    },
    submit () {
      if (this.link === '') {
        this.$pop('shake', '请输入引用内容')
        this.$refs.textareaItem.focus()
        return
      }
      this.$emit('addEvent', this.text)
      setTimeout(() => {
        this.text = ''
        this.$emit('closeEvent')
      }, 0)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
