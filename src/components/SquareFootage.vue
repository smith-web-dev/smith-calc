<template lang="pug">
  div
    v-toolbar.primary(style='margin-top: -55px;')
      | {{ msg }}
</template>

<script>
  export default {
    data () {
      return {
        msg: 'SquareFootage'
      }
    }
  }
</script>
