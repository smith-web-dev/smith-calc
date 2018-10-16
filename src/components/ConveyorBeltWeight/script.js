import ConveyorBeltData from 'DATA/ConveyorBeltWeight.json'
import { theAppIsDark } from 'MXN/appIsDark.js'
import { globalCalc } from 'MXN/globalCalc.js'

export default {
  mixins: [
    theAppIsDark,
    globalCalc
  ],
  mounted () {
    let ubelts = JSON.parse(this.$ls.get('cbWeightUserBelts'))
    this.userBelts = ubelts
  },
  data () {
    return {
      deleteBeltDialog: false,
      delSelect: null,
      beltTypes: ConveyorBeltData.beltTypes,
      defaultInputs: ConveyorBeltData.defaultInputs,
      addCustomBeltDialog: false,
      beltData: {
        types: ConveyorBeltData.types,
        widths: ConveyorBeltData.widths
      },
      userBelts: [
        ConveyorBeltData.userBeltsHeader,
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
    removeUserBelt (item) {
      let theArray = this.userBelts
      let index = theArray.indexOf(item)
      theArray.splice(index, 1)
      this.userBelts = theArray
      this.delSelect = null
      this.deleteBeltDialog = false
      this.$ls.set('cbWeightUserBelts', JSON.stringify(this.userBelts))
    },
    addUserBelt () {
      if (this.userBelts.length === 0) {
        this.userBelts.push(ConveyorBeltData.userBeltsHeader)
      }
      let theText = this.newBelt.cat + ' - ' + this.newBelt.text
      let theNewBelt = {
        text: theText,
        value: Number(this.newBelt.value),
        user: true
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
        return this.userBelts.concat(ConveyorBeltData.types)
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
    perFootWeight () {
      // (calcInput.belt.value * setWidth).toFixed(decimalRounding)
      let v = this.calcInput.belt.value
      let w = this.setWidth
      return (v * w).toFixed(this.decimalRounding)
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
