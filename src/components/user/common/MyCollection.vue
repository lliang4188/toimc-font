<template>
  <div>
    <div v-if="lists.length > 0">
      <table class="layui-table">
        <thead>
          <tr>
            <th class="title">
              <div class="layui-table-cell pl0">
                <span>帖子标题</span>
              </div>
            </th>
            <th>
              <div class="layui-table-cell text-right pr0">
                <span>收藏时间</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in lists" :key="'mycollect' + index">
            <td>
              <router-link
                class="link"
                :to="{ name: 'detail', params: { tid:item.tid }}">{{ item.title }}</router-link></td>
            <td class="text-right">{{ item.created | moment }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>暂无收藏数据</div>
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
import { getCollect } from '@/api/user'
import Pagination from '@/components/moudles/pagination/Index.vue'
export default {
  name: 'my-collection',
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
    this.getCollectList()
  },
  methods: {
    getCollectList () {
      getCollect({
        page: this.current,
        limit: this.limit
      }).then((res) => {
        if (res.code === 200) {
          this.lists = res.data
          this.total = res.total
        }
      })
    },
    handleChange (val) {
      this.current = val
      this.getCollectList()
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  width: 70%;
}
.link{
  color: #01aaed;
}
</style>
