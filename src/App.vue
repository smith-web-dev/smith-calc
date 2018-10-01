<template lang="pug">
  v-app(:dark='isDark')
    include ./views/Global/_navDrawer.pug
    include ./views/Global/_toolbar.pug
    v-content
      //- span {{ $route }}
      //- p {{ toolbarExtended }}
      router-view(
      @toolbarExtended='makeToolbarExtended'
      @toolbarFab='setToolbarFab'
      @childFunc='fabClicked')
</template>

<script>
  import Vue from 'vue'
  import navItems from './data/MainNavItems.json'
  export default {
    data () {
      return {
        isDark: false,
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
    },
    methods: {
      toggleDarkMode () {
        var appDarkMode = this.$ls.get('appDarkMode')

        if (JSON.parse(appDarkMode) === false) {
          this.$ls.set('appDarkMode', JSON.stringify(true))
          this.isDark = true
        } else {
          this.$ls.set('appDarkMode', JSON.stringify(false))
          this.isDark = false
        }
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
    }
  }
</script>

<style>
	body {
    padding-top: constant(safe-area-inset-top);
    padding-top: env(safe-area-inset-top);
	}

  .footer{ /* Apply this to v-bottom-nav if necessary. */
    margin-bottom: constant(safe-area-inset-bottom);
    margin-bottom: env(safe-area-inset-bottom);
  }

  .v-btn--xlarge {
    height: 120px;
    width: 120px;
  }
</style>

<style scoped>
  .v-avatar img {
    border-radius: unset !important;
  }
</style>
