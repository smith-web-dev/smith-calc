<template lang="pug">
  v-app#inspire
    include ./App/_01-navDrawer.pug
    include ./App/_02-toolbar.pug
    v-content
      router-view
</template>

<script>
  import Vue from 'vue'
  import navItems from './data/MainNavItems.json'
  export default {
    data () {
      return {
        drawer: false,
        // navItems: [
        //   {
        //     icon: {
        //       type: 'mdi',
        //       name: 'star'
        //     },
        //     text: 'Roll Length',
        //     path: '/roll-length'
        //   },
        //   {
        //     icon: {
        //       type: 'mdi',
        //       name: 'star'
        //     },
        //     text: 'Conveyor Length',
        //     path: '/cb-length'
        //   },
        //   {
        //     icon: {
        //       type: 'mdi',
        //       name: 'star'
        //     },
        //     text: 'Square Footage',
        //     path: '/sqft'
        //   },
        //   {
        //     icon: {
        //       type: 'mdi',
        //       name: 'star'
        //     },
        //     text: 'Conveyor Belt Weight',
        //     path: '/cb-weight'
        //   },
        //   {
        //     icon: {
        //       type: 'mdi',
        //       name: 'star'
        //     },
        //     text: 'Snowplow Blade Weight',
        //     path: '/snowplow-weight'
        //   },
        //   {
        //     icon: {
        //       type: 'sirp',
        //       name: 'crimp'
        //     },
        //     text: 'Crimp',
        //     path: '/crimp'
        //   }
        // ],
        navItems: navItems,
        cordova: Vue.cordova,
        title: 'SmithCalc'
      }
    },
    created () {
      var self = this
      this.cordova.on('deviceready', () => {
        self.onDeviceReady()
      })
    },
    methods: {
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
</style>

<style scoped>
  .v-avatar img {
    border-radius: unset !important;
  }
</style>
