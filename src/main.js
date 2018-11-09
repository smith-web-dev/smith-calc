// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import VueCordova from 'vue-cordova'
import VueHead from 'vue-head'
import VueLocalStorage from 'vue-localstorage'
import Vue2Filters from 'vue2-filters'
import VueClipboard from 'vue-clipboard2'

import App from './App'
import router from './router'
import { store } from './store'

import themes from 'AUI/themes/index'
import icons from 'AUI/icons'

import 'vuetify/dist/vuetify.css'
import 'AUI/styles/main.sass'
// import 'material-design-icons-iconfont/dist/material-design-icons.css'
// import 'roboto-fontface/css/roboto/roboto-fontface.css'
// import '@fortawesome/fontawesome-pro/css/all.css'

import {
  makeAverage,
  findCrimpSpec,
  noNullVals,
  arrayFilter
} from 'UTL/index.js'

Vue.config.productionTip = false
VueClipboard.config.autoSetContainer = true

Vue.use(Vuetify, {
  options: {
    customProperties: true
  },
  theme: themes.light,
  icons: icons
})
Vue.use(VueLocalStorage, {
  name: 'ls',
  bind: true
})
Vue.use(VueCordova)
Vue.use(VueHead)
Vue.use(VueClipboard)
Vue.use(Vue2Filters)

Vue.use(makeAverage)
Vue.use(findCrimpSpec)
Vue.use(noNullVals)
Vue.use(arrayFilter)

Vue.use(require('vue-moment'))
Vue.use(require('moment'))

// add cordova.js only if serving the app through file://
if (window.location.protocol === 'file:' || window.location.port === '3000') {
  var cordovaScript = document.createElement('script')
  cordovaScript.setAttribute('type', 'text/javascript')
  cordovaScript.setAttribute('src', 'cordova.js')
  document.body.appendChild(cordovaScript)
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  head: {
    meta: [
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover'
      }
    ]
  }
})
