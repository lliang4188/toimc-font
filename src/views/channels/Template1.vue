<template>
  <div class="layui-container">
      <div class="layui-row layui-col-space15">
        <div class="layui-col-md8">
          <imooc-list></imooc-list>
        </div>
        <div class="layui-col-md4">
          <imooc-hotlist></imooc-hotlist>
          <imooc-ads></imooc-ads>
          <imooc-links></imooc-links>
        </div>
      </div>
    </div>
</template>

<script>
import HotList from '@/components/sidebar/Hotlist'
import Ads from '@/components/sidebar/Ads'
import Links from '@/components/sidebar/Links'
import List from '@/components/contents/List'
export default {
  name: 'index',
  components: {
    'imooc-hotlist': HotList,
    'imooc-ads': Ads,
    'imooc-links': Links,
    'imooc-list': List
  }
}
</script>

<style lang="scss" scoped>

</style>
