<template>
  <div
    :class="{
      'flex-center': align === 'center',
      'flex-start': align === 'left',
      'flex-end': align === 'right',
    }"
    class="d-flex"
  >
    <div class="layui-box layui-laypage layui-laypage-default">
      <a
        href="javascript:;"
        class="layui-laypage-prev"
        v-if="showEnd"
        :class="{ 'layui-disabled': current === 0 }"
        @click="home()"
      >
        <i class="layui-icon layui-icon-prev" v-if="showType === 'icon'"></i>
        <template v-else>首页</template>
      </a>
      <a
        href="javascript:;"
        class="layui-laypage-prev"
        :class="{ 'layui-disabled': current === 0 }"
        @click="prev()"
      >
        <i class="layui-icon layui-icon-left" v-if="showType === 'icon'"></i>
        <template v-else>上一页</template>
      </a>
      <!-- current + 2 < pages.length 显示 ... -->
      <!-- current - 2 > 1 显示 ... -->
      <span
        v-if="pages.length > 5 && current + 1 - 2 > 1"
        href="javascript:;"
        class="layui-disabled"
        >...</span
      >
      <template v-for="(item, index) in pages">
        <a
          href="javascript:;"
          v-if="item >= current + 1 - 2 && item <= current + 1 + 2"
          :key="'page' + index"
          @click="changeIndex(index)"
          :class="[
            current === index ? theme : '',
            current === index ? 'active' : '',
          ]"
          >{{ item }}</a
        >
      </template>
      <span
        v-if="pages.length > 5 && current + 1 + 2 < pages.length"
        href="javascript:;"
        class="layui-disabled"
        >...</span
      >
      <a
        href="javascript:;"
        class="layui-laypage-next"
        :class="{ 'layui-disabled': current === pages.length - 1 }"
        @click="next()"
      >
        <i class="layui-icon layui-icon-right" v-if="showType === 'icon'"></i>
        <template v-else>下一页</template>
      </a>
      <a
        href="javascript:;"
        class="layui-laypage-next"
        data-page="2"
        v-if="showEnd"
        :class="{ 'layui-disabled': current === pages.length - 1 }"
        @click="end()"
      >
        <i class="layui-icon layui-icon-next" v-if="showType === 'icon'"></i>
        <template v-else>尾页</template>
      </a>
    </div>
    <div class="total" v-if="hasTotal">
      到第
      <input type="text" class="imooc-input" @keyup.enter="jumpTo"/>
      页 共 {{ totalPages }} 页
    </div>
    <div v-if="hasSelect">
      <div
        class="layui-unselect layui-form-select"
        :class="{ 'layui-form-selected': isSelect }"
        @click="changeOpt()"
      >
        <div class="layui-select-title">
          <input
            type="text"
            placeholder="请选择"
            readonly
            v-model="options[optIndex]"
            class="layui-input layui-unselect"
          /><i class="layui-edge"></i>
        </div>
        <dl class="layui-anim layui-anim-upbit">
          <dd
            v-for="(item, index) in options"
            :key="'fav' + index"
            :class="{ 'layui-this': index === optIndex }"
            @click="closeOpt(item, index)"
          >
            {{ item }}
          </dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'pagination',
  props: {
    align: {
      type: String,
      default: 'center'
    },
    showType: {
      type: String,
      default: 'text'
    },
    showEnd: {
      type: Boolean,
      default: false
    },
    theme: {
      type: String,
      default: 'layui-bg-green'
    },
    hasTotal: {
      type: Boolean,
      default: false
    },
    hasSelect: {
      type: Boolean,
      default: false
    },
    total: {
      type: Number,
      default: 0
    },
    current: {
      type: Number,
      default: 0
    },
    size: {
      type: Number,
      default: 10
    }
  },
  data () {
    return {
      isSelect: false,
      optIndex: 0,
      options: [10, 20, 30, 50, 100],
      pages: [],
      limit: 10
    }
  },
  watch: {
    total (newval, oldval) {
      this.initPages()
    }
  },
  computed: {
    totalPages () {
      return Math.ceil(this.total / this.limit)
    }
  },
  mounted () {
    // 设置select 内容
    this.limit = this.size
    // 初始化分页长度
    this.initPages()
    this.options = _.uniq(_.sortBy(_.concat(this.options, this.size)))
    this.optIndex = this.options.indexOf(this.size)
  },
  methods: {
    initPages () {
      const len = Math.ceil(this.total / this.limit)
      // 5 -> [1,2,3,4,5]
      this.pages = _.range(1, len + 1)
    },
    changeOpt () {
      this.isSelect = !this.isSelect
    },
    closeOpt (item, index) {
      if (this.optIndex !== index) {
        // 当页面上当limit发生变化之后，调整current数值
        this.$emit('changeCurrent', Math.floor(this.limit * this.current / this.options[index]))
        this.$emit('changeLimit', this.options[index])
      }
      this.optIndex = index
      this.limit = this.options[this.optIndex]
      this.initPages()
    },
    home () {
      this.$emit('changeCurrent', 0)
    },
    end () {
      this.$emit('changeCurrent', this.pages.length - 1)
    },
    prev () {
      let cur = 0
      if (this.current - 1 < 0) {
        cur = 0
      } else {
        cur = this.current - 1
      }
      this.$emit('changeCurrent', cur)
    },
    next () {
      let cur = 0
      if (this.current + 1 > this.pages.length) {
        cur = this.pages.length - 1
      } else {
        cur = this.current + 1
      }
      this.$emit('changeCurrent', cur)
    },
    changeIndex (val) {
      if (val !== this.current) {
        this.$emit('changeCurrent', val)
      }
    },
    jumpTo (event) {
      const result = event.target.value
      let cur = this.current
      if (result > this.totalPages || result < 0) {
        this.$pop('shake', '请输入正确的页码')
      } else {
        cur = result - 1
      }
      if (cur !== this.current) {
        this.$emit('changeCurrent', cur)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
a {
  &.active {
    border-radius: 2px;
    position: relative;
    z-index: 10;
  }
}
.layui-bg-green {
  border-color: #009688;
}
.total {
  color: #333;
  margin-bottom: 5px;
  margin-left: 20px;
}
.imooc-input {
  padding: 0 5px;
  width: 30px;
  height: 28px;
  border: 1px solid #eee;
}
.layui-form-select {
  margin-left: 10px;
}
.layui-unselect {
  width: 80px;
  height: 30px;
  line-height: 30px;
  margin-bottom: 5px;
}
</style>
