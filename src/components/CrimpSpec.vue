<template lang="pug">
  v-container.pa-0(fluid)
    include ../views/Global/_snackbar.pug
    //- p {{ calcInput }}
    v-stepper.transparent.elevation-0(v-model='currentStep')
      //- Steps
      include ../views/CrimpSpec/_step0.pug

      v-stepper-items
        //- Compression factor
        v-stepper-content.px-1.pt-1(step='1')
          include ../views/CrimpSpec/_step1.pug

        //- Shank OD
        v-stepper-content.px-1.pt-1(step='2')
          include ../views/CrimpSpec/_step2.pug

        //- Hose Wall
        v-stepper-content.px-1.pt-1(step='3')
          include ../views/CrimpSpec/_step3.pug

        //- Ferrule Wall
        v-stepper-content.px-1.pt-1(step='4')
          include ../views/CrimpSpec/_step4.pug

        //- Result
        v-stepper-content.px-1.pt-1(step='5')
          include ../views/CrimpSpec/_step5.pug
</template>

<script>
  import CrimpSpecData from '@/data/CrimpSpec.json'
  import ColorProps from '@/data/colorProps.json'
  import * as math from 'mathjs'
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

    // return (whole + '-' + nume + '⁄' + td)
    return (whole + '-' + nume + '/' + td)
  }

  export default {
    data () {
      return {
        colorProps: ColorProps,
        currentStep: 0,
        snackbar: { display: false, text: null },
        steps: { compFactor: { warn: false, warnType: 'info' }, shankMeas: { disableAdd: false } },
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
    mounted () {
      this.$emit('toolbarExtended', false)
      this.$emit('toolbarFab', { visible: false })
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
        this.calcInput = CrimpSpecData.defaultInputs
      },
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

        var resLabel = (this.theAppIsMetric ? ' cm' : '"')

        this.calcInput.result = ((result).toFixed(3) + resLabel)
        this.calcInput.resultFrac = (makeFraction(resultInch, 64) + '"')
        this.calcInput.resultMetric = (((result) * 25.4).toFixed(3) + 'mm')
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
      // noNullVals (arr) {
      //   var lengthNoNull = arr.join(',').replace(/,/g, '').length
      //   if (lengthNoNull !== arr.length) {
      //     return true
      //   } else {
      //     return false
      //   }
      // }
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
</script>

<style lang="scss">
  .sirp-alert-text {
    color: rgba(0, 0, 0, 0.8);
    letter-spacing: 0.3px;
  }

  .sirp-divider {
    width: 95%;
    text-align: center;
    line-height: 0px;
    margin: 20px 0 30px;
  }

  .sirp-divider span {
    font-size: 16px;
    text-transform: uppercase;
    font-weight: 700;
    padding:0 10px;
  }

  .theme--light {
    .sirp-divider {
      border-bottom: 2px solid rgba(0, 0, 0, 0.12) !important;

      span {
        background: #fafafa !important;
        color: #757575 !important;
      }
    }
  }

  .theme--dark {
    .sirp-divider {
      border-bottom: 2px solid rgba(255, 255, 255, 0.12) !important;

      span {
        background: #303030 !important;
        color: #757575;
      }
    }
  }

</style>
