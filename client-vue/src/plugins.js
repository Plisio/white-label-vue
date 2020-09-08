import Vue from 'vue'
import {
  BootstrapVue
  // BootstrapVueIcons
} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import Notifications from 'vue-notification'
import Clipboard from '@/components/ui/Clipboard'
import SvgIcon from '@/components/icons/SvgIcon'

Vue.use(BootstrapVue)
// Vue.use(BootstrapVueIcons)

Vue.use(Notifications)
Vue.component('Clipboard', Clipboard)
Vue.component('SvgIcon', SvgIcon)
