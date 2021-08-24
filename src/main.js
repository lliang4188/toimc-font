import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from './store'
import Alert from './components/moudles/alert'
import Pop from './components/moudles/pop'
import '@/utils/veevalidate'
import filiter from '@/utils/filiter'
import direcives from '@/utils/directives'
Vue.use(Alert)
Vue.use(Pop)
Vue.config.productionTip = false

Object.keys(filiter).forEach((key) => {
  Vue.filter(key, filiter[key])
})

Object.keys(direcives).forEach(key => {
  Vue.directive(key, direcives[key])
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
