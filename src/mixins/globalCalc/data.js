// import ColorProps from 'DATA/colorProps.json'
import navDrawerItems from 'DATA/NavDrawerItems.js'
import ComponentColors from '../../ui/componentColors.js'
import themes from 'AUI/themes/index'
import words from 'DATA/words'
export function data () {
  return {
    themes,
    navDrawerItems,
    colors: ComponentColors,
    words,
    drawer: false,
    btnColor: 'accent',
    stepColor: 'accent',
    dialogs: {
      loggedOut: false,
      addPhotoBottomSheet: false,
      settings: false
    },
    // colorProps: ColorProps,
    currentStep: 0,
    snackbar: { text: null, display: false },
    form: { email: '', pass: '' },
    avatar: null,
    saving: false,
    saved: false,
    //
    // Prefs
    //
    isDark: false,
    isMetric: false,
    useCommaSep: true,
    groupNavItems: true,
    decimalRounding: Number,
    decimalItems: [0, 1, 2, 3, 4, 5, 6, 7, 8]
  }
}
