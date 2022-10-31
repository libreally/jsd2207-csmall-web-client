import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'/*静态*/

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: HomeView,
    children:[
      {
        path: '/about',
        component: () => import('../views/AboutView.vue')/*动态*/
      },
    ]
  },
  {
    path: '/Login',
    component: () => import('../views/LoginView.vue')/*动态*/
  },


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
