import { theAppIsDark } from 'MXN/appIsDark.js'
import { globalCalc } from 'MXN/globalCalc'
import SqFtData from 'DATA/SquareFootage.json'

export default {
  mixins: [
    theAppIsDark,
    globalCalc
  ],
  data () {
    return {
      defaultInputs: SqFtData.defaultInputs,
      msg: 'SquareFootage',
      calcInput: {
        width: {
          ft: null,
          in: null
        },
        length: {
          ft: null,
          in: null
        }
      }
    }
  },
  computed: {
    displayDescription () {
      let wft = Number(this.calcInput.width.ft)
      let win = Number(this.calcInput.width.in)
      let lft = Number(this.calcInput.length.ft)
      let lin = Number(this.calcInput.length.in)

      let widthText
      let lengthText

      if (wft === 0) {
        widthText = win + this.units.length.sm.sym
      } else if (win === 0) {
        widthText = wft + this.units.length.lg.sym
      } else {
        widthText = wft + this.units.length.lg.sym + ' ' + win + this.units.length.sm.sym
      }

      if (lft === 0) {
        lengthText = lin + this.units.length.sm.sym
      } else if (lin === 0) {
        lengthText = lft + this.units.length.lg.sym
      } else {
        lengthText = lft + this.units.length.lg.sym + ' ' + lin + this.units.length.sm.sym
      }
      return widthText + ' x ' + lengthText
    },
    result () {
      let theWidth
      let theLength
      let divis = this.isMetric ? 100 : 12

      theWidth = (Number(this.calcInput.width.ft) + (Number(this.calcInput.width.in) / divis))
      theLength = (Number(this.calcInput.length.ft) + (Number(this.calcInput.length.in) / divis))
      return (theWidth * theLength)
    },
    resultDisplay () {
      return this.getTheResult(false).toFixed(this.decimalRounding)
    },
    resultWithLabel () {
      return this.resultDisplay + ' ' + this.units.length.lg.abbr + '²'
    },
    resultInches () {
      let theWidth
      let theLength
      let multipl = this.isMetric ? 100 : 12

      theWidth = ((Number(this.calcInput.width.ft) * multipl) + Number(this.calcInput.width.in))
      theLength = ((Number(this.calcInput.length.ft) * multipl) + Number(this.calcInput.length.in))
      return (theWidth * theLength)
    },
    resultDisplayInches () {
      return this.getTheResult(true).toFixed(this.decimalRounding)
    },
    resultInchesWithLabel () {
      return this.resultDisplayInches + ' ' + this.units.length.sm.abbr + '²'
    }
  },
  methods: {
    getTheResult (inch) {
      let theWidth
      let theLength
      let ftMultipl
      let inMultipl

      if (inch) {
        inMultipl = 1
        ftMultipl = this.isMetric ? 100 : 12
      } else {
        inMultipl = this.isMetric ? 0.01 : 0.0833333333333333
        ftMultipl = 1
      }

      theWidth = ((Number(this.calcInput.width.ft) * ftMultipl) + (Number(this.calcInput.width.in) * inMultipl))
      theLength = ((Number(this.calcInput.length.ft) * ftMultipl) + (Number(this.calcInput.length.in) * inMultipl))
      return (theWidth * theLength)
    }
  }
}
