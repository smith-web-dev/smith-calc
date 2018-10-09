<template lang="pug">
  extends ../views/layouts/_calc-main.pug

  block template-includes
    include ../views/ConveyorBeltWeight/_addCustomBeltDialog.pug
    p {{ userBelts }}
  block stepper-steps
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
  import { theAppIsDark } from '@/mixins/appIsDark.js'
  import { globalCalc } from '@/mixins/globalCalc.js'

  let userBeltsHeader = {
    'text': 'User',
    'disabled': true,
    'prepend-icon': 'fas fa-angle-right',
    'item-avatar': 'fas fa-angle-right'
  }

  export default {
    mixins: [
      theAppIsDark,
      globalCalc
    ],
    created () {

    },
    mounted () {
      let ubelts = JSON.parse(this.$ls.get('cbWeightUserBelts'))
      // let newArr = []
      console.log(ubelts)
      // if (ubelts.length > 0 && ubelts.length < 2) {
      // newArr = newArr.concat(userBeltsHeader)
      // newArr = newArr.concat(ubelts)
      // ubelts = userBeltsHeader.concat(ubelts)
      // ubelts = ubelts.concat(userBeltsHeader)
      // console.log(ubelts)
      // this.userBelts = newArr
      // } else {
      this.userBelts = ubelts
    },
    data () {
      return {
        beltTypes: ConveyorBeltData.beltTypes,
        defaultInputs: ConveyorBeltData.defaultInputs,
        addCustomBeltDialog: false,
        beltData: {
          types: ConveyorBeltData.types,
          widths: ConveyorBeltData.widths
        },
        userBelts: [
          userBeltsHeader,
          {
            text: 'User - Some belt',
            value: 0.666
          }
        ],
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
        },
        newBelt: {
          cat: '',
          text: '',
          value: null
        }
      }
    },
    methods: {
      addUserBelt () {
        if (this.userBelts.length === 0) {
          this.userBelts.push(userBeltsHeader)
        }
        let theText = this.newBelt.cat + ' - ' + this.newBelt.text
        let theNewBelt = {
          text: theText,
          value: Number(this.newBelt.value)
        }
        this.userBelts.push(theNewBelt)
        this.$ls.set('cbWeightUserBelts', JSON.stringify(this.userBelts))
        this.addCustomBeltDialog = false
        this.newBelt.cat = ''
        this.newBelt.text = ''
        this.newBelt.value = null
      }
    },
    computed: {
      beltTypesWithUser () {
        if (this.userBelts.length > 1) {
          console.log('concat')
          return this.userBelts.concat(ConveyorBeltData.types)
          // return ConveyorBeltData.types.concat(this.userBelts)
        } else {
          return ConveyorBeltData.types
        }
      },
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

        return ((b * w) * l).toFixed(this.decimalRounding)
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
