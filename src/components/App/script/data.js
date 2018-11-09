import Vue from 'vue'
import navItems from 'DATA/MainNavItems'

export function data () {
  return {
    currentVersion: null,
    clearDataDialog: false,
    isMetric: false,
    navItems: navItems,
    panel: [],
    cordova: Vue.cordova,
    title: 'SmithCalc',
    toolbarExtended: false,
    toolbarFab: {
      visible: false,
      icon: String
    },
    toolbarFabVisible: false,
    toolbarFabIcon: null,
    childFunc: Function,
    toolbarResetBtn: false
  }
}
