import CrimpSpecData from 'DATA/CrimpSpec.json'
import * as math from 'mathjs'
import { globalCalc } from 'MXN/globalCalc'
let convert = require('convert-units')

function makeFraction (input, td) {
  var nume
  var whole
  // var td = 64

  var num = input
  whole = Math.floor(input)
  var dec = (num - whole)
  var frac = math.fraction(dec)
  nume = Math.round(((td * frac.n) / frac.d))

  return (whole + '-' + nume + '/' + td)
}

export default {
  mixins: [
    globalCalc
  ],
  data () {
    return {
      defaultInputs: CrimpSpecData.defaultInputs,
      steps: {
        compFactor: { warn: false, warnType: 'info' },
        shankMeas: { disableAdd: false }
      },
      calcData: { hoseTypes: CrimpSpecData.hoseTypes },
      calcInput: {
        comp: { sel: null, box: null },
        shankMeas: [ null, null, null ],
        hoseWallMeas: [ null, null, null ],
        ferruleWallMeas: [ null, null, null ],
        result: null,
        resultMetric: null,
        resultFrac: null
      },
      calcHistory: [
        {
          date: '2018-09-06T16:16:55-05:00',
          comp: 0.25,
          avgShank: 2,
          avgHoseWall: 0.25,
          avgFerWall: 0.09,
          result: 2.555
        }
      ]
    }
  },
  methods: {
    doTheCalculation () {
      this.currentStep = 5

      var v = this.metricConvertCmIn
      var w = this.setCompFac
      var x = this.$makeAverage(this.calcInput.shankMeas)
      var y = this.$makeAverage(this.calcInput.hoseWallMeas)
      var z = this.$makeAverage(this.calcInput.ferruleWallMeas)

      var b = (((convert(y).from(v).to('in')) * 2) * (1 - w))
      var c = ((convert(z).from(v).to('in')) * 2)

      var result = ((convert(x).from(v).to('in')) + b + c)
      // var result =
      var resultInch = this.$findCrimpSpec(w, x, y, z)

      this.calcInput.result = ((result).toFixed(this.decimalRounding) + this.units.length.sm.sym)
      this.calcInput.resultFrac = (makeFraction(resultInch, 64) + '"')
      this.calcInput.resultMetric = (((result) * 25.4).toFixed(this.decimalRounding) + 'mm')
    },
    addMeasurement (arr) {
      var newMeas = null
      var measArray = arr
      measArray.push(newMeas)
    },
    removeMeas (arr, index) {
      var measArray = arr
      measArray.splice(index, 1)
      arr = measArray
    }
  },
  computed: {
    metricConvertCmIn () {
      var appMetricUnits = this.$ls.get('appMetricUnits')
      var theBool = JSON.parse(appMetricUnits)
      if (theBool) {
        return 'cm'
      } else {
        return 'in'
      }
    },
    setCompFac () {
      var theCompFac
      if (this.calcInput.comp.box === null && this.calcInput.comp.sel === null) {
      } else if (this.calcInput.comp.box !== null) {
        //
        this.calcInput.comp.sel = null
        theCompFac = (this.calcInput.comp.box / 100)
        //
      } else if (this.calcInput.comp.sel !== null) {
        //
        theCompFac = this.calcInput.comp.sel
        //
      }
      return theCompFac
    },
    setWarning () {
      var selected = this.calcInput.comp.sel
      var entered = this.calcInput.comp.box
      var theWarning

      if (selected != null) {
        var result = this.calcData.hoseTypes.find(obj => {
          return obj.value === selected
        })
        this.steps.compFactor.warn = true
        this.steps.compFactor.warnType = 'warning'
        theWarning = result.warn
      }

      if (entered != null) {
        this.steps.compFactor.warn = true
        this.steps.compFactor.warnType = 'error'
        theWarning = 'An incorrect compression factor value can not only damage hose and fitting but can also damage the crimper. Proceed with caution!'
      }

      if ((selected === null && entered === null) || (entered === null && selected === undefined) || (entered === '' && selected === null) || (entered === '' && selected === undefined)) {
        this.steps.compFactor.warn = false
      }
      return theWarning
    }
  }
}
