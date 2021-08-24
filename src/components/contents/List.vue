<template>
  <div class="fly-panel" style="margin-bottom: 0">
    <div class="fly-panel-title fly-filter">
      <a href="javascript:;" :class="{'layui-this': status === '' && tag === ''}" @click="search()">综合</a>
      <span class="fly-mid"></span>
      <a href="javascript:;" :class="{'layui-this': status === '0'}" @click="search(0)">未结</a>
      <span class="fly-mid"></span>
      <a href="javascript:;" :class="{'layui-this': status === '1'}" @click="search(1)">已结</a>
      <span class="fly-mid"></span>
      <a href="javascript:;" :class="{'layui-this': status === '' && tag === '精华'}" @click="search(2)">精华</a>
      <span class="fly-filter-right layui-hide-xs">
        <a href="javascript:;" :class="{'layui-this': sort === 'created'}" @click="search(3)">按最新</a>
        <span class="fly-mid"></span>
        <a href="javascript:;" :class="{'layui-this': sort === 'answer'}" @click="search(4)">按热议</a>
      </span>
    </div>
    <list-item :lists="lists" :isEnd="isEnd" @nextpage = "nextPage()"></list-item>
  </div>
</template>

<script>
import ListMixin from '@/mixin/list'
import ListItem from './ListItem.vue'
export default {
  mixins: [ListMixin],
  name: 'list',
  components: {
    ListItem
  },
  data () {
    return {
      current: ''
    }
  },

  watch: {
    current (newval, oldval) {
      // console.log('current=' + newval + ',' + oldval)
      this.init()
    },
    '$route': {
      immediate: true,
      handler (newval, oldval) {
        let catalog = newval.params['catalog']
        if (typeof catalog !== 'undefined' && catalog !== '') {
          this.catalog = catalog
        }
        this.init()
      }

    }
  },
  methods: {
    init () {
      this.page = 0
      this.isEnd = false
      this.lists = []
      this._getList()
    },
    search (val) {
      if (typeof val === 'undefined' && this.current === '') return
      this.current = val
      switch (val) {
        case 0:
          this.status = '0'
          this.tag = ''
          break
        case 1:
          this.status = '1'
          this.tag = ''
          break
        case 2:
          this.status = ''
          this.tag = '精华'
          break
        case 3:
          this.sort = 'created'
          break
        case 4:
          this.sort = 'answer'
          break
        default:
          this.status = ''
          this.tag = ''
          this.current = ''
      }
    },
    nextPage () {
      this.page++
      this._getList()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
