<template lang="pug">
  v-app#inspire
    v-navigation-drawer(v-model='drawer' fixed clipped app)
      v-toolbar(flat)
        v-list.pa-0
          v-list-tile(avatar)
            v-list-tile-avatar
              img(src="http://smithindustrial.com/webapp/img/icon1.png")
            v-list-tile-content
              v-list-tile-title SmithCalc
              v-list-tile-sub-title v1.0.0
      //- v-list(dense)
      v-list
        //-
        v-list-tile(v-for='(n, i) in navItems' :key='i' :to='n.path')
          v-list-tile-action
            v-icon {{ n.icon }}
          v-list-tile-content
            v-list-tile-title {{ n.text }}
        //-
        //- v-subheader.mt-3.grey--text.text--darken-1 SUBSCRIPTIONS
        //- v-list
        //-   v-list-tile(v-for='item in items2' :key='item.text' avatar @click)
        //-     v-list-tile-avatar
        //-       img(:src='`https://randomuser.me/api/portraits/men/${item.picture}.jpg`' alt)
        //-     v-list-tile-title(v-text='item.text')
        //- v-list-tile.mt-3(@click)
        //-   v-list-tile-action
        //-     v-icon(color='grey darken-1') add_circle_outline
        //-   v-list-tile-title.grey--text.text--darken-1 Browse Channels
        //- v-list-tile(@click)
        //-   v-list-tile-action
        //-     v-icon(color='grey darken-1') settings
        //-   v-list-tile-title.grey--text.text--darken-1 Manage Subscriptions
    v-toolbar.primary(dense fixed clipped-left app dark)
      v-toolbar-side-icon(@click.stop='drawer = !drawer')
      v-icon.mx-3 fab fa-youtube
      v-toolbar-title.mr-5.align-center
        span.title SmithCalc
      v-spacer
    v-content
      router-view
</template>

<script>
  import Vue from 'vue'
  export default {
    data () {
      return {
        drawer: false,
        navItems: [
          { icon: 'star', text: 'Roll Length', path: '/roll-length' },
          { icon: 'star', text: 'Conveyor Length', path: '/cb-length' },
          { icon: 'star', text: 'Square Footage', path: '/sqft' },
          { icon: 'star', text: 'Conveyor Belt Weight', path: '/cb-weight' },
          { icon: 'star', text: 'Snowplow Blade Weight', path: '/snowplow-weight' },
          { icon: 'star', text: 'Crimp', path: '/crimp' }
        ],
        items2: [
          { picture: 28, text: 'Joseph' },
          { picture: 38, text: 'Apple' },
          { picture: 48, text: 'Xbox Ahoy' },
          { picture: 58, text: 'Nokia' },
          { picture: 78, text: 'MKBHD' }
        ],
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
