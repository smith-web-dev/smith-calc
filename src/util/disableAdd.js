const disableAdd = {
  install (Vue) {
    Vue.prototype.$disableAdd = function (measurementArray) {
      var measArray = measurementArray
      var arrLen = parseInt(measArray.length)
      var toReturn = Boolean
      if (arrLen < 7) {
        toReturn = true
      } else {
        toReturn = false
      }
      return toReturn
    }
  }
}

export default disableAdd
