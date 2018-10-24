export function created () {
  this.isDark = JSON.parse(this.$ls.get('appDarkMode'))
  this.decimalRounding = Number(this.$ls.get('appDecimalRounding'))
}
