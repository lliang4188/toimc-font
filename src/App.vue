<template>
  <div id="app">
    <imooc-header></imooc-header>
    <router-view></router-view>
    <imooc-footer></imooc-footer>
  </div>
</template>
<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
export default {
  name: 'app',
  components: {
    'imooc-header': Header,
    'imooc-footer': Footer
  }
}
</script>

<style lang="scss">
@import "./assets/css/global.css";
.svg {
  float: left;
  position: relative;
  top: -4px;
}
.gray{
  color: #999;
}
.text-center{
  text-align: center;
}
.text-left{
  text-align: left;
}
.text-right{
  text-align: right;
}
@for $i from 0 to 5 {
  .pd#{$i * 10} {
    padding: $i * 10 + px !important;
  }
  .pl#{$i * 10} {
    padding-left: $i * 10 + px !important;
  }
  .pr#{$i * 10} {
    padding-right: $i * 10 + px !important;
  }
  .mr#{$i * 10} {
    margin-right: $i * 10px !important;
  }
  .ml#{$i * 10} {
     margin-left: $i * 10px !important;
  }
}
.orange{
  color: #ff5722;
}
.pull-right{
  float: right;
}
</style>
