import { getList } from '@/api/content'
export default {
  data () {
    return {
      isEnd: false,
      isRepeat: false,
      status: '',
      tag: '',
      sort: 'created',
      page: 0,
      limit: 20,
      catalog: '',
      isTop: 0,
      lists: []
    }
  },
  mounted () {
    this._getList()
  },
  methods: {
    _getList () {
      if (this.isRepeat) return
      if (this.isEnd2) return
      this.isRepeat = true
      let options = {
        catalog: this.catalog,
        isTop: this.isTop,
        page: this.page,
        limit: this.limit,
        sort: this.sort,
        tag: this.tag,
        status: this.status
      }
      getList(options)
        .then(res => {
          // 加入一个请求锁，防止用户多次点击，等待数据返回，再打开
          this.isRepeat = false
          // 对于异常的判断，res.code 非200，我们给用户一个提示
          // 判断lists长度是否为0，如果为0直接赋值
          // 当lists长度不为0，后面请求的数据，加入到lists里面来
          if (res.code === 200) {
            // 判断res.data长度，如果小于20条，则是最后一页
            if (res.data.length < this.limit) {
              this.isEnd = true
            }
            if (this.lists.length === 0) {
              this.lists = res.data
            } else {
              this.lists = this.lists.concat(res.data)
            }
          }
        })
        .catch(err => {
          this.isRepeat = false
          if (err) {
            this.$alert(err.message)
          }
        })
    }
  }
}
