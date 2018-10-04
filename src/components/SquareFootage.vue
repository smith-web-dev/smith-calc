<template lang="pug">
  div
    p {{ msg }}
</template>

<script>
  import ColorProps from '@/data/colorProps.json'
  export default {
    mounted () {
      this.$emit('toolbarExtended', false)
      this.$emit('toolbarFab', { visible: false })
    },
    data () {
      return {
        colorProps: ColorProps,
        msg: 'SquareFootage'
      }
    },
    computed: {
      theAppIsDark () {
        return JSON.parse(this.$ls.get('appDarkMode'))
      }
    }
  }
</script>
