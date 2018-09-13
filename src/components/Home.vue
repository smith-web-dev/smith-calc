<template lang="pug">
  div
    v-toolbar.primary(style='margin-top: -55px;')
    v-container(fill-height)
      v-layout.text-xs-center(justify-center align-center wrap)
        v-flex(xs12)
          p.headline.font-weight-light Select a calculator to get started
        v-flex(shrink v-for='(n, i) in navItems' :key='i')
          v-btn.v-btn--xlarge(color='accent' fab :to='n.path')
            v-icon(large) {{ n.icon }}
          br
          span.subheading.font-weight-light {{ n.text }}
</template>

<script>
  import navItems from '../data/MainNavItems.json'
  export default {
    data () {
      return {
        navItems: navItems
      }
    }
  }
</script>
