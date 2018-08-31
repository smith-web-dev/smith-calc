<template lang="pug">
  v-container.pa-0(fluid)
    include ./CrimpSpec/_snackbar.pug
    //- p {{ calcInput }}
    v-stepper.transparent.elevation-0(v-model='currentStep')
      //- Steps
      include ./CrimpSpec/_step0.pug

      v-stepper-items
        //- Compression factor
        v-stepper-content.px-1.pt-1(step='1')
          include ./CrimpSpec/_step1.pug

        //- Shank OD
        v-stepper-content.px-1.pt-1(step='2')
          include ./CrimpSpec/_step2.pug

        //- Hose Wall
        v-stepper-content.px-1.pt-1(step='3')
          include ./CrimpSpec/_step3.pug

        //- Ferrule Wall
        v-stepper-content.px-1.pt-1(step='4')
          include ./CrimpSpec/_step4.pug

        //- Result
        v-stepper-content.px-1.pt-1(step='5')
          include ./CrimpSpec/_step5.pug
          //- v-card.mb-5(color='grey lighten-1', height='200px')
          //-   v-card-text
          //-     p result: {{ calcInput.result }}
          //-     p(v-html='decToFrac')
          //- v-layout(row justify-center)
          //-   v-flex(xs12 sm10 md8)
          //-     v-btn(block color='accent', @click='resetAll()')
          //-       | Start Over
</template>

<script>
  import CrimpSpecData from '@/data/CrimpSpec.json'
  import * as math from 'mathjs'

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
        currentStep: 0,
        snackbar: {
          display: false,
          text: null,
          timeout: 3000
        },
        steps: {
          compFactor: {
            warn: false,
            warnType: 'info'
          },
          shankMeas: {
            disableAdd: false
          }
        },
        calcData: {
          hoseTypes: CrimpSpecData.hoseTypes
        },
        calcInput: {
          comp: {
            sel: null,
            box: null
          },
          shankMeas: [
            { value: null },
            { value: null },
            { value: null }
          ],
          hoseWallMeas: [
            { value: null },
            { value: null },
            { value: null }
          ],
          ferruleWallMeas: [
            { value: null },
            { value: null },
            { value: null }
          ],
          result: null,
          resultMetric: null,
          resultFrac: null
        }
      }
    },
    methods: {
      doCopy (theText) {
        var compo = this
        this.$copyText(theText).then(function (e) {
          // alert('Copied ' + theText)
          // console.log(e)
          compo.snackbar.text = 'Copied the value: ' + theText + ' to the clipboard'
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

        var a = this.shankOdAverage
        var b = ((this.hoseWallAverage * 2) * (1 - this.setCompFac))
        var c = (this.ferruleWallAverage * 2)

        var result = (a + b + c)

        this.calcInput.result = ((result).toFixed(3) + '"')
        // this.calcInput.resultFrac = (result).toFixed(3)
        this.calcInput.resultFrac = (makeFraction(result, 64) + '"')
        this.calcInput.resultMetric = (((result) * 25.4).toFixed(3) + 'mm')

        // ((calcInput.result) * 25.4).toFixed(3)
        // (calcInput.result).toFixed(3)
      },
      addMeasurement (arr) {
        var newMeas = { value: null, btn: true }
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
    },
    computed: {
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
      },
      shankOdAverage () {
        var theArray = this.calcInput.shankMeas
        var theSum = theArray.reduce(function (a, b) {
          return b.value == null ? a : parseFloat(a) + parseFloat(b.value)
        }, 0)

        return (theSum / theArray.length)
      },
      shankMeasAddDisable () {
        var measArray = this.calcInput.shankMeas
        var arrLen = parseInt(measArray.length)
        if (arrLen < 7) {
          this.steps.shankMeas.disableAdd = true
        } else {
          this.steps.shankMeas.disableAdd = false
        }
      },
      hoseWallAverage () {
        var theArray = this.calcInput.hoseWallMeas
        var theSum = theArray.reduce(function (a, b) {
          return b.value == null ? a : parseFloat(a) + parseFloat(b.value)
        }, 0)

        return (theSum / theArray.length)
      },
      hoseWallAddDisable () {
        var measArray = this.calcInput.hoseWallMeas
        var arrLen = parseInt(measArray.length)
        if (arrLen < 7) {
          this.steps.hoseWallMeas.disableAdd = true
        } else {
          this.steps.hoseWallMeas.disableAdd = false
        }
      },
      ferruleWallAverage () {
        var theArray = this.calcInput.ferruleWallMeas
        var theSum = theArray.reduce(function (a, b) {
          return b.value == null ? a : parseFloat(a) + parseFloat(b.value)
        }, 0)

        return (theSum / theArray.length)
      },
      ferruleWallAddDisable () {
        var measArray = this.calcInput.ferruleWallMeas
        var arrLen = parseInt(measArray.length)
        if (arrLen < 7) {
          this.steps.ferruleWallMeas.disableAdd = true
        } else {
          this.steps.ferruleWallMeas.disableAdd = false
        }
      }
      // decToFrac () {
      //   var nume
      //   var whole
      //   var td = 64
      //   if (this.calcInput.result !== null) {
      //     var num = this.calcInput.result
      //     whole = Math.floor(this.calcInput.result)
      //     var dec = (num - whole)
      //     var frac = math.fraction(dec)
      //     nume = Math.round(((td * frac.n) / frac.d))
      //   }
      //   // <sup>1</sup>&frasl;<sub>10</sub>
      //   return (whole + ' <sup>' + nume + '</sup>&frasl;<sub>' + td + '</sub>')
      // },
      // resultToInchDec () {
      //   var displayThis
      //   if (this.calcInput.result !== null) {
      //     displayThis = result
      //   }
      // },
      // resultToInchFrac () {
      //   //
      // },
      // resultToMetric () {
      //   //
      // }
    }
  }
</script>

<style>
  .sirp-alert-text {
    color: rgba(0, 0, 0, 0.8);
    letter-spacing: 0.3px;
  }

  .sirp-divider {
    width: 95%;
    text-align: center;
    border-bottom: 2px solid rgba(0, 0, 0, 0.3);
    line-height: 0px;
    margin: 20px 0 30px;
  }

  .sirp-divider span {
    font-size: 16px;
    text-transform: uppercase;
    color: rgba(0, 0, 0, 0.6);
    font-weight: 700;
    background: #fafafa;
    padding:0 10px;
  }
</style>
