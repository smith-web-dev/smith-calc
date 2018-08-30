import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'

import RollLength from '@/components/RollLength'
import ConveyorLength from '@/components/ConveyorLength'
import SquareFootage from '@/components/SquareFootage'
import ConveyorBeltWeight from '@/components/ConveyorBeltWeight'
import SnowplowBladeWeight from '@/components/SnowplowBladeWeight'
import CrimpSpec from '@/components/CrimpSpec'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/roll-length',
      name: 'RollLength',
      component: RollLength
    },
    {
      path: '/cb-length',
      name: 'ConveyorLength',
      component: ConveyorLength
    },
    {
      path: '/sqft',
      name: 'SquareFootage',
      component: SquareFootage
    },
    {
      path: '/cb-weight',
      name: 'ConveyorBeltWeight',
      component: ConveyorBeltWeight
    },
    {
      path: '/snowplow-weight',
      name: 'SnowplowBladeWeight',
      component: SnowplowBladeWeight
    },
    {
      path: '/crimp',
      name: 'CrimpSpec',
      component: CrimpSpec
    }
  ]
})
