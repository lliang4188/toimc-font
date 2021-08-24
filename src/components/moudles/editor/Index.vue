<template>
  <div class="edit-wrap">
    <div class="layui-form-item layui-form-text">
      <div class="layui-input-block">
        <div class="layui-unselect fly-edit" ref="icons">
          <!-- 表情 -->
          <span @click="choose(0)" ref="face"
            ><i class="iconfont icon-yxj-expression"></i
          ></span>
          <span @click="choose(1)" ref="img"
            ><i class="iconfont icon-tupian"></i
          ></span>
          <span @click="choose(2)" ref="link"
            ><i class="iconfont icon-lianjie"></i
          ></span>
          <span class="quote" ref="quote" @click="choose(3)">”</span>
          <span ref="code" @click="choose(4)"
            ><i class="iconfont icon-emwdaima"></i
          ></span>
          <span @click="addHr">hr</span>
          <span @click="choose(5)"><i class="iconfont icon-yulan1"></i></span>
        </div>
        <textarea
          id= "edit"
          class="layui-textarea fly-editor"
          name="content"
          ref="textEdit"
          @focus="focusEvent()"
          @blur="blurEvent()"
          v-model="content"
        ></textarea>
      </div>
    </div>
    <div ref="modal">
      <facse
        :isShow="current === 0"
        :ctrl="this.$refs.face"
        @closeEvent="closeModal()"
        @addEvent="addFace"
      ></facse>
      <img-upload
        :isShow="current === 1"
        :ctrl="this.$refs.img"
        @closeEvent="closeModal()"
        @addEvent="addPic"
      ></img-upload>
      <link-add
        :isShow="current === 2"
        :ctrl="this.$refs.link"
        @closeEvent="closeModal()"
        @addEvent="addLink"
      ></link-add>
      <quote
        :isShow="current === 3"
        :ctrl="this.$refs.quote"
        @closeEvent="closeModal()"
        @addEvent="addQuote"
      ></quote>
      <code-input
        :isShow="current === 4"
        :width="codeWidth"
        :height="codeHeight"
        :ctrl="this.$refs.code"
        @closeEvent="closeModal()"
        @addEvent="addCode"
      ></code-input>
      <preview
        :content="content"
        :isShow="current === 5"
        @closeEvent="closeModal()"
      ></preview>
    </div>
  </div>
</template>

<script>
import Facse from './Face.vue'
import ImgUpload from '@/components/moudles/editor/ImgUpload.vue'
import LinkAdd from '@/components/moudles/editor/LinkAdd.vue'
import Quote from '@/components/moudles/editor/Quote.vue'
import CodeInput from '@/components/moudles/editor/Code.vue'
import Preview from '@/components/moudles/editor/Preview.vue'
export default {
  name: 'Editor',
  props: ['initContent'],
  components: {
    Facse,
    ImgUpload,
    LinkAdd,
    Quote,
    CodeInput,
    Preview
  },
  data () {
    return {
      codeWidth: 400,
      codeHeight: 200,
      current: '',
      content: '',
      pos: ''
    }
  },
  watch: {
    initContent (newval, oldval) {
      this.content = newval
    }
  },
  updated () {
    this.$emit('changeContent', this.content)
  },
  mounted () {
    this.$nextTick(() => {
      document.querySelector('body').addEventListener('click', this.handleBodyClick)
    })
    this.codeWidth = this.$refs.textEdit.offsetWidth - 80
    this.codeHeight = this.$refs.textEdit.offsetHeight - 100
    window.addEventListener('resize', () => {
      this.codeWidth = this.$refs.textEdit.offsetWidth - 80
      this.codeHeight = this.$refs.textEdit.offsetHeight - 100
    })
  },
  methods: {
    // 添加表情
    addFace (item) {
      const insertContent = ` face${item} `
      this.insert(insertContent)
      this.pos += insertContent.length
    },
    // 添加图片
    addPic (item) {
      const insertContent = ` img[${item}] `
      this.insert(insertContent)
      this.pos += insertContent.length
    },
    // 添加链接
    addLink (item) {
      const insertContent = ` a(${item})[${item}] `
      this.insert(insertContent)
      this.pos += insertContent.length
    },
    // 添加引用
    addQuote (item) {
      const insertContent = ` \n[quote]\n${item}\n[/quote]`
      this.insert(insertContent)
      this.pos += insertContent.length
    },
    // 添加代码
    addCode (item) {
      const insertContent = ` \n[pre]\n${item}\n[/pre]`
      this.insert(insertContent)
      this.pos += insertContent.length
    },
    // 添加hr
    addHr () {
      this.insert('\n[hr]')
      this.pos += 5
    },
    handleBodyClick (e) {
      e.stopPropagation()
      // console.log('TCl: -> handleBodyClick -> e', e)
      // 触发本组件的关闭事件， 改变isShow状态
      // 是否点击到了非控制Icon以外的地方
      if (!(this.$refs.icons.contains(e.target) || this.$refs.modal.contains(e.target))) {
        this.closeModal()
      }
    },
    insert (val) {
      if (typeof this.content === 'undefined') {
        return
      }
      let tmp = this.content.split('')
      tmp.splice(this.pos, 0, val)
      this.content = tmp.join('')
    },
    closeModal () {
      this.current = ''
    },
    focusEvent () {
      this.getPos()
    },
    blurEvent () {
      this.getPos()
    },
    // 计算光标的位置
    getPos () {
      let cursorPos = 0
      let elem = document.getElementById('edit')
      if (document.slection) {
        // ie
        let selectRange = document.slection.createRange()
        selectRange.moveStart('character', -elem.vale.length)
        cursorPos = selectRange.text.length
      } else if (elem.selectionStart || elem.slectionStart === '0') {
        cursorPos = elem.selectionStart
      }
      this.pos = cursorPos
    },
    choose (index) {
      if (index === this.current) {
        this.closeModal()
      } else {
        this.current = index
      }
    }
  },
  beforeDestroy () {
    document.querySelector('body').removeEventListener('click', this.handleBodyClick)
  }
}
</script>

<style lang="scss">
.fade-leave-active {
  animation: bounceOut 0.3s;
}
.fade-enter-active,
.fade-enter-to {
  animation: bounceIn 0.3s;
}

.edit-wrap {
  position: relative;
}
.fly-editor {
  height: 260px;
}
.quote {
  font-size: 22px;
  vertical-align: middle;
  position: relative;
  top: 4px;
}
.edit-content {
  position: absolute;
  left: 0;
  top: 45px;
  background-color: #fff;
  z-index: 100;
}
.layui-layer-prompt {
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}
</style>
