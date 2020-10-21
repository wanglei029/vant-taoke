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
    path: '/search',
    name: 'search',
    component: () => import('@/views/search/search')
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article/article'),
    // 将动态路由参数映射到组件
    props: true
  },
  {
    path: '/demo',
    name: 'demo',
    component: () => import('@/views/demo/demo')
  },
  {
    path: '/taoke',
    component: () => import('@/views/taoke/index'),
    children: [
      {
        path: '',
        component: () => import('@/views/taoke/taoke')
      },
      {
        path: 'search',
        component: () => import('@/views/taoke/search/search')
      },
      {
        path: 'goods/:goodsId',
        name: 'goods',
        component: () => import('@/views/taoke/goods/goods')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
