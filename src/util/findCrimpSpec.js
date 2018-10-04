const findCrimpSpec = {
  install (Vue) {
    Vue.prototype.$findCrimpSpec = function (cf, sa, wa, fa) {
      var w = cf
      var x = sa
      var y = wa
      var z = fa

      var result = (x + ((y * 2) * (1 - w)) + (z * 2))

      return result
    }
  }
}

export default findCrimpSpec
