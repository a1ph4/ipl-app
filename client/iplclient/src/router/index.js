import Vue from 'vue'
import Router from 'vue-router'
import Seasons from '@/components/Seasons'
import SeasonDetails from '@/components/Season-details'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Seasons',
      component: Seasons
    },
    {
      path: '/seasons',
      redirect: {
        name: 'Seasons'
      }
    },
    {
      path: '/season',
      redirect: {
        name: 'Seasons'
      }
    },
    {
      path: '/season/:id',
      name: 'SeasonDetails',
      component: SeasonDetails
    }
  ]
})
