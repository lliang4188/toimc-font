<template>
  <div>
    <div class="overflow">
      <table class="layui-table">
        <thead>
          <tr>
            <th>
              <div class="layui-table-cell pl0">
                <span>帖子标题</span>
              </div>
            </th>
            <th>
              <div class="layui-table-cell text-center">
                <span>状态</span>
              </div>
            </th>
            <th>
              <div class="layui-table-cell text-center">
                <span>结贴</span>
              </div>
            </th>
            <th>
              <div class="layui-table-cell text-center">
                <span>发表时间</span>
              </div>
            </th>
            <th>
              <div class="layui-table-cell text-center">
                <span>数据</span>
              </div>
            </th>
            <th>
              <div class="layui-table-cell text-center min-cell">
                <span>操作</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="text-center" v-for="(item, index) in lists" :key="'mypost'+ index">
            <td class="text-left">
              <router-link
                class="link"
                :to="{ name: 'detail', params: { tid:item._id }}"
              >{{ item.title }}</router-link>
            </td>
            <td>{{ item.status === '0' ? '打开' : '关闭' }}</td>
            <td :class="{'success': item.isEnd !=='0'}">{{ item.isEnd === '0' ? '未结' : '已结贴' }}</td>
            <td>{{ item.created | moment }}</td>
            <td>{{ item.reads }}阅/{{ item.answer }}问答</td>
            <td>
              <div @click="editPost(item)" class="layui-btn layui-btn-xs" :class="{'layui-btn-disabled': item.isEnd === '1'}">编辑</div>
              <div class="layui-btn layui-btn-xs layui-btn-danger" @click="deletePost(item)">删除</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <imooc-page
    v-if="total > 0"
    :total="total"
    :current="current"
    :align="'left'"
    :hasTotal="true"
    :hasSelect="true"
    @changeCurrent="handleChange"
    ></imooc-page>
  </div>
</template>

<script>
import { getPostListByUid, deletePostByUid } from '@/api/user'
import Pagination from '@/components/moudles/pagination/Index.vue'
export default {
  name: 'my-post',
  components: {
    'imooc-page': Pagination
  },
  data () {
    return {
      lists: [],
      total: 0,
      current: 0,
      page: 0,
      limit: 10
    }
  },
  mounted () {
    this.getPostList()
  },
  methods: {
    getPostList () {
      getPostListByUid({
        page: this.current,
        limit: this.limit
      }).then((res) => {
        if (res.code === 200) {
          this.lists = res.data
          this.total = res.total
        }
      })
    },
    deletePost (item) {
      this.$confirm('确定删除吗?', () => {
        if (item.isEnd !== '0') {
          this.$pop('shake', '帖子已结贴，无法删除！')
          return
        }
        deletePostByUid({
          tid: item._id
        }).then((res) => {
          if (res.code === 200) {
            this.$pop('', '删除成功！')
            this.list.splice(this.list.indexOf(item), 1)
          } else {
            this.$pop('shake', res.msg)
          }
        })
      }, () => {

      })
    },
    handleChange (val) {
      this.current = val
      this.getPostList()
    },
    editPost (item) {
      if (item.isEnd === '1') {
        this.$pop('shake', '帖子已经结贴，无法编辑')
      } else {
        this.$router.push({
          name: 'edit',
          params: { tid: item._id, page: item }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.overflow {
  overflow-x: auto;
}
.min-cell {
  min-width: 90px;
}
.link{
  color: #01aaed;
}
.success {
  color:#5fb878;
}

</style>
