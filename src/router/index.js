import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Goods from '@/components/goods/Goods'
import Ratings from '@/components/ratings/Ratings'
import Seller from '@/components/seller/Seller'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Goods
    },
    {
      path:'/goods',
      name:'Goods',
      component:Goods
    },
    {
      path:'/ratings',
      name:'Ratings',
      component:Ratings
    },
    {
      path:'/seller',
      name:'Seller',
      component:Seller
    }
  ]
})
