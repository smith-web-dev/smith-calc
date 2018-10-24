export default {
  user () {
    return this.$store.getters.user
  },
  error () {
    return this.$store.getters.error
  },
  loading () {
    return this.$store.getters.loading
  },
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
      switch (this.currentStep) {
        case 0:
        case 1:
        default:
          toReturn = this.calcInput.rollOD === null
          break
        case 2:
          toReturn = this.calcInput.coreOD === null
          break
        case 3:
          toReturn = this.calcInput.thickness === null
          break
      }
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
