<template>
  <div class="layui-form layui-form-pane layui-tab-item layui-show">
    <form>
      <validation-observer ref="observer" v-slot="{ validate }">
        <div class="layui-form-item">
          <validation-provider
            rules="required|min:6|max:16"
            name="oldpassword"
            v-slot="{ errors }"
          >
            <div class="layui-row">
              <label for="L_nowpass" class="layui-form-label">当前密码</label>
              <div class="layui-input-inline">
                <input
                  type="password"
                  v-model.trim="oldpassword"
                  autocomplete="off"
                  class="layui-input"
                />
              </div>
            </div>
            <div class="layui-row">
              <span style="color: #c00">{{ errors[0] }}</span>
            </div>
          </validation-provider>
        </div>
        <div class="layui-form-item">
          <validation-provider
            rules="required|min:6|max:16|confirmed:confirmation"
            name="password"
            v-slot="{ errors }"
          >
            <div class="layui-row">
              <label for="L_pass" class="layui-form-label">新密码</label>
              <div class="layui-input-inline">
                <input
                  type="password"
                  v-model.trim="password"
                  autocomplete="off"
                  class="layui-input"
                />
              </div>
              <div class="layui-form-mid layui-word-aux">6到16个字符</div>
            </div>
            <div class="layui-row">
              <span style="color: #c00">{{ errors[0] }}</span>
            </div>
          </validation-provider>
        </div>
        <div class="layui-form-item">
          <validation-provider v-slot="{ errors }" vid="confirmation">
            <div class="layui-row">
              <label for="L_repass" class="layui-form-label">确认密码</label>
              <div class="layui-input-inline">
                <input
                  type="password"
                  v-model.trim="repassword"
                  autocomplete="off"
                  class="layui-input"
                />
              </div>
            </div>
            <div class="layui-row">
              <span style="color: #c00">{{ errors[0] }}</span>
            </div>
          </validation-provider>
        </div>
        <div class="layui-form-item">
          <button class="layui-btn" type="botton" @click="validate().then(submit)">
            确认修改
          </button>
        </div>
      </validation-observer>
    </form>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { changePasswd } from '@/api/user.js'
export default {
  name: 'password',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      oldpassword: '',
      password: '',
      repassword: ''
    }
  },
  methods: {
    async submit () {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        // ABORT!!
        return
      }
      if (this.oldpassword === this.password) {
        this.$alert('新旧密码不能相同，请确认！')
        return
      }
      changePasswd({
        oldpwd: this.oldpassword,
        newpwd: this.password
      }).then((res) => {
        if (res.code === 200) {
          this.$alert('密码更新成功！')
          this.oldpassword = ''
          this.password = ''
          this.repassword = ''
          requestAnimationFrame(() => {
            this.$refs.observer.reset()
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
