// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import VueCordova from 'vue-cordova'
import VueHead from 'vue-head'
import VueLocalStorage from 'vue-localstorage'
import Vue2Filters from 'vue2-filters'
import VueClipboard from 'vue-clipboard2'
import theme from '@/data/theme.js'

import App from './App'
import router from './router'

import { makeAverage, findCrimpSpec, noNullVals, arrayFilter } from '@/util/index.js'
// import { theAppIsDark } from '@/mixins/appIsDark.js'
// import appIsDark from '@/mixins/appIsDark'

Vue.config.productionTip = false
VueClipboard.config.autoSetContainer = true // add this line

Vue.use(Vuetify, {
  theme: theme,
  iconfont: 'fa',
  icons: {
    // complete: 'fal fa-check'
  }
})
Vue.use(VueCordova)
Vue.use(VueHead)
Vue.use(VueClipboard)
Vue.use(VueLocalStorage, { name: 'ls', bind: true })
Vue.use(require('vue-moment'))
Vue.use(Vue2Filters)
Vue.use(require('moment'))

// Vue.use(makeAverage)
Vue.use(makeAverage)
Vue.use(findCrimpSpec)
Vue.use(noNullVals)
Vue.use(arrayFilter)

// add cordova.js only if serving the app through file://
if (window.location.protocol === 'file:' || window.location.port === '3000') {
  var cordovaScript = document.createElement('script')
  cordovaScript.setAttribute('type', 'text/javascript')
  cordovaScript.setAttribute('src', 'cordova.js')
  document.body.appendChild(cordovaScript)
}

// this.$vuetify.icons.complete = 'far fa-star'

// Mixins
Vue.mixin({
  methods: {
    snowplowCalc (size, length, qty) {
      return size * length * qty
    }
  },
  computed: {
    theAppIsMetric () {
      var appMetricUnits = this.$ls.get('appMetricUnits')
      return JSON.parse(appMetricUnits)
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  // mixins: [ theAppIsDark ],
  head: {
    meta: [
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover'
      }
    ]
  }
})
