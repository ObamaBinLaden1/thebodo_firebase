// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueFire from 'vuefire'
import Toasted from 'vue-toasted'

Vue.config.productionTip = false

require('./style/normalize.css')
require('./style/skeleton.css')
Vue.use(VueFire)
Vue.use(Toasted, {duration: 1000})

Vue.component('bounce-loader', require('vue-spinner/src/BounceLoader.vue'))
Vue.component('clip-loader', require('vue-spinner/src/ClipLoader.vue'))

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
