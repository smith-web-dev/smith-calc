<template lang="pug">
  v-container(fill-height)
    v-layout.text-xs-center(justify-center align-center wrap)
      v-flex(xs12)
        p.headline.font-weight-light Select a calculator to get started
      v-flex.home-calc-btn(shrink v-for='(n, i) in $arrayFilter(navItems, `display`, true)' :key='i' xs6 md4)
        v-btn.v-btn--xlarge(:color='n.color' fab :to='n.path')
          v-icon(large) {{ n.icon }}
        br
        span.subheading.font-weight-light {{ n.text }}
</template>

<script>
  import navItems from '../data/MainNavItems.json'
  import { theAppIsDark } from '@/mixins/appIsDark.js'
  import { globalCalc } from '@/mixins/globalCalc.js'
  import moment from 'moment'

  export default {
    mixins: [
      theAppIsDark,
      globalCalc
    ],
    data () {
      return {
        feedback: {
          name: '',
          email: '',
          note: '',
          date: moment(),
          version: this.$ls.get('SmithCalcVersion'),
          dark: this.$ls.get('appDarkMode'),
          shipments: this.$ls.get('shipments')
        },
        navItems: navItems
      }
    },
    computed: {
    },
    methods: {
      submitForm () {
        var http = new XMLHttpRequest()
        http.open('POST', 'https://script.google.com/macros/s/AKfycbwaI3SQlw4-IQ7wQEN0wqKLY-T1EWt8_6r28xItXFYd7rwRkrA/exec', true)
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
        // probably use document.getElementById(...).value
        // var params = "search=" + <<get search value>>
        // http.send(params)
        http.onload = function () {
          alert(http.responseText)
        }
      }
    }
  }
</script>

<style>
  .home-calc-btn {
    max-width: 136px;
    height: 180px;
  }

  .v-menu__content,
  .v-card {
    border-radius: 8px !important;
  }

  .hide-this {
    /*display: none !important;*/
  }
</style>
