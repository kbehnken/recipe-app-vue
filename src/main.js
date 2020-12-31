import Vue from 'vue'
import App from './App.vue'
import router from './router/routes'
import VueToastify from 'vue-toastify'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.config.productionTip = false

Vue.use(VueToastify, {
  position: 'top-right',
  theme: 'light',
  iconEnabled: false
})

Vue.use(VueMaterial)

new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')
