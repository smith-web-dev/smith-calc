import { theAppIsDark } from 'MXN/appIsDark.js'
import { globalCalc } from 'MXN/globalCalc'
import RollLengthData from 'DATA/RollLength.json'

export default {
  mixins: [
    theAppIsDark,
    globalCalc
  ],
  data () {
    return {
      defaultInputs: RollLengthData.defaultInputs,
      calcInput: {
        rollOD: null,
        coreOD: null,
        thickness: null
      }
    }
  },
  computed: {
    result () {
      let rollRadiusSquared = Math.pow((Number(this.calcInput.rollOD) / 2), 2)
      let coreRadiusSquared = Math.pow((Number(this.calcInput.coreOD) / 2), 2)
      let piTheNumber = Math.PI
      let calcThickness = Number(this.calcInput.thickness)
      let theResult = Number((((piTheNumber * (rollRadiusSquared - coreRadiusSquared)) / calcThickness) / 12).toFixed(this.decimalRounding))
      return theResult
    },
    resultToInches () {
      return (this.result * 12).toFixed(this.decimalRounding)
    },
    resultDesc () {
      let rOD = this.calcInput.rollOD
      let cOD = this.calcInput.coreOD
      let thk = Number(this.calcInput.thickness) * 1
      return 'Roll ' + this.words.od.abbr + ': ' + rOD + this.units.length.sm.sym + ', Core ' + this.words.od.abbr + ': ' + cOD + this.units.length.sm.sym + ', Thickness: ' + thk + this.units.length.sm.sym
    }
  }
}
