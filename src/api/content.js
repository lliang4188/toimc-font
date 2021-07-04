import axios from '@/utils/request'
import qs from 'qs'

/**
 * 读取文章列表
 * @param {*} options 读取文章列表的参数
 * @returns
 */
const getList = (options) => {
  return axios.get('/public/list?' + qs.stringify(options))
}

// 温馨提醒
const getTips = () => axios.get('/public/tips')

// 本周热议
const getTop = () => axios.get('/public/topWeek')

// 友情链接
const getLinks = () => axios.get('/public/links')

// 图片上传接口
const uploadImg = (formData) => axios.post('/content/upload', formData)

export {
  getList,
  getTips,
  getTop,
  getLinks,
  uploadImg
}
