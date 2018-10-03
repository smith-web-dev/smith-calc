const makeAverage = {
  install (Vue) {
    Vue.prototype.$makeAverage = function (measurementArray) {
      // return helpers.parseContent(content, shortcodes)
      var theArray = measurementArray
      var theSum = theArray.reduce(function (a, b) {
        return b == null ? a : Number(a) + Number(b)
      }, 0)
      return (theSum / theArray.length)
    }
  }
}

export default makeAverage
