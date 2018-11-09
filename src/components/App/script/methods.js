import localStorageValues from 'DATA/localStorageValues'

export default {
  clearAllTheThings () {
    var lsi
    for (lsi = 0; lsi < localStorageValues.length; ++lsi) {
      this[localStorageValues[lsi].dataValue] = localStorageValues[lsi].defaultValue
      this.$ls.set(localStorageValues[lsi].lsValue, localStorageValues[lsi].defaultValue)
    }
    this.clearDataDialog = false
  },
  fabClicked (func) {
    this.childFunc = func
  },
  makeToolbarExtended (theBool) {
    this.toolbarExtended = theBool
  },
  setToolbarFab (fabObj) {
    this.toolbarFab = fabObj
  },
  onDeviceReady: function () {
    // Handle the device ready event.
    this.cordova.on('pause', this.onPause, false)
    this.cordova.on('resume', this.onResume, false)
    if (this.cordova.device.platform === 'Android') {
      document.addEventListener('backbutton', this.onBackKeyDown, false)
    }
  },
  onPause () {
    // Handle the pause lifecycle event.
    console.log('pause')
  },
  onResume () {
    // Handle the resume lifecycle event.
    // SetTimeout required for iOS.
    setTimeout(function () {
      console.log('resume')
    }, 0)
  },
  onBackKeyDown () {
    // Handle the back-button event on Android. By default it will exit the app.
    navigator.app.exitApp()
  }
}
