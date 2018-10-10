import ColorProps from '@/data/colorProps.json'

export const globalCalc = {
  mounted () {
    this.$emit('toolbarExtended', false)
    this.$emit('toolbarFab', { visible: false })
    this.isDark = JSON.parse(this.$ls.get('appDarkMode'))
    this.decimalRounding = Number(this.$ls.get('appDecimalRounding'))
  },
  created () {
    this.isDark = JSON.parse(this.$ls.get('appDarkMode'))
    this.decimalRounding = Number(this.$ls.get('appDecimalRounding'))
  },
  data () {
    return {
      // fieldColor: 'accent',
      btnColor: 'accent',
      colorProps: ColorProps,
      isDark: Boolean,
      decimalRounding: Number,
      decimalItems: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      currentStep: 0,
      snackbar: { text: null, display: false }
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
    },
    resetAll (defaults) {
      this.currentStep = 1
      this.calcInput = defaults
    },
    toggleDarkMode () {
      var appDarkMode = this.$ls.get('appDarkMode')

      if (JSON.parse(appDarkMode) === false) {
        this.$ls.set('appDarkMode', JSON.stringify(true))
        this.isDark = true
      } else {
        this.$ls.set('appDarkMode', JSON.stringify(false))
        this.isDark = false
      }
      this.$forceUpdate()
    },
    changeDecimalRounding () {
      var newNum = this.decimalRounding
      this.$ls.set('appDecimalRounding', newNum)
    }
  },
  computed: {
    fieldColor () {
      if (this.isDark) {
        return 'accent'
      } else {
        return 'primary'
      }
    },
    theAppIsDark () {
      return JSON.parse(this.$ls.get('appDarkMode'))
    },
    theAppIsMetric () {
      var appMetricUnits = this.$ls.get('appMetricUnits')
      return JSON.parse(appMetricUnits)
    },
    stepNextDisabled () {
      let toReturn
      //
      // Crimp Spec
      //
      if (this.$route.name === 'Crimp Spec') {
        switch (this.currentStep) {
          case 0:
          case 1:
          default:
            /* eslint-disable no-extra-boolean-cast */
            toReturn = !this.setCompFac
            break
          case 2:
            toReturn = this.$noNullVals(this.calcInput.shankMeas)
            break
          case 3:
            toReturn = this.$noNullVals(this.calcInput.hoseWallMeas)
            break
          case 4:
            toReturn = this.$noNullVals(this.calcInput.ferruleWallMeas)
            break
        }
      }
      //
      // Conveyor Belt Weight
      //
      if (this.$route.name === 'Conveyor Belt Weight') {
        switch (this.currentStep) {
          case 0:
          case 1:
          default:
            toReturn = this.calcInput.belt.value === undefined
            break
          case 2:
            toReturn = this.calcInput.width.sel === null && this.calcInput.width.box === null
            break
          case 3:
            toReturn = this.calcInput.length.feet === null && this.calcInput.length.inches === null
            break
        }
      }
      //
      // Snowplow Blade Weight
      //
      if (this.$route.name === 'Snowplow Blade Weight') {
        switch (this.currentStep) {
          case 0:
          case 1:
          default:
            toReturn = this.calcInput.size === null
            break
          case 2:
            toReturn = this.calcInput.length.feet === null && this.calcInput.length.inches === null
            break
          case 3:
            toReturn = this.calcInput.quantity === 0 || this.calcInput.quantity === null
        }
      }
      //
      //
      //
      if (this.$route.name === 'Roll Length') {
        //
      }
      //
      //
      //
      if (this.$route.name === 'Square Footage') {
        //
      }
      //
      //
      //
      if (this.$route.name === 'Conveyor Length') {
        switch (this.currentStep) {
          case 0:
          case 1:
          default:
            if (this.calcInput.equalPulleys) {
              toReturn = this.calcInput.pully.one === null
            } else {
              toReturn = this.calcInput.pully.one === null || this.calcInput.pully.two === null
            }
            break
          case 2:
            toReturn = this.calcInput.span.feet === null && this.calcInput.span.inches === null
        }
      }
      return toReturn
    },
    decPlaSuffix () {
      if (this.decimalRounding === 0) {
        return 'places'
      } else if (this.decimalRounding === 1) {
        return 'place'
      } else {
        return 'places'
      }
    }
  }
}
