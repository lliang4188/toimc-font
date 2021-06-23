<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user" pad20>
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title">
          <li><router-link :to="{ name: 'login' }">登入</router-link></li>
          <li class="layui-this">注册</li>
        </ul>
        <validation-observer ref="observer" v-slot="{ validate }">
          <div class="layui-form layui-tab-content" style="padding: 20px 0">
            <div class="layui-tab-item layui-show">
              <div class="layui-form layui-form-pane">
                <form method="post">
                  <div class="layui-form-item">
                    <label class="layui-form-label">邮箱</label>
                    <validation-provider
                      name="username"
                      rules="required|email"
                      v-slot="{ errors }"
                    >
                      <div class="layui-input-inline">
                        <input
                          type="text"
                          name="email"
                          autocomplete="off"
                          class="layui-input"
                          placeholder="请输入邮箱地址"
                          v-model.trim="username"
                        />
                      </div>
                      <div class="layui-form-mid layui-word-aux">
                        将会成为您唯一的登入名
                      </div>
                      <div class="layui-row">
                        <span style="color: #c00">{{ errors[0] }}</span>
                      </div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <label for="L_username" class="layui-form-label"
                      >昵称</label
                    >
                    <validation-provider
                      name="name"
                      rules="required|min:4|max:16|name"
                      v-slot="{ errors }"
                    >
                      <div class="layui-input-inline">
                        <input
                          type="text"
                          name="username"
                          autocomplete="off"
                          v-model.trim="name"
                          placeholder="请输入昵称"
                          class="layui-input"
                        />
                      </div>
                      <div class="layui-form-mid">
                        <span style="color: #c00">{{ errors[0] }}</span>
                      </div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <label for="L_pass" class="layui-form-label">密码</label>
                    <validation-provider
                      rules="required|min:6|max:16|confirmed:confirmation"
                      v-slot="{ errors }"
                    >
                      <div class="layui-input-inline">
                        <input
                          type="password"
                          name="password"
                          autocomplete="off"
                          v-model.trim="password"
                          placeholder="请输入密码"
                          class="layui-input"
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
                    <label for="L_repass" class="layui-form-label"
                      >确认密码</label
                    >
                    <validation-provider v-slot="{ errors }" vid="confirmation">
                      <div class="layui-input-inline">
                        <input
                          type="password"
                          name="repassword"
                          autocomplete="off"
                          v-model="repassword"
                          placeholder="请再次输入密码"
                          class="layui-input"
                        />
                      </div>
                      <div class="layui-row">
                        <span style="color: #c00">{{ errors[0] }}</span>
                      </div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <label for="L_vercode" class="layui-form-label"
                      >验证码</label
                    >
                    <validation-provider
                      name="code"
                      rules="required|length:4"
                      v-slot="{ errors }"
                    >
                      <div class="layui-input-inline">
                        <input
                          type="text"
                          name="code"
                          placeholder="请输图片入验证码"
                          autocomplete="off"
                          class="layui-input"
                          v-model.trim="code"
                        />
                      </div>
                      <div class="svg" v-html="svg" @click="_getCode()"></div>
                      <div class="layui-row">
                        <span style="color: #c00">{{ errors[0] }}</span>
                      </div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <button class="layui-btn" type="button" @click="validate().then(submit)">
                      立即注册
                    </button>
                  </div>
                  <div class="layui-form-item fly-form-app">
                    <span>或者直接使用社交账号快捷注册</span>
                    <a
                      href=""
                      onclick="layer.msg('正在通过QQ登入', {icon:16, shade: 0.1, time:0})"
                      class="iconfont icon-qq"
                      title="QQ登入"
                    ></a>
                    <a
                      href=""
                      onclick="layer.msg('正在通过微博登入', {icon:16, shade: 0.1, time:0})"
                      class="iconfont icon-weibo"
                      title="微博登入"
                    ></a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </validation-observer>
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { getCode, reg } from '@/api/login'
export default {
  name: 'reg',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      username: '',
      name: '',
      password: '',
      repassword: '',
      code: '',
      svg: ''
    }
  },
  mounted () {
    this._getCode()
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
        // ABORT!!
        return
      }
      reg({
        username: this.username,
        password: this.password,
        name: this.name,
        code: this.code,
        sid: this.$store.state.sid
      }).then((res) => {
        if (res.code === 200) {
          this.username = ''
          this.password = ''
          this.repassword = ''
          this.name = ''
          this.code = ''
          requestAnimationFrame(() => {
            this.$refs.observer.reset()
          })
          // 跳转到登录界面，让用户登录
          this.$alert('注册成功')
          setTimeout(() => {
            this.$router.push('/login')
          }, 1000)
        } else {
          // username -> '用户名已经注册'
          // res.msg = { username: [], name: [], code: []}
          this.$refs.observer.setErrors(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.svg {
  float: left;
  position: relative;
  top: -4px;
}
</style>
