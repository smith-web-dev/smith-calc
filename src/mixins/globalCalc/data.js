import ColorProps from 'DATA/colorProps.json'
import navDrawerItems from 'DATA/NavDrawerItems.js'
export function data () {
  return {
    navDrawerItems: navDrawerItems,
    // navDrawerExpanded: [true, true, true, true],
    words: {
      signin: 'Sign In',
      logout: 'Log Out',
      signup: 'Sign Up'
    },
    drawer: false,
    btnColor: 'accent',
    dialogs: {
      loggedOut: false,
      addPhotoBottomSheet: false,
      settings: false
    },
    colorProps: ColorProps,
    isDark: Boolean,
    decimalRounding: Number,
    decimalItems: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    currentStep: 0,
    snackbar: { text: null, display: false },
    form: { email: '', pass: '' },
    avatar: null,
    saving: false,
    saved: false
  }
}
