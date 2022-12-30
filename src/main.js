import Vue from 'vue'
import App from './App.vue'

// 按需引入element-ui
import './plugins/ele-ui'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
