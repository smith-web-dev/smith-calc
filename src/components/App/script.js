import Vue from 'vue'
import firebase from 'firebase'
import navItems from 'DATA/MainNavItems.json'
// import navDrawerItems from 'DATA/NavDrawerItems.json'
import { globalCalc } from 'MXN/globalCalc'
import firebaseConfig from 'DATA/firebase.json'
import FileUpload from '@/components/FileUpload/Index.vue'

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

    // ---------------
    // Dark mode check
    // ---------------
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

    // --------------------
    // Favorite calcs check
    // --------------------
    var userFaveCalcs = this.$ls.get('userFaveCalcs')
    var blankCalcs = []
    // check if its in localstorage
    if (userFaveCalcs === null || userFaveCalcs === undefined) {
      this.$ls.set('userFaveCalcs', JSON.stringify(blankCalcs))
      userFaveCalcs = this.$ls.get('userFaveCalcs')
      this.faveCalcs = JSON.parse(userFaveCalcs)
    } else {
      userFaveCalcs = this.$ls.get('userFaveCalcs')
      this.faveCalcs = JSON.parse(userFaveCalcs)
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
