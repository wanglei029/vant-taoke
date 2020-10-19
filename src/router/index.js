import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login')
  },
  {
    path: '/',
    component: () => import('@/views/layout/layout'),
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/views/home/home')
      },
      {
        path: '/nine',
        name: 'nine',
        component: () => import('@/views/nine/nine')
      },
      {
        path: '/category',
        name: 'category',
        component: () => import('@/views/category/category')
      },
      {
        path: '/collection',
        name: 'collection',
        component: () => import('@/views/collection/collection')
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my/my')
      }
    ]
  },
  {
    path: '/demo',
    name: 'demo',
    component: () => import('@/views/demo/demo')
  },
  {
    path: '/taoke',
    name: 'taoke',
    component: () => import('@/views/taoke/taoke')
  }
]

const router = new VueRouter({
  routes
})

export default router
