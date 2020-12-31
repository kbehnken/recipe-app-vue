import Vue from 'vue'
import App from './App.vue'
import router from './router/routes'
import VueToastify from 'vue-toastify'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

Vue.use(VueToastify, {
  position: 'top-right',
  theme: 'light',
  iconEnabled: false
})

new Vue({
  router: router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
