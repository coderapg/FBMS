import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 按需引入element-ui
import './plugins/ele-ui'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
