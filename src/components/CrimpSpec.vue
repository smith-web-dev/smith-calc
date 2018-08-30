<template lang="pug">
  v-container
    p {{ calcInput }}
    p {{ setCompFac }}
    v-btn(@click.native='doTheCalculation()') try it
    v-stepper(v-model='currentStep')
      v-stepper-header
        v-stepper-step(:complete='currentStep > 1', step='1') Select hose type
        v-divider
        v-stepper-step(:complete='currentStep > 2', step='2') Measure the fitting shank OD
        v-divider
        v-stepper-step(:complete='currentStep > 3', step='3') Measure the hose wall thickness
        v-divider
        v-stepper-step(:complete='currentStep > 4', step='4') Measure the sleeve or ferrule wall
        v-divider
        v-stepper-step(step='5') Results

      v-stepper-items
        //-
        //- Hose type
        //-
        v-stepper-content(step='1')
          include ./CrimpSpec/_step1.pug
          v-btn(color='primary', @click='currentStep = 2')
            | Continue
          v-btn(flat='') Cancel
        //-
        //-
        //-
        v-stepper-content(step='2')
          v-card.mb-5
            v-card-text
              p Measure the fitting shank OD
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
        currentStep: 0,
        showCompFacWarn: false,
        compFacWarnType: '',
        steps: [
          { step: 1, name: 'Select hose type' },
          { step: 2, name: 'Measure the fitting shank OD' },
          { step: 3, name: 'Measure the hose wall thickness' },
          { step: 4, name: 'Measure the sleeve or ferrule wall' }
        ],
        calcData: {
          hoseTypes: CrimpSpecData.hoseTypes
        },
        calcInput: {
          comp: {
            sel: null,
            box: null
          },
          compression: null
        }
      }
    },
    methods: {
      doTheCalculation () {
        console.log(this.setCompFac)
        // avgShankOd + (avgHoseWall * 2) + (1 - this.setCompFac) + (avgFerruleWall * 2)
      }
    },
    computed: {
      setCompFac () {
        var theCompFac
        if (this.calcInput.comp.box === null && this.calcInput.comp.sel === null) {
          console.log('nothing')
        } else if (this.calcInput.comp.box !== null) {
          //
          theCompFac = (this.calcInput.comp.box / 100)
          console.log('Entered comp factor of ' + theCompFac)
          this.calcInput.comp.sel = null
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
          this.showCompFacWarn = true
          this.compFacWarnType = 'warning'
          theWarning = result.warn
        }

        if (entered != null) {
          this.showCompFacWarn = true
          this.compFacWarnType = 'error'
          theWarning = 'An incorrect compression factor value can not only damage hose and fitting but can also damage the crimper. Proceed with caution!'
        }

        if ((selected === null && entered === null) || (entered === null && selected === undefined) || (entered === '' && selected === null) || (entered === '' && selected === undefined)) {
          this.showCompFacWarn = false
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
