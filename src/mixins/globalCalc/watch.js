import themes from 'AUI/themes/index'
export default {
  user (value) {
    if (value !== null && value !== undefined) {
      this.$router.push('/')
    }
  },
  '$vuetify.dark': {
    immediate: true,
    handler (dark) {
      if (dark) {
        this.$vuetify.theme = {
          ...this.$vuetify.theme,
          // ...DARK_THEME
          ...themes.dark
        }
      } else {
        this.$vuetify.theme = {
          ...this.$vuetify.theme,
          // ...LIGHT_THEME
          ...themes.light
        }
      }
    }
  }
}
