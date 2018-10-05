<template lang="pug">
  extends ../views/layouts/_calc-main.pug

  block stepper-steps
    //- Steps
    include ../views/ConveyorLength/_step0.pug
    v-stepper-items
      //- Compression factor
      v-stepper-content.px-1.pt-1(step='1')
        include ../views/ConveyorLength/_step1.pug
      v-stepper-content.px-1.pt-1(step='2')
        include ../views/ConveyorLength/_step2.pug
      v-stepper-content.px-1.pt-1(step='3')
        include ../views/ConveyorLength/_step3.pug

</template>

<script>
  import cbLengthData from '../data/cbLength.json'
  import { theAppIsDark } from '@/mixins/appIsDark.js'
  import { globalCalc } from '@/mixins/globalCalc.js'
  let convert = require('convert-units')

  export default {
    mixins: [
      theAppIsDark,
      globalCalc
    ],
    data () {
      return {
        defaultInputs: cbLengthData.defaultInputs,
        msg: 'ConveyorLength',
        result: null,
        calcInput: {
          equalPulleys: false,
          pully: {
            one: null,
            two: null
          },
          span: {
            feet: null,
            inches: null
          }
        }
      }
    },
    computed: {
      theAppIsMetric () {
        var appMetricUnits = this.$ls.get('appMetricUnits')
        return JSON.parse(appMetricUnits)
      },
      metricConvertCmIn () {
        var appMetricUnits = this.$ls.get('appMetricUnits')
        var theBool = JSON.parse(appMetricUnits)
        if (theBool) {
          return 'cm'
        } else {
          return 'in'
        }
      },
      metricConvertMetFt () {
        var appMetricUnits = this.$ls.get('appMetricUnits')
        var theBool = JSON.parse(appMetricUnits)
        if (theBool) {
          return 'm'
        } else {
          return 'ft'
        }
      },
      firstStepNextDisabled () {
        var theBool
        if (this.calcInput.equalPulleys) {
          if (this.calcInput.pully.one === null) {
            theBool = true
          } else {
            theBool = false
          }
        } else {
          if (this.calcInput.pully.one === null || this.calcInput.pully.two === null) {
            theBool = true
          } else {
            theBool = false
          }
        }
        return theBool
      },
      doCalculation () {
        var D, d, C, result
        var v = this.metricConvertCmIn
        var w = this.metricConvertMetFt
        var pOne = convert(Number(this.calcInput.pully.one)).from(v).to('in')
        var pTwo = convert(Number(this.calcInput.pully.two)).from(v).to('in')
        var pEq = Number(this.calcInput.equalPulleys)

        var inpFtMet = convert(Number(this.calcInput.span.feet)).from(w).to('ft')
        var inpInCm = convert(Number(this.calcInput.span.inches)).from(v).to('in')

        if (pEq) {
          D = pOne
          d = pOne
        } else {
          if (pOne > pTwo) {
            D = pOne
            d = pTwo
          } else {
            D = pTwo
            d = pOne
          }
        }

        C = inpFtMet + (inpInCm / 12)
        result = ((Math.PI / 2) * (D + d)) + (Math.pow((D - d), 2) / (4 * C)) + (2 * C)
        var resultFt = (result - (result % 1))
        var resultDec = result % 1
        var resultIn = (12 * resultDec) - ((12 * resultDec) % 1)

        if (this.theAppIsMetric) {
          return (convert(result).from('ft').to('m')).toFixed(3) + 'm'
        } else {
          return resultFt + '\' ' + resultIn + '"'
        }
      },
      makeDesc () {
        var p1 = Number(this.calcInput.pully.one)
        var p2 = Number(this.calcInput.pully.two)
        var cF = Number(this.calcInput.span.feet)
        var cI = Number(this.calcInput.span.inches)
        var diamText
        var spanText
        if (this.calcInput.equalPulleys) {
          diamText = 'Pulleys with diameter of ' + p1 + (this.theAppIsMetric ? 'cm ' : '" ')
        } else {
          diamText = 'Pulleys with diameters of ' + p1 + (this.theAppIsMetric ? 'cm ' : '" ') + ' and ' + p2 + (this.theAppIsMetric ? 'cm ' : '"')
        }
        if (cI === null || cI === 0) {
          spanText = 'with distance between pulleys of ' + cF + (this.theAppIsMetric ? 'm' : '\'')
        } else {
          spanText = 'with distance between pulleys of ' + cF + (this.theAppIsMetric ? 'm ' : '\' ') + cI + (this.theAppIsMetric ? 'cm' : '"')
        }
        return diamText + spanText
      }
    },
    methods: {
      //
    }
  }
</script>
