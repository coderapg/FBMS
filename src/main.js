import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 全局
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

// 按需引入element-ui
// import './plugins/ele-ui'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
