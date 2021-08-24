<template>
  <div class="layui-form layui-form-pane layui-tab-item layui-show">
    <validation-observer ref="observer" v-slot="{ validate }">
      <validation-provider
        name="email"
        rules="required|email"
        v-slot="{ errors }"
      >
        <div class="layui-form-item">
          <label class="layui-form-label">邮箱</label>
          <div class="layui-input-inline">
            <input
              type="text"
              name="email"
              autocomplete="off"
              v-model="username"
              class="layui-input"
            />
          </div>
          <!-- <div class="layui-form-mid layui-word-aux">
            如果您在邮箱已激活的情况下，变更了邮箱，需<a
              href="activate.html"
              style="font-size: 12px; color: #4f99cf"
              >重新验证邮箱</a
            >。
          </div> -->
          <div class="layui-form-mid">
            <span style="color: #c00">{{ errors[0] }}</span>
          </div>
        </div>
      </validation-provider>
      <div class="layui-form-item">
        <validation-provider
          name="name"
          rules="required|name"
          v-slot="{ errors }"
        >
          <label class="layui-form-label">昵称</label>
          <div class="layui-input-inline">
            <input
              type="text"
              name="name"
              autocomplete="off"
              class="layui-input"
              v-model="name"
            />
          </div>
          <div class="layui-form-mid">
            <span style="color: #c00">{{ errors[0] }}</span>
          </div>
        </validation-provider>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">城市</label>
        <div class="layui-input-inline">
          <input type="text" class="layui-input" v-model="location" />
        </div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">性别</label>
        <div class="layui-input-inline">
          <label for="gender1">
            <input
              type="radio"
              id="gender1"
              v-model="gender"
              name="sex"
              value="0"
              title="男"
            />
            <div
              class="layui-unselect layui-form-radio"
              :class="{ 'layui-form-radioed': gender === '0' }"
            >
              <i
                class="layui-anim layui-icon layui-icon-circle"
                :class="{ 'layui-icon-radio': gender === '0' }"
              ></i
              ><span>男</span>
            </div>
          </label>
          <label for="gender2">
            <input
              type="radio"
              id="gender2"
              name="sex"
              value="1"
              title="女"
              v-model="gender"
            />
            <div
              class="layui-unselect layui-form-radio"
              :class="{ 'layui-form-radioed': gender === '1' }"
              for="gender2"
            >
              <i
                class="layui-anim layui-icon layui-icon-circle"
                :class="{ 'layui-icon-radio': gender === '1' }"
              ></i
              ><span>女</span>
            </div>
          </label>
        </div>
      </div>
      <div class="layui-form-item layui-form-text">
        <label for="L_sign" class="layui-form-label">签名</label>
        <div class="layui-input-block">
          <textarea
            placeholder="随便写些什么刷下存在感"
            v-model="regmark"
            class="layui-textarea"
            style="height: 80px"
            value= ""
          ></textarea>
        </div>
      </div>
      <div class="layui-form-item">
        <button
          class="layui-btn"
          type="button"
          @click="validate().then(submit)"
        >
          确认修改
        </button>
      </div>
    </validation-observer>
  </div>
</template>

<script>
import { updateUserInfo } from '@/api/user.js'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
export default {
  name: 'myinfo',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      username: '',
      name: '',
      location: '',
      gender: '',
      regmark: ''
    }
  },
  mounted () {
    console.log(this.$store.state.userInfo)
    let { username, name, location, gender, regmark } = this.$store.state.userInfo
    this.username = username || ''
    this.name = name || ''
    this.location = location || ''
    this.gender = gender || ''
    this.regmark = regmark || ''
  },
  methods: {
    async submit () {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return
      }
      const options = {
        username: this.username,
        name: this.name,
        location: this.location,
        gender: this.gender,
        regmark: this.regmark
      }
      updateUserInfo(options).then((res) => {
        if (res.code === 200) {
          this.$store.commit('setUserInfo', {
            ...this.$store.state.userInfo,
            ...{
              username: this.username,
              name: this.name,
              location: this.location,
              gender: this.gender,
              regmark: this.regmark
            }
          })
          this.$alert(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
