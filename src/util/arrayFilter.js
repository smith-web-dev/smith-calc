const arrayFilter = {
  install (Vue) {
    Vue.prototype.$arrayFilter = function (arr, prop, cond) {
      let theArray = arr
      var result = theArray.filter(obj => {
        return obj[prop] === cond
      })
      return result
    }
  }
}

export default arrayFilter
