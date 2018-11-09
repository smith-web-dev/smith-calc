import { data } from './data'
import { created } from './created'
import watch from './watch'
import methods from './methods'
import computed from './computed'

import { globalCalc } from 'MXN/globalCalc'
import FileUpload from '@/components/FileUpload/Index.vue'

export default {
  components: {
    FileUpload: FileUpload
  },
  mixins: [ globalCalc ],
  data,
  watch,
  created,
  methods,
  computed
}
