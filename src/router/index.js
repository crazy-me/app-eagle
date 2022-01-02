// 路由
import Vue from 'vue'
import Router from 'vue-router'
import user from './user'

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      component: () => import('@/components/common/Login.vue'),
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('tokenB')) {
          next('/')
        } else {
          next()
        }
      }
    },
    {
      path: '/not-found',
      component: () => import('@/components/common/NotFound'),
      name: '404'
    },
    {
      path: '/',
      name: '',
      component: () => import('@/views/Index'),
      redirect: 'home',
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('tokenB')) {
          next()
        } else {
          next('/login')
        }
      },
      children: [
        {
          path: 'home',
          meta: {
            title: '首页'
          },
          component: () => import('@/views/home/Home')
        },
        ...user
      ]
    },
    {
      path: '*',
      redirect: {
        path: '/not-found'
      }
    }
  ]
})
