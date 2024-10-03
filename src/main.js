import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import Notifications from 'vue-notification'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/css/main.css'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(Notifications)

Vue.config.productionTip = false

//update keranjang dengan eventBus
export const eventBus = new Vue();

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
