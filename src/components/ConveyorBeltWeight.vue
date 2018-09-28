<template lang="pug">
  v-container.pa-0(fluid)
    include ../views/Global/_snackbar.pug
    v-stepper.transparent.elevation-0(v-model='currentStep')
      //- Steps
      include ../views/ConveyorBeltWeight/_step0.pug

      v-stepper-items
        //- Select snowplow material size
        v-stepper-content.px-1.pt-1(step='1')
          include ../views/ConveyorBeltWeight/_step1.pug

        //- Enter snowplow blade length
        v-stepper-content.px-1.pt-1(step='2')
          include ../views/ConveyorBeltWeight/_step2.pug

        //- Enter quantity
        v-stepper-content.px-1.pt-1(step='3')
          include ../views/ConveyorBeltWeight/_step3.pug

        //- Results
        v-stepper-content.px-1.pt-1(step='4')
          include ../views/ConveyorBeltWeight/_step4.pug
</template>

<script>
  import ConveyorBeltData from '../data/ConveyorBeltWeight.json'

  export default {
    mounted () {
      this.$emit('toolbarExtended', false)
      this.$emit('toolbarFab', { visible: false })
    },
    data () {
      return {
        currentStep: 0,
        snackbar: { text: null, display: false },
        beltTypes: ConveyorBeltData.beltTypes,
        beltData: {
          types: ConveyorBeltData.types,
          widths: ConveyorBeltData.widths
        },
        calcInput: {
          currentInput: null,
          belt: {},
          width: {
            sel: null,
            box: null
          },
          length: {
            feet: null,
            inches: null
          }
        }
      }
    },
    methods: {
      doTheCalculation () {
        //
      },
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
        this.calcInput = ConveyorBeltData.defaultInputs
      },
      moveStep (direction) {
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
      beltDescription () {
        var b = this.calcInput.belt.text
        var w = this.setWidth + '"'
        var lf = Number(this.calcInput.length.feet)
        var li = Number(this.calcInput.length.inches)
        var l
        if (lf === 0) {
          l = li + '"'
        } else if (li === 0) {
          l = lf + '\''
        } else {
          l = lf + '\'' + ' ' + li + '"'
        }
        return w + ' wide ' + b + ', ' + l + ' long'
      },
      beltWeight () {
        var b = this.calcInput.belt.value
        var w = this.setWidth
        var l = this.beltLengthToFeet

        return ((b * w) * l).toFixed(3)
      },
      beltLengthToFeet () {
        var foot = this.calcInput.length.feet
        var inch = this.calcInput.length.inches
        var totalFeet = (Number(foot) + Number(inch / 12))
        return totalFeet
      },
      setWidth () {
        var theWidth
        if (this.calcInput.width.box === null && this.calcInput.width.sel === null) {
        } else if (this.calcInput.width.box !== null) {
          //
          this.calcInput.width.sel = null
          theWidth = this.calcInput.width.box
          //
        } else if (this.calcInput.width.sel !== null) {
          //
          theWidth = this.calcInput.width.sel
          //
        }
        return theWidth
      }
    }
  }
</script>
