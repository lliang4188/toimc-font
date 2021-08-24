import store from '@/store'
class WebSocketClient {
  constructor (config = {}) {
    const defautConfig = {
      url: '127.0.0.1',
      port: '3001',
      protocol: 'ws',
      timeInterval: 5 * 1000
    }
    const finalConfig = { ...defautConfig, ...config }
    this.ws = {}
    this.port = finalConfig.port
    this.url = finalConfig.url
    this.protocol = finalConfig.protocol
    this.handle = null
    this.timeInterval = finalConfig.timeInterval
  }

  init () {
    this.ws = new WebSocket(`${this.protocol}://${this.url}:${this.port}`)
    this.ws.onopen = (msg) => this.onOpen(msg)
    this.ws.onmessage = (msg) => this.onMessage(msg)
    this.ws.onclose = () => this.onClose()
    this.ws.onerror = () => this.onError()
  }

  send (msg) {
    this.ws.send(msg)
  }

  onOpen () {
    // 发起鉴权请求
    this.send(JSON.stringify({
      event: 'auth',
      message: 'Bearer ' + store.state.token
    }))
    this.checkServer()
  }
  onMessage (event) {
    // 用户未进入聊天室，则不接收消息
    if (this.isShow) {
      return
    }
    // 接收服务端发来的消息
    var obj = JSON.parse(event.data)
    switch (obj.event) {
      case 'noauth' :
        // 鉴权失败
        // 路由跳转到 /login 重新获取token
        break
      case 'heartbeat':
        this.checkServer() // timeInterval + t
        this.ws.send(JSON.stringify({
          event: 'heartbeat',
          message: 'pong'
        }))
        break
      default:
        store.dispatch(obj.event, obj)
    }
  }
  // 当链接主动断开当时候触发close事件
  onClose () {
    // console.log('close:' + this.ws.readyState)
    // console.log('已关闭websocket')
    this.ws.close()
  }
  // 当链接失败时，触发 error 事件
  onError () {
    // console.log('error:' + this.ws.readyState)
    // console.log('websocket链接失败')
    // 链接失败后，1s进行断线重连
    setTimeout(() => {
      this.init()
    }, 1000)
  }

  checkServer () {
    clearTimeout(this.handle)
    this.handle = setTimeout(() => {
      this.onClose()
      this.onError()
      // 设置 1ms的时延， 调试在服务器测未及时响应式，客户端的反应
    }, this.timeInterval)
  }
}

export default WebSocketClient
