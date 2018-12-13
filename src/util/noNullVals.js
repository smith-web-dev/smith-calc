function checkForNulls (value) {
  if (value === null) {
    return true
  } else {
    return false
  }
}

const noNullVals = {
  install (Vue) {
    Vue.prototype.$noNullVals = function (arr) {
      return arr.some(checkForNulls)
    }
  }
}

export default noNullVals
