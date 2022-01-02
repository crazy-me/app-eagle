import Vue from 'vue'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import * as echarts from 'echarts'
import App from './App.vue'
import router from './router'
import createStore from './store/store'
import { message } from '@/common/ResetMessage'

import './assets/fonts/iconfont.css'
import '../theme/deepBlue/index.css'
import 'element-ui/lib/theme-chalk/display.css'
import './assets/css/public.css'

Vue.use(ElementUI)
Vue.use(Vuex)

Vue.prototype.$echarts = echarts
Vue.prototype.$message = message

const store = createStore()
const hasPermission = (userPermission) => {
  // let btnPermissionList = store.getters.getButtonList
  let btnPermissionList = JSON.parse(localStorage.getItem('buttonListB'))
  // let status = btnPermissionList.includes(userPermission)
  let path = userPermission.split('||')
  let status = false
  let pathLen = path.length
  for (var i = 0; i < pathLen; i++) {
    let tmpPath = path[i].replace(/^"|'|\s+/g, '')
    if (btnPermissionList.includes(tmpPath)) {
      status = true
      break
    }
  }
  return status
}
Vue.directive('has', {
  inserted: function(el, binding) {
    if (!hasPermission(binding.expression)) {
      el.parentNode.removeChild(el)
    }
  }
})

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: (h) => h(App)
}).$mount('#app')
