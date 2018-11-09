import navItems from 'DATA/MainNavItems'
import { theAppIsDark } from 'MXN/appIsDark'
import { globalCalc } from 'MXN/globalCalc'
import moment from 'moment'

export default {
  mixins: [
    theAppIsDark,
    globalCalc
  ],
  data () {
    return {
      feedback: {
        name: '',
        email: '',
        note: '',
        date: moment(),
        version: this.$ls.get('SmithCalcVersion'),
        dark: this.$ls.get('appDarkMode'),
        shipments: this.$ls.get('shipments')
      },
      navItems: navItems
    }
  },
  computed: {
  },
  methods: {
    submitForm () {
      var http = new XMLHttpRequest()
      http.open('POST', 'https://script.google.com/macros/s/AKfycbwaI3SQlw4-IQ7wQEN0wqKLY-T1EWt8_6r28xItXFYd7rwRkrA/exec', true)
      http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
      // probably use document.getElementById(...).value
      // var params = "search=" + <<get search value>>
      // http.send(params)
      http.onload = function () {
        alert(http.responseText)
      }
    }
  }
}
