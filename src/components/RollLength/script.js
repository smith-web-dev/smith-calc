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
      let theThickness
      if (calcThickness === null) {
        theThickness = 1
      } else {
        theThickness = calcThickness
      }

      let theResult = Number((((piTheNumber * (rollRadiusSquared - coreRadiusSquared)) / theThickness) / 12).toFixed(this.decimalRounding))
      console.log(typeof theResult)
      return theResult
    }
  }
}
