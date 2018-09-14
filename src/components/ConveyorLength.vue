<template lang="pug">
  div
    p {{ msg }}
</template>

<script>
  export default {
    mounted () {
      this.$emit('toolbarExtended', false)
      this.$emit('toolbarFab', { visible: false })
    },
    data () {
      return {
        msg: 'ConveyorLength'
      }
    }
  }
</script>
