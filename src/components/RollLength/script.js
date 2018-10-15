import { theAppIsDark } from '@/mixins/appIsDark.js'
import { globalCalc } from '@/mixins/globalCalc.js'

export default {
  mixins: [
    theAppIsDark,
    globalCalc
  ],
  data () {
    return {
      defaultInputs: '',
      msg: 'RollLength'
    }
  },
  computed: {
  }
}
