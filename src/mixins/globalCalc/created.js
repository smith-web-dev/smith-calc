export function created () {
  this.isDark = JSON.parse(this.$ls.get('appDarkMode'))
  this.useCommaSep = JSON.parse(this.$ls.get('appCommaNum'))
  this.groupNavItems = JSON.parse(this.$ls.get('appGroupNavItems'))
  this.decimalRounding = Number(this.$ls.get('appDecimalRounding'))
  this.isMetric = JSON.parse(this.$ls.get('appMetricUnits'))
}
