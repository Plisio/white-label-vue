import Vue from 'vue'
import Invoice from './Invoice.vue'
import './plugins'

Vue.config.productionTip = false

new Vue({
  render: h => h(Invoice)
}).$mount('#app')
