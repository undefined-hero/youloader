import Vue from 'vue'
import App from './App'
import VeeValidate from 'vee-validate'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

Vue.use(VeeValidate, {
  classes: true
})

/* eslint-disable no-new */
new Vue({
  components: { App },
  template: '<App/>'
}).$mount('#app')
