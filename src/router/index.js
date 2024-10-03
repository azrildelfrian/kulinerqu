import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Foods from '../views/Foods.vue'
import FoodDetail from '../views/FoodDetail.vue'
import Keranjang from '../views/Keranjang.vue'
import Order from '../views/Order.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/foods',
    name: 'foods',
    component: Foods
  },
  {
    path: '/foods/:id',
    name: 'FoodDetail',
    component: FoodDetail
  },
  {
    path: '/keranjang',
    name: 'Keranjang',
    component: Keranjang
  },
  {
    path: '/order',
    name: 'Order',
    component: Order
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
