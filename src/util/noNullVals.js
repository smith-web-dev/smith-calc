const noNullVals = {
  install (Vue) {
    Vue.prototype.$noNullVals = function (arr) {
      var lengthNoNull = arr.join(',').replace(/,/g, '').length
      if (lengthNoNull !== arr.length) {
        return true
      } else {
        return false
      }
    }
  }
}

export default noNullVals
