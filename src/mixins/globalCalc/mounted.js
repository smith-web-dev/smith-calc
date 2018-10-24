export function mounted () {
  this.$emit('toolbarExtended', false)
  this.$emit('toolbarFab', { visible: false })
  this.isDark = JSON.parse(this.$ls.get('appDarkMode'))
  this.decimalRounding = Number(this.$ls.get('appDecimalRounding'))
}
