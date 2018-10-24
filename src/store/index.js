import Vue from 'vue'
import Vuex from 'vuex'
import user from './user.js'
import shared from './shared.js'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    user,
    shared
  }
})
