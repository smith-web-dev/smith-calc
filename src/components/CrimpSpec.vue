<template lang="pug">
  v-container
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
          include ./CrimpSpec/_step2.pug
          v-btn(color='primary', @click='currentStep = 3')
            | Continue
          v-btn(flat='') Cancel

        //- Hose Wall
        v-stepper-content(step='3')
          include ./CrimpSpec/_step3.pug
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
        currentStep: 0,
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
      },
      addHoseWallMeas () {
        var newMeas = { value: null, btn: true }
        var measArray = this.calcInput.hoseWallMeas

        measArray.push(newMeas)
      },
      removeHoseWallMeas (index) {
        var measArray = this.calcInput.hoseWallMeas
        measArray.splice(index, 1)
        this.calcInput.hoseWallMeas = measArray
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
