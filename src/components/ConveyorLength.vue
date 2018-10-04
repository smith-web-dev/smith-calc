<template lang="pug">
  v-container.pa-0(fluid)
    include ../views/Global/_snackbar.pug
    v-stepper.transparent.elevation-0(v-model='currentStep')
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
    //- v-btn(@click='doCalculation(25, calcInput.equalPulleys, 12)') click
    //- p {{ calcInput.equalPulleys }}

</template>

<script>
  import cbLengthData from '../data/cbLength.json'
  import ColorProps from '@/data/colorProps.json'
  let convert = require('convert-units')

  export default {
    mounted () {
      this.$emit('toolbarExtended', false)
      this.$emit('toolbarFab', { visible: false })
    },
    data () {
      return {
        colorProps: ColorProps,
        currentStep: 0,
        snackbar: { display: false, text: null },
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
      theAppIsDark () {
        return JSON.parse(this.$ls.get('appDarkMode'))
      },
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
      doCopy (theText) {
        var compo = this
        this.$copyText(theText).then(function (e) {
          compo.snackbar.text = 'Copied [<em> ' + theText + ' </em>] to the clipboard'
          compo.snackbar.display = true
        }, function (e) {
          alert('Can not copy')
          console.log(e)
        })
      },
      resetAll () {
        this.currentStep = 1
        this.calcInput = cbLengthData.defaultInputs
      },
      moveStep (direction) {
        // direction = 'f' => forward
        // direction = 'b' => back
        var thisStep = parseInt(this.currentStep)
        var moveToStep
        if (direction === 'f') {
          moveToStep = thisStep + 1
          this.currentStep = moveToStep
        } else if (direction === 'b') {
          moveToStep = thisStep - 1
          this.currentStep = moveToStep
        }
      }
    }
  }
</script>
