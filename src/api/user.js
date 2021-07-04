import axios from '@/utils/request'
import qs from 'qs'
// 签到接口
const userSign = () => axios.get('/user/fav')

/**
 * 更新用户基本信息
 * @param {Object} data 更新数据
 * @returns
 */

const updateUserInfo = (data) => axios.post('/user/basic', data)

// 确认修改用户名
const updateUsername = (data) => axios.get('/public/reset-email?' + qs.stringify(data))

// 修改用户密码
const changePasswd = (data) => axios.post('/user/change-password', {
  ...data
})

export {
  userSign,
  updateUserInfo,
  updateUsername,
  changePasswd
}
