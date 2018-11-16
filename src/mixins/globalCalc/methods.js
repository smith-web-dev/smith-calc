let convert = require('convert-units')
export default {
  nits (num, from, to) {
    return Number(convert(num).from(from).to(to))
  },
  unitsNum (num) {
    if (this.isMetric) {
      return Number(convert(num).from('cm').to('in'))
    } else {
      return Number(num)
    }
  },
  commaNum (num) {
    if (this.useCommaSep) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    } else {
      return num
    }
  },
  addUserFaveCalc () {
    // lsFaveCalcs = JSON.parse(this.$ls.get('userFaveCalcs'))
    // this.faveCalcs = lsFaveCalcs
    // let faveCalcArr = this.faveCalcs
    console.log(this.matchedCalc)
    // faveCalcArr.push(this.matchedCalc)

    this.faveCalcs.push(this.matchedCalc)
    console.log(this.faveCalcs)

    // this.faveCalcs = faveCalcArr
    this.clickedCalc = null
    this.$ls.set('userFaveCalcs', JSON.stringify(this.faveCalcs))
  },
  uploadImage () {
    this.saving = true
    setTimeout(() => this.savedAvatar(), 1000)
    // console.log('upload the file')
  },
  savedAvatar () {
    this.saving = false
    this.saved = true
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
  togglePref (ls, data) {
    var temp = this.$ls.get(ls)

    if (JSON.parse(temp) === false) {
      this.$ls.set(ls, JSON.stringify(true))
      this[data] = true
    } else {
      this.$ls.set(ls, JSON.stringify(false))
      this[data] = false
    }
    this.$forceUpdate()
  },
  changeDecimalRounding () {
    var newNum = this.decimalRounding
    this.$ls.set('appDecimalRounding', newNum)
  },
  onSignup () {
    this.$store.dispatch('signUserUp', {email: this.form.email, password: this.form.pass})
  },
  onSignin () {
    this.$store.dispatch('signUserIn', {email: this.form.email, password: this.form.pass})
  },
  onSigninGoogle () {
    this.$store.dispatch('signUserInGoogle')
  },
  onSigninFacebook () {
    this.$store.dispatch('signUserInFacebook')
  },
  onSigninGithub () {
    this.$store.dispatch('signUserInGithub')
  },
  onSigninTwitter () {
    this.$store.dispatch('signUserInTwitter')
  },
  onResetPassword () {
    if (this.form.email === '') {
      return this.$store.dispatch('setError', {message: 'Email can not be blnak'})
    }
    this.$store.dispatch('resetPasswordWithEmail', {email: this.form.email})
  },
  onDismissed () {
    this.$store.dispatch('clearError')
  },
  onLogout () {
    var compo = this
    this.drawer = false
    this.$store.dispatch('logout')
    compo.snackbar.text = 'Logged out'
    compo.snackbar.display = true
    this.$router.push('/')
  },
  closeSettings () {
    this.dialogs.settings = false
    // wif (this.avatar && this.saved === false) {
    //   this.uploadImage()
    // } else {
    //   console.log('no image uploaded')
    // }
  }
}
