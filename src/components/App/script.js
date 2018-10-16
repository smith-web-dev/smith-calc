import Vue from 'vue'
import firebase from 'firebase'
import navItems from 'DATA/MainNavItems.json'
import { globalCalc } from 'MXN/globalCalc.js'
import firebaseConfig from 'DATA/firebase.json'

let pjson = require('../../../package.json')

export default {
  mixins: [ globalCalc ],
  data () {
    return {
      testAlert: true,
      currentVersion: null,
      settingsDialog: false,
      clearDataDialog: false,
      isMetric: false,
      drawer: false,
      navItems: navItems,
      cordova: Vue.cordova,
      title: 'SmithCalc',
      toolbarExtended: false,
      toolbarFab: {
        visible: false,
        icon: String
      },
      toolbarFabVisible: false,
      toolbarFabIcon: null,
      childFunc: Function
    }
  },
  created () {
    // Firebase
    //
    firebase.initializeApp(firebaseConfig)
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
    //
    //
    this.currentVersion = pjson.version
    this.$ls.set('SmithCalcVersion', this.currentVersion)

    var self = this
    this.cordova.on('deviceready', () => {
      self.onDeviceReady()
    })
    var appDarkMode = this.$ls.get('appDarkMode')
    // check if its in localstorage
    if (appDarkMode === null) {
      this.$ls.set('appDarkMode', false)
      appDarkMode = this.$ls.get('appDarkMode')
      this.isDark = JSON.parse(appDarkMode)
    } else {
      appDarkMode = this.$ls.get('appDarkMode')
      this.isDark = JSON.parse(appDarkMode)
    }

    var appDecimalRounding = this.$ls.get('appDecimalRounding')
    // check if its in localstorage
    if (appDecimalRounding === null) {
      this.$ls.set('appDecimalRounding', 3)
      appDecimalRounding = this.$ls.get('appDecimalRounding')
      this.decimalRounding = JSON.parse(appDecimalRounding)
    } else {
      appDecimalRounding = this.$ls.get('appDecimalRounding')
      this.decimalRounding = JSON.parse(appDecimalRounding)
    }

    var cbWeightUserBelts = this.$ls.get('cbWeightUserBelts')
    let blankUserBelts = []
    // check if its in localstorage
    if (cbWeightUserBelts === null) {
      this.$ls.set('cbWeightUserBelts', JSON.stringify(blankUserBelts))
      cbWeightUserBelts = this.$ls.get('cbWeightUserBelts')
      this.cbWeightUserBelts = JSON.parse(cbWeightUserBelts)
    } else {
      cbWeightUserBelts = this.$ls.get('cbWeightUserBelts')
      this.cbWeightUserBelts = JSON.parse(cbWeightUserBelts)
    }
  },
  methods: {
    clearAllTheThings () {
      this.$ls.remove('appMetricUnits')
      this.$ls.remove('appDarkMode')
      this.$ls.remove('shipments')
      this.$ls.remove('appDecimalRounding')
      this.$ls.remove('cbWeightUserBelts')
      this.$ls.set('appDecimalRounding', 3)
      this.clearDataDialog = false
    },
    fabClicked (func) {
      this.childFunc = func
    },
    makeToolbarExtended (theBool) {
      this.toolbarExtended = theBool
    },
    setToolbarFab (fabObj) {
      this.toolbarFab = fabObj
    },
    onDeviceReady: function () {
      // Handle the device ready event.
      this.cordova.on('pause', this.onPause, false)
      this.cordova.on('resume', this.onResume, false)
      if (this.cordova.device.platform === 'Android') {
        document.addEventListener('backbutton', this.onBackKeyDown, false)
      }
    },
    onPause () {
      // Handle the pause lifecycle event.
      console.log('pause')
    },
    onResume () {
      // Handle the resume lifecycle event.
      // SetTimeout required for iOS.
      setTimeout(function () {
        console.log('resume')
      }, 0)
    },
    onBackKeyDown () {
      // Handle the back-button event on Android. By default it will exit the app.
      navigator.app.exitApp()
    }
  },
  computed: {
    localDataCheck () {
      if (this.$ls.get('appMetricUnits') === null && this.$ls.get('appDarkMode') === null && this.$ls.get('shipments') === null) {
        return true
      } else {
        return false
      }
    },
    theAppIsDark () {
      return JSON.parse(this.$ls.get('appDarkMode'))
    },
    displayNavItems () {
      let theNavItems = this.navItems
      var result = theNavItems.filter(obj => {
        return obj.display === true
      })
      return result
    }
  }
}
