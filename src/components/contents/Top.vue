<template>
  <div class="fly-panel"  v-if="lists.length > 0">
    <div class="fly-panel-title fly-filter">
      <a>置顶</a>
      <a
        href="#signin"
        class="layui-hide-sm layui-show-xs-block fly-right"
        id="LAY_goSignin"
        style="color: #ff5722"
        >去签到</a
      >
    </div>
    <list-item :lists="lists" :isShow="false"></list-item>
  </div>
</template>

<script>
import { indexMixin } from '@/assets/mixin'
import ListItem from './ListItem.vue'
export default {
  mixins: [indexMixin],
  name: 'top',
  components: {
    ListItem
  },
  data () {
    return {
      isTop: 1
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
