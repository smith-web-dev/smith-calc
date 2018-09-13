<template lang="pug">
  div
    v-toolbar.primary(style='margin-top: -55px;')
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

        var a = this.$makeAverage(this.calcInput.shankMeas)
        var b = (((this.$makeAverage(this.calcInput.hoseWallMeas)) * 2) * (1 - this.setCompFac))
        var c = ((this.$makeAverage(this.calcInput.ferruleWallMeas)) * 2)

        var result = (a + b + c)

        this.calcInput.result = ((result).toFixed(3) + '"')
        // this.calcInput.resultFrac = (result).toFixed(3)
        this.calcInput.resultFrac = (makeFraction(result, 64) + '"')
        this.calcInput.resultMetric = (((result) * 25.4).toFixed(3) + 'mm')

        // ((calcInput.result) * 25.4).toFixed(3)
        // (calcInput.result).toFixed(3)
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
      },
      addToHistory () {

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
      }
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
