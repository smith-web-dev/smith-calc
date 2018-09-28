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
    //- v-btn(@click='doCalculation(25, equalPullies, 12)') click
    //- p {{ equalPullies }}

</template>

<script>
  export default {
    mounted () {
      this.$emit('toolbarExtended', false)
      this.$emit('toolbarFab', { visible: false })
    },
    data () {
      return {
        currentStep: 0,
        snackbar: { display: false, text: null },
        msg: 'ConveyorLength',
        equalPullies: false,
        result: null,
        calcInput: {
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
      firstStepNextDisabled () {
        var theBool
        if (this.equalPullies) {
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
        var pOne = Number(this.calcInput.pully.one)
        var pTwo = Number(this.calcInput.pully.two)
        var pEq = Number(this.equalPullies)
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
        C = Number(this.calcInput.span.feet) + (Number(this.calcInput.span.inches) / 12)
        result = ((Math.PI / 2) * (D + d)) + (Math.pow((D - d), 2) / (4 * C)) + (2 * C)
        var resultFt = (result - (result % 1))
        var resultDec = result % 1
        var resultIn = (12 * resultDec) - ((12 * resultDec) % 1)
        // console.log(D + ' ' + d + ' ' + C)
        // L = ((pi / 2) * (D + d)) + ((D - d)^2 / (4 * C)) + (2 * C)
        return resultFt + '\' ' + resultIn + '"'
      },
      makeDesc () {
        var p1 = Number(this.calcInput.pully.one)
        var p2 = Number(this.calcInput.pully.two)
        var cF = Number(this.calcInput.span.feet)
        var cI = Number(this.calcInput.span.inches)
        var diamText
        var spanText
        if (this.equalPullies) {
          diamText = 'Pullies with diameter of ' + p1 + '" '
        } else {
          diamText = 'Pullies with diameters of ' + p1 + '" and ' + p2 + '"'
        }
        if (cI === null || cI === 0) {
          spanText = 'With distance between pullies of ' + cF + '\''
        } else {
          spanText = 'With distance between pullies of ' + cF + '\' ' + cI + '"'
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
        // this.calcInput = CrimpSpecData.defaultInputs
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
