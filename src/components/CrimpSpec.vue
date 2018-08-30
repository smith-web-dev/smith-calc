<template lang="pug">
  v-container
    p {{ calcInput }}
    p {{ setCompFac }}
    v-btn(@click.native='doTheCalculation()') try it
    v-stepper(v-model='currentStep' vertical)
      //- Steps
      include ./CrimpSpec/_step0.pug

      v-stepper-items
        //- Compression factor
        v-stepper-content(step='1')
          include ./CrimpSpec/_step1.pug
          v-btn(color='primary', @click='currentStep = 2')
            | Continue
          v-btn(flat='') Cancel

        //- Shank OD
        v-stepper-content(step='2')
          v-card.mb-5
            v-card-title(primary-title style='display: block;')
              .headline Determine the average OD of the fitting shank
              div.grey--text.text--darken-1 Measure the shank's outside diameter in at least 3 places, always at the highest points of the serrations.
            v-card-text
              p avg: {{ shankOdAverage }}
              v-container.pt-0
                div(v-for='(f, i) in calcInput.shankMeas' :key='i')
                  v-text-field(type='number' label='' box v-model='calcInput.shankMeas[i].value' clearable)
                    v-btn(flat icon color='error' slot="append-outer" v-show='f.btn' style='top: -10px;' @click.native='removeShankOdMeas(i)')
                      v-icon remove
                v-btn.info(@click.native='addShankOdMeas()' :disabled='calcInput.shankMeas.length < 6 ? false : true') ass
          v-btn(color='primary', @click='currentStep = 3')
            | Continue
          v-btn(flat='') Cancel
        //-
        //-
        v-stepper-content(step='3')
          v-card.mb-5(color='grey lighten-1', height='200px')
            v-card-text
              p Measure the hose wall thickness
          v-btn(color='primary', @click='currentStep = 4')
            | Continue
          v-btn(flat='') Cancel
        v-stepper-content(step='4')
          v-card.mb-5(color='grey lighten-1', height='200px')
            v-card-text
              p Measure the sleeve or ferrule wall
          v-btn(color='primary', @click='currentStep = 5')
            | Continue
          v-btn(flat='') Cancel
        //-
        //-
        v-stepper-content(step='5')
          v-card.mb-5(color='grey lighten-1', height='200px')
            v-card-text
              p Results
          v-btn(color='primary', @click='currentStep = 1')
            | Continue
          v-btn(flat='') Cancel
</template>

<script>
  import CrimpSpecData from '@/data/CrimpSpec.json'
  export default {
    data () {
      return {
        currentStep: 2,
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
          ]
        }
      }
    },
    methods: {
      doTheCalculation () {
        console.log(this.setCompFac)
        // this.shankOdAverage + (avgHoseWall * 2) + (1 - this.setCompFac) + (avgFerruleWall * 2)
      },
      addShankOdMeas () {
        var newMeas = { value: null, btn: true }
        var measArray = this.calcInput.shankMeas

        measArray.push(newMeas)
      },
      removeShankOdMeas (index) {
        var measArray = this.calcInput.shankMeas
        measArray.splice(index, 1)
        this.calcInput.shankMeas = measArray
      }
    },
    computed: {
      setCompFac () {
        var theCompFac
        if (this.calcInput.comp.box === null && this.calcInput.comp.sel === null) {
          console.log('nothing: ' + theCompFac)
        } else if (this.calcInput.comp.box !== null) {
          //
          this.calcInput.comp.sel = null
          theCompFac = (this.calcInput.comp.box / 100)
          console.log('Entered comp factor of ' + theCompFac)
          //
        } else if (this.calcInput.comp.sel !== null) {
          //
          theCompFac = this.calcInput.comp.sel
          console.log('Selected comp factor of ' + theCompFac)
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
        console.log('sum of array: ' + theSum + ' divided by ' + theArray.length)
        console.log('average: ' + (theSum / theArray.length))

        return (theSum / theArray.length)
      },
      shankMeasAddDisable () {
        var measArray = this.calcInput.shankMeas
        var arrLen = parseInt(measArray.length)
        console.log(arrLen)
        if (arrLen < 7) {
          this.steps.shankMeas.disableAdd = true
        } else {
          this.steps.shankMeas.disableAdd = false
        }
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
    width: 80%;
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
