export const theAppIsDark = {
  computed: {
    theAppIsDark () {
      return JSON.parse(this.$ls.get('appDarkMode'))
    }
  }
}
