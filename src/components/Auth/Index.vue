<template lang="pug">
  v-container(fluid fill-height)
    include /mixins/_index.pug
    v-layout(align-center justify-center)
      v-flex( xs12 sm9 md6)
        v-card.elevation-20
          v-card-text
            include ./template/_01-form.pug
          include ./template/_02-actions.pug

</template>

<script>
  // import firebase from 'firebase'
  import { theAppIsDark } from 'MXN/appIsDark.js'
  import { globalCalc } from 'MXN/globalCalc.js'

  export default {
    mixins: [
      theAppIsDark,
      globalCalc
    ],
    created () {
      if (this.$store.getters.user !== null) {
        this.loggingIn = false
      } else {
        this.loggingIn = true
      }
    },
    data: () => ({
      loggingIn: true,
      loginButtons: false,
      form: {
        email: '',
        pass: ''
      }
    }),
    methods: {
      //
    }
  }
</script>
