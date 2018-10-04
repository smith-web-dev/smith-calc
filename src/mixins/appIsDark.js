export default {
  computed: {
    appIsDark () {
      var appDarkMode = this.$ls.get('appDarkMode')
      // check if its in localstorage
      if (appDarkMode === false) {
        this.$ls.set('appDarkMode', false)
        appDarkMode = this.$ls.get('appDarkMode')
        return JSON.parse(appDarkMode)
      } else {
        appDarkMode = this.$ls.get('appDarkMode')
        return JSON.parse(appDarkMode)
      }
    }
  }
}
