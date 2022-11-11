// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/mainStore'
import Vuex from 'vuex'
Vue.config.productionTip = false
/* eslint-disable no-new */
import './assets/css/global.css';
new Vue({
  el: '#app',
  router,
  store: store,
  components: { App },
  template: '<App/>'
})
