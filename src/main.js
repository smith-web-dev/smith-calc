// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import VueCordova from 'vue-cordova'
import VueHead from 'vue-head'
import SvgIcon from 'vue-svgicon'
import VueLocalStorage from 'vue-localstorage'
import Vue2Filters from 'vue2-filters'
// import * as moment from 'moment'
import './assets/sirp-icon'
import './assets/styles/sirp-icons.css'

import App from './App'
import router from './router'

import VueClipboard from 'vue-clipboard2'

import theme from '@/data/theme.js'

import { makeAverage } from '@/util/index.js'

Vue.config.productionTip = false
VueClipboard.config.autoSetContainer = true // add this line

Vue.use(Vuetify, { theme: theme })
Vue.use(VueCordova)
Vue.use(VueHead)
Vue.use(VueClipboard)
Vue.use(VueLocalStorage, { name: 'ls', bind: true })
Vue.use(SvgIcon, { tagName: 'sirp-icon', classPrefix: 'sirp-svg' })
Vue.use(require('vue-moment'))
Vue.use(Vue2Filters)
Vue.use(require('moment'))

Vue.use(makeAverage)

// add cordova.js only if serving the app through file://
if (window.location.protocol === 'file:' || window.location.port === '3000') {
  var cordovaScript = document.createElement('script')
  cordovaScript.setAttribute('type', 'text/javascript')
  cordovaScript.setAttribute('src', 'cordova.js')
  document.body.appendChild(cordovaScript)
}

// Mixins
Vue.mixin({
  methods: {
    capitalizeFirstLetter: str => str.charAt(0).toUpperCase() + str.slice(1)
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
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
