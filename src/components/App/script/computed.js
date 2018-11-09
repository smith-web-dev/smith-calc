export default {
  localDataCheck () {
    if (this.$ls.get('appMetricUnits') === null && this.$ls.get('appDarkMode') === null && this.$ls.get('shipments') === null) {
      return true
    } else {
      return false
    }
  },
  theAppIsDark () {
    return JSON.parse(this.$ls.get('appDarkMode'))
  },
  displayNavItems () {
    let theNavItems = this.navItems
    var result = theNavItems.filter(obj => {
      return obj.display === true
    })
    return result
  }
}
