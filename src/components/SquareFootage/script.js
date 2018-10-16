import { theAppIsDark } from 'MXN/appIsDark.js'
import { globalCalc } from 'MXN/globalCalc.js'

export default {
  mixins: [
    theAppIsDark,
    globalCalc
  ],
  data () {
    return {
      defaultInputs: '',
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
        widthText = win + '"'
      } else if (win === 0) {
        widthText = wft + '\''
      } else {
        widthText = wft + '\' ' + win + '"'
      }

      if (lft === 0) {
        lengthText = lin + '"'
      } else if (lin === 0) {
        lengthText = lft + '\''
      } else {
        lengthText = lft + '\' ' + lin + '"'
      }
      return widthText + ' x ' + lengthText
    },
    result () {
      return ((Number(this.calcInput.width.ft) + (Number(this.calcInput.width.in) / 12)) * (Number(this.calcInput.length.ft) + (Number(this.calcInput.length.in) / 12)))
    },
    resultDisplay () {
      return this.result.toFixed(this.decimalRounding)
    },
    resultWithLabel () {
      return this.resultDisplay + ' ft²'
    },
    resultInches () {
      return ((Number(this.calcInput.width.ft) * 12) + Number(this.calcInput.width.in)) * ((Number(this.calcInput.length.ft) * 12) + Number(this.calcInput.length.in))
    },
    resultDisplayInches () {
      return this.resultInches.toFixed(this.decimalRounding)
    },
    resultInchesWithLabel () {
      return this.resultDisplayInches + ' in²'
    }
  }
}
