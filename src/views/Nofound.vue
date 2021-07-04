<template>
  <div class="layui-container flex">
    <img src="@/assets/img/icon-404.png" width="100" alt="404"/>
    <p>找不到页面了</p>
    <router-link class="layui-btn" to="/">回到首页</router-link>
  </div>
</template>

<script>
export default {
  name: 'nofound'
}
</script>

<style lang="scss" scoped>
  .flex{
    display: flex;
    align-items: center;
    flex-flow: column nowrap;
    justify-content: center;
    min-height: 400px;
  }
  p {
    color: #999;
    padding-top: 10px;
    padding-bottom: 15px;
  }

</style>
