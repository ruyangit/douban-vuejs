// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Meta from 'vue-meta'
import router from './router'
import iView from 'iview'
import store from './store'

import { sync } from 'vuex-router-sync'

Vue.config.productionTip = false

Vue.use(Meta)
Vue.use(iView)

sync(store, router)

/* eslint-disable no-new */

const app = new Vue({
    router,
    store,
    render: h => h(App)
})

app.$mount('#app')

// new Vue({
//   el: '#app',
//   router,
//   template: '<App/>',
//   components: { App }
// })
