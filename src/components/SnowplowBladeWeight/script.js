import Vue from 'vue'
import moment from 'moment'
import JsonExcel from 'vue-json-excel'
import SnowplowData from '@/data/Snowplow.json'
import { theAppIsDark } from '@/mixins/appIsDark.js'
import { globalCalc } from '@/mixins/globalCalc.js'
import { snowShipment } from '@/mixins/snowplowCalc/shipment.js'

Vue.component('downloadExcel', JsonExcel)

/* eslint-disable no-extend-native */
Array.prototype.sum = function (prop) {
  var total = 0
  for (var i = 0, _len = this.length; i < _len; i++) {
    var newNum = Number(this[i][prop])
    total += newNum
  }
  return total.toFixed(this.decimalRounding)
}

export default {
  mixins: [
    theAppIsDark,
    globalCalc,
    snowShipment
  ],
  props: {
    toolbarExtended: Boolean,
    toolbarFab: Object
  },
  created () {
    var currentShipments = this.$ls.get('shipments')

    // check if its in localstorage
    if (currentShipments === null) {
      this.$ls.set('shipments', JSON.stringify([]))
      currentShipments = this.$ls.get('shipments')
    }
    var ninetyAgo = this.$moment().subtract(90, 'days')

    // Filter dates more than 90 days ago
    var allDates = JSON.parse(currentShipments)
    var someDates = allDates.filter(shmnt => this.$moment(shmnt.date) > ninetyAgo)
    this.$ls.set('shipments', JSON.stringify(someDates))
    this.shipment.history = someDates
  },
  mounted () {
    this.$emit('toolbarExtended', true)
    this.$emit('toolbarFab', {
      visible: true,
      icon: 'fas fa-truck'
    })
    this.$emit('childFunc', this.openShipmentDialog)
  },
  data () {
    return {
      currentShipments: null,
      delSelect: null,
      defaultInputs: SnowplowData.defaultInputs,
      calcInput: { size: null, length: { feet: null, inches: null }, quantity: null },
      bladeSizes: SnowplowData.bladeSizes,
      shipment: {
        dialog: false,
        info: false,
        btn: false,
        headers: SnowplowData.shipmentHeaders,
        items: [],
        history: null,
        historyActive: null
      },
      alert: { display: false, type: 'error', text: 'Are you sure?' },
      saveShipmentNote: { dialog: false, text: null }
    }
  },
  methods: {
    makeFileName (date) {
      var theDate = moment(date).format('YYYYMMDD-HHmmss')
      return ('shipment-' + theDate + '.csv')
    },
    qtyChange (value) {
      if (value < 0 && (this.calcInput.quantity === 0 || this.calcInput.quantity === null)) {
        /* eslint-disable no-useless-return */
        return
      } else {
        this.calcInput.quantity = this.calcInput.quantity + value
      }
    },
    savedLineDesc (items, sort) {
      var theItems = items.sum(sort)
      return Math.ceil(theItems)
    }
  },
  computed: {
    bladeLengthToInches () {
      var foot = this.calcInput.length.feet
      var inch = this.calcInput.length.inches
      var totalInch = (Number(foot * 12) + Number(inch))
      return totalInch
    },
    displayLength () {
      var foot = Number(this.calcInput.length.feet)
      var inch = Number(this.calcInput.length.inches)
      var footDisp
      var inchDisp
      var display
      if (foot !== 0) {
        footDisp = foot + '\''
      } else {
        footDisp = ''
      }
      if (inch !== 0) {
        inchDisp = inch + '"'
      } else {
        inchDisp = ''
      }
      if (footDisp !== '') {
        display = footDisp + ' ' + inchDisp
      } else {
        display = footDisp + inchDisp
      }
      return display
    },
    displaySize () {
      var result, sizeDisp
      var sizes = this.bladeSizes
      var selectedSize = this.calcInput.size
      if (selectedSize !== null) {
        result = sizes.filter(obj => {
          return obj.value === selectedSize
        })
        if (this.theAppIsMetric) {
          sizeDisp = result[0].textMetric
        } else {
          sizeDisp = result[0].text
        }
      } else {
        sizeDisp = null
      }
      return sizeDisp
    },
    descDisp () {
      var qty = this.calcInput.quantity
      var sze = this.displaySize
      var lng = this.displayLength
      var theQty
      if (qty === null) {
        qty = 1
      }
      if (qty > 1) {
        theQty = qty + ' pcs'
      } else {
        theQty = qty + ' pcs'
      }
      return '(' + theQty + ')' + ' ' + sze + ' x ' + lng
      // ({{ calcInput.quantity }} {{ calcInput.quantity > 1 ? `pcs` : `pc` }}) {{ displaySize }} x {{ displayLength }}
    },
    pcWeight () {
      var len = this.bladeLengthToInches
      var sze = this.calcInput.size
      return ((len * sze).toFixed(this.decimalRounding))
    },
    extWeight () {
      var len = this.bladeLengthToInches
      var sze = this.calcInput.size
      var qty = this.calcInput.quantity
      if (qty === null) {
        qty = 1
      }

      return ((len * sze * qty).toFixed(this.decimalRounding))
    },
    shipmentWeight () {
      var shpmnt = this.shipment.items
      return shpmnt.sum('weight')
    }
  }
}
