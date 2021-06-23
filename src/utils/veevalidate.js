import { extend, localize } from 'vee-validate'
import { required, email, min, max, length, confirmed } from 'vee-validate/dist/rules'

import zh from 'vee-validate/dist/locale/zh_CN.json'

extend('required', required)
extend('email', email)
extend('min', min)
extend('max', max)
extend('length', length)
extend('confirmed', confirmed)

// Custom validate
extend('name', {
  validate: value => {
    return !/^\d+/.test(value)
  },
  message: '不能以纯数字为昵称'
})

localize('zh_CN', {
  messages: {
    ...zh.messages,
    required: '请输入{_field_}',
    min: () => '不符合最小长度要求',
    max: () => '不符合最大长度要求',
    length: (field, args) => field + '长度要求' + args.length,
    confirmed: (field, args) => field + '不能和' + args._value_ + '相匹配'
  },
  names: {
    email: '邮箱',
    password: '密码',
    name: '昵称',
    username: '账号',
    code: '验证码'
  },
  fields: {
    username: {
      email: '请输入正确的邮箱'
    },
    email: {
      email: '请输入正确的{_field_}'
    },
    name: {
      min: (field, { length }) => {
        return `${field}输入最少${length}个字符`
      },
      max: (field, { length }) => {
        return `${field}输入最多${length}个字符`
      }
    },
    password: {
      min: (field, { length }) => {
        return `${field}最少输入${length}个字符`
      },
      max: (field, { length }) => {
        return `${field}最多输入${length}个字符`
      }
    }
  }
})
