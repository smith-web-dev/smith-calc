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

  export default {
    mixins: [
      theAppIsDark,
      globalCalc
    ],
    data () {
      return {
        navItems: navItems
      }
    },
    computed: {
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
</style>
