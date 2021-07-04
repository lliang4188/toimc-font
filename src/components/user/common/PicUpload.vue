<template>
  <div class="layui-form layui-form-pane layui-tab-item layui-show">
    <div class="layui-form-item">
      <div class="avatar-add">
        <p>建议尺寸168*168，支持jpg、png、gif，最大不能超过50KB</p>
        <label class="layui-btn upload-img" for="pic">
          <i class="layui-icon"></i>上传头像
        </label>
        <input class="layui-upload-file" id="pic" type="file" name="file" accept="image/jpg,image/png,image/gif" @change="upload"/>
        <img
          :src="pic"
        />
        <span class="loading"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { uploadImg } from '@/api/content'
import { updateUserInfo } from '@/api/user'
import config from '@/config'
export default {
  name: 'pic-upload',
  data () {
    return {
      pic: (this.$store.state.userInfo && this.$store.state.userInfo.pic) ? this.$store.state.userInfo.pic : '/img/header.jpeg',
      formData: ''
    }
  },
  methods: {
    upload (e) {
      let file = e.target.files
      let formData = new FormData()
      if (file.length > 0) {
        formData.append('file', file[0])
        this.formData = formData
      }
      // 上传图片之后 -> uploadImg
      uploadImg(this.formData).then((res) => {
        // console.log('TCl: -> uploadImg -> res', res)
        const baseUrl = process.env.NODE_ENV === 'production' ? config.baseUrl.pro : config.baseUrl.dev
        if (res.code === 200) {
          this.pic = baseUrl + res.data

          // 更新用户基本资料 -> uploadUserInfo
          updateUserInfo({ pic: this.pic }).then((res) => {
            if (res.code === 200) {
              let user = this.$store.state.userInfo
              user.pic = this.pic
              this.$store.commit('setUserInfo', user)
              this.$alert('图片上传成功')
            }
          })
          document.getElementById('pic').value = ''
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
