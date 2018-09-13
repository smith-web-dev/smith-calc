<template lang="pug">
  div
    v-toolbar.primary(style='margin-top: -55px;')
    p {{ msg }}
</template>

<script>
  export default {
    data () {
      return {
        msg: 'ConveyorLength'
      }
    }
  }
</script>
