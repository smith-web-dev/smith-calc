import Vue from 'vue'
import Router from 'vue-router'
import Home from 'CMP/Home/Index'
import Auth from 'CMP/Auth/Index'

import RollLength from 'CMP/RollLength/Index'
import ConveyorLength from 'CMP/ConveyorLength/Index'
import SquareFootage from 'CMP/SquareFootage/Index'
import ConveyorBeltWeight from 'CMP/ConveyorBeltWeight/Index'
import SnowplowBladeWeight from 'CMP/SnowplowBladeWeight/Index'
import CrimpSpec from 'CMP/CrimpSpec/Index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/auth',
      name: 'Auth',
      component: Auth
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/roll-length',
      name: 'Roll Length',
      component: RollLength
    },
    {
      path: '/cb-length',
      name: 'Conveyor Length',
      component: ConveyorLength
    },
    {
      path: '/sqft',
      name: 'Square Footage',
      component: SquareFootage
    },
    {
      path: '/cb-weight',
      name: 'Conveyor Belt Weight',
      component: ConveyorBeltWeight
    },
    {
      path: '/snowplow-weight',
      name: 'Snowplow Blade Weight',
      component: SnowplowBladeWeight
    },
    {
      path: '/crimp',
      name: 'Crimp Spec',
      component: CrimpSpec
    }
  ]
})
