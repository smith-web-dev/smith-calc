import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'

import RollLength from '@/components/RollLength'
import ConveyorLength from '@/components/ConveyorLength/Index.vue'
import SquareFootage from '@/components/SquareFootage'
import ConveyorBeltWeight from '@/components/ConveyorBeltWeight/Index.vue'
import SnowplowBladeWeight from '@/components/SnowplowBladeWeight'
import CrimpSpec from '@/components/CrimpSpec'

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
