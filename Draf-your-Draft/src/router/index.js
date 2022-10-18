import Vue from 'vue'
import Router from 'vue-router'
import DraftPage from '@/components/DraftPage/DraftPage'
import RulesPage from '@/components/RulesPage/RulesPage'
import LabelsPage from '@/components/LabelsPage/LabelsPage'
import ChampList from '@/components/ChampList/ChampList'

Vue.use(Router)

export default new Router({
  routes: [
    
    {
      path: '/',
      name: 'LabelsPage',
      component: LabelsPage
    },
    {
      path: '/LabelsPage',
      name: 'LabelsPage',
      component: LabelsPage
    },
    {
      path: '/RulesPage',
      name: 'RulesPage',
      component: RulesPage
    },
    {
      path: '/DraftPage',
      name: 'DraftPage',
      component: DraftPage
    },
    {
      path: '/ChampList',
      name: 'champList',
      component: ChampList
    },
  ]
})
