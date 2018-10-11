<template lang="pug">
  v-app(:dark='isDark')
    include ./views/mixins/_index.pug
    include ./views/Global/_navDrawer.pug
    include ./views/Global/_toolbar.pug
    include ./views/Global/_settingsBottomSheet.pug

    +genericDialog('Clear all app data?',  'This will clear all preferences and data stored in the app, and can not be undone. Do you want to continue?')(model='clearDataDialog' width='300px' yclick='clearAllTheThings()' nclick='clearDataDialog = false')

    v-content
      v-container.pa-0.ma-0(fluid)
        v-layout(row justify-center)
          v-flex(xs12 md10 lg8 xl6)
            router-view(
            @toolbarExtended='makeToolbarExtended'
            @toolbarFab='setToolbarFab'
            @childFunc='fabClicked')
</template>

<script>
  import Vue from 'vue'
  import navItems from './data/MainNavItems.json'
  import { globalCalc } from '@/mixins/globalCalc.js'

  let pjson = require('../package.json')

  export default {
    mixins: [ globalCalc ],
    data () {
      return {
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
      // console.log(pjson.version)
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

      // var appMetricUnits = this.$ls.get('appMetricUnits')
      // // check if its in localstorage
      // if (appMetricUnits === null) {
      //   this.$ls.set('appMetricUnits', false)
      //   appMetricUnits = this.$ls.get('appMetricUnits')
      //   this.isMetric = JSON.parse(appMetricUnits)
      // } else {
      //   appMetricUnits = this.$ls.get('appMetricUnits')
      //   this.isMetric = JSON.parse(appMetricUnits)
      // }
    },
    methods: {
      clearAllTheThings () {
        this.$ls.remove('appMetricUnits')
        this.$ls.remove('appDarkMode')
        this.$ls.remove('shipments')
        this.$ls.remove('appDecimalRounding')
        this.$ls.remove('cbWeightUserBelts')
        this.$ls.set('appDecimalRounding', 3)
        // this.settingsDialog = false
        this.clearDataDialog = false
      },
      // toggleMetricUnits () {
      //   var appMetricUnits = this.$ls.get('appMetricUnits')

      //   if (JSON.parse(appMetricUnits) === false) {
      //     this.$ls.set('appMetricUnits', JSON.stringify(true))
      //     this.isMetric = true
      //   } else {
      //     this.$ls.set('appMetricUnits', JSON.stringify(false))
      //     this.isMetric = false
      //   }
      // },
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
</script>

<style scoped>
  .v-avatar img {
    border-radius: unset !important;
  }
</style>
