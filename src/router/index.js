import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home/Index'

import RollLength from '@/components/RollLength/Index'
import ConveyorLength from '@/components/ConveyorLength/Index'
import SquareFootage from '@/components/SquareFootage/Index'
import ConveyorBeltWeight from '@/components/ConveyorBeltWeight/Index'
import SnowplowBladeWeight from '@/components/SnowplowBladeWeight/Index'
import CrimpSpec from '@/components/CrimpSpec/Index'

Vue.use(Router)

export default new Router({
  routes: [
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
