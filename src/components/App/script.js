import Vue from 'vue'
import firebase from 'firebase'
import navItems from 'DATA/MainNavItems.json'
// import navDrawerItems from 'DATA/NavDrawerItems.json'
import { globalCalc } from 'MXN/globalCalc'
import firebaseConfig from 'DATA/firebase.json'
import FileUpload from '@/components/FileUpload/Index.vue'
import localStorageValues from 'DATA/localStorageValues'

let pjson = require('../../../package.json')

export default {
  components: {
    FileUpload: FileUpload
  },
  mixins: [ globalCalc ],
  data () {
    return {
      currentVersion: null,
      clearDataDialog: false,
      isMetric: false,
      navItems: navItems,
      panel: [],
      cordova: Vue.cordova,
      title: 'SmithCalc',
      toolbarExtended: false,
      toolbarFab: {
        visible: false,
        icon: String
      },
      toolbarFabVisible: false,
      toolbarFabIcon: null,
      childFunc: Function,
      toolbarResetBtn: false
    }
  },
  watch: {
    avatar: {
      handler: function () {
        this.saved = false
      },
      deep: true
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

    //
    // Local Storage Checks
    // ('local storage value', 'data value', 'default value')
    //
    var lsi
    for (lsi = 0; lsi < localStorageValues.length; ++lsi) {
      var tmp = this.$ls.get(localStorageValues[lsi].lsValue)
      // check if its in localstorage
      if (tmp === null) {
        this.$ls.set(localStorageValues[lsi].lsValue, localStorageValues[lsi].defaultValue)
        tmp = this.$ls.get(localStorageValues[lsi].lsValue)
        this[localStorageValues[lsi].dataValue] = JSON.parse(tmp)
      } else {
        tmp = this.$ls.get(localStorageValues[lsi].lsValue)
        this[localStorageValues[lsi].dataValue] = JSON.parse(tmp)
      }
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
