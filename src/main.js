// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import colors from 'vuetify/es5/util/colors'
import VueCordova from 'vue-cordova'
import VueHead from 'vue-head'
import SvgIcon from 'vue-svgicon'
import './assets/sirp-icon'
import './assets/styles/sirp-icons.css'

import App from './App'
import router from './router'

import VueClipboard from 'vue-clipboard2'

let theme = {
  primary: colors.indigo.base,
  secondary: colors.indigo.darken4,
  accent: colors.blue.accent2,
  error: colors.red.base,
  warning: colors.amber.base,
  info: colors.cyan.base,
  success: colors.green.base
}

Vue.config.productionTip = false
VueClipboard.config.autoSetContainer = true // add this line

Vue.use(Vuetify, { theme: theme })
Vue.use(VueCordova)
Vue.use(VueHead)
Vue.use(VueClipboard)
Vue.use(SvgIcon, {
  tagName: 'sirp-icon',
  classPrefix: 'sirp-svg'
})

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
