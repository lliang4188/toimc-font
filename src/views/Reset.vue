<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user" pad20>
      <div class="latui-tab layui-tab-brief">
        <ul class="layui-tab-title">
          <li>
            <router-link :to="{ name: 'login' }">登入</router-link>
          </li>
          <li class="layui-this">重置密码</li>
        </ul>
        <div class="layui-form layui-tab-content" style="padding: 0 20px">
          <validation-observer ref="observer" v-slot="{ validate }">
            <div class="layui-tab-item layui-show">
              <div class="layui-form layui-form-pane" style="margin-top: 30px">
                <form>
                  <div class="layui-form-item">
                    <label for="L_pass" class="layui-form-label">密码</label>
                    <validation-provider
                      name="password"
                      rules="required|min:6|max:16|confirmed:confirmation"
                      v-slot="{ errors }"
                    >
                      <div class="layui-input-inline">
                        <input
                          type="password"
                          placeholder="请输入密码"
                          autocomplete="off"
                          class="layui-input"
                          v-model.trim="password"
                        />
                      </div>
                      <div class="layui-form-mid layui-word-aux">
                        6到16个字符
                      </div>
                      <div class="layui-row">
                        <span style="color: #c00">{{ errors[0] }}</span>
                      </div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <validation-provider
                      v-slot="{ errors }"
                      name="repassword"
                      vid="confirmation"
                    >
                      <label class="layui-form-label">确认密码</label>
                      <div class="layui-input-inline">
                        <input
                          type="password"
                          v-model.trim="repassword"
                          autocomplete="off"
                          placeholder="请再次输入密码"
                          class="layui-input"
                        />
                      </div>
                      <div class="latui-row">
                        <span style="color: #c00">{{ errors[0] }}</span>
                      </div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <validation-provider name="code" rules="required|min:4" v-slot="{ errors }">
                      <label class="layui-form-label">验证码</label>
                      <div class="layui-input-inline">
                        <input
                          type="text"
                          name="code"
                          placeholder="请输入图片验证码"
                          autocomplete="off"
                          v-model.trim="code"
                          class="layui-input"
                        />
                      </div>
                      <div class="svg" v-html="svg" @click="_getCode()"></div>
                      <div class="layui-row">
                        <span style="color: #c00">{{ errors[0] }}</span>
                      </div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <input type="hidden" name="username" />
                    <input type="hidden" name="email" />
                    <button
                      class="layui-btn"
                      type= "button"
                      @click="validate().then(submit)"
                    >
                      提交
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </validation-observer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { getCode, reset } from '@/api/login'
import { v4 as uuidv4 } from 'uuid'
import { getParam } from '@/utils/common.js'

export default {
  name: 'reset',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      key: '',
      password: '',
      repassword: '',
      code: '',
      svg: ''
    }
  },
  mounted () {
    let sid = ''
    if (localStorage.getItem('sid')) {
      sid = localStorage.getItem('sid')
    } else {
      sid = uuidv4()
      localStorage.setItem('sid', sid)
    }
    this.$store.commit('setSid', sid)
    this._getCode()
    this.key = getParam('key')
  },
  methods: {
    _getCode () {
      let sid = this.$store.state.sid
      getCode(sid).then((res) => {
        if (res.code === 200) {
          this.svg = res.data
        }
      })
    },
    async submit () {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return
      }
      reset({
        key: this.key,
        password: this.password,
        sid: this.$store.state.sid,
        code: this.code
      }).then((res) => {
        if (res.code === 200) {
          this.$alert('密码修改成功')
          setTimeout(() => {
            this.$router.push('/login')
          }, 1000)
        } else {
          this._getCode()
          if (res.msg instanceof Object) {
            this.$refs.observer.setErrors(res.msg)
          } else {
            this.$alert(res.msg)
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
