import { mounted } from './mounted.js'
import { created } from './created.js'
import { data } from './data.js'
import methods from './methods.js'
import computed from './computed.js'
import watch from './watch.js'

export const globalCalc = {
  mounted,
  created,
  data,
  methods,
  computed,
  watch
}
