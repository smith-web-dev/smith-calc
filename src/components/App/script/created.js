import firebase from 'firebase'
import firebaseConfig from 'DATA/firebase.json'
import localStorageValues from 'DATA/localStorageValues'
let pjson = require('../../../../package.json')

export function created () {
  // Firebase
  //
  firebase.initializeApp(firebaseConfig)
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      this.$store.dispatch('autoSignIn', user)
    }
  })
  //
  //
  this.currentVersion = pjson.version
  this.$ls.set('SmithCalcVersion', this.currentVersion)

  var self = this
  this.cordova.on('deviceready', () => {
    self.onDeviceReady()
  })

  //
  // Local Storage Checks
  // ('local storage value', 'data value', 'default value')
  //
  var lsi
  for (lsi = 0; lsi < localStorageValues.length; ++lsi) {
    var tmp = this.$ls.get(localStorageValues[lsi].lsValue)
    // check if its in localstorage
    if (tmp === null) {
      this.$ls.set(localStorageValues[lsi].lsValue, localStorageValues[lsi].defaultValue)
      tmp = this.$ls.get(localStorageValues[lsi].lsValue)
      this[localStorageValues[lsi].dataValue] = JSON.parse(tmp)
    } else {
      tmp = this.$ls.get(localStorageValues[lsi].lsValue)
      this[localStorageValues[lsi].dataValue] = JSON.parse(tmp)
    }
  }
}
