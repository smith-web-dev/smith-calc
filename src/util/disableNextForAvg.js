const disableNextForAvg = {
  install (Vue) {
    Vue.prototype.$disableNextForAvg = function (measurementArray) {
      var valueArr = measurementArray.map(function (item) {
        return item.name
      })
      var isDuplicate = valueArr.some(function (item, idx) {
          return valueArr.indexOf(item) != idx
      })
      console.log(isDuplicate);
    }
  }
}

export default disableNextForAvg
