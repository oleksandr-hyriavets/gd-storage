import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/views/Signup.vue'),
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('@/views/Signin.vue'),
    },
    {
      path: '/resources',
      name: 'resources',
      component: () => import('@/views/resources/Resources.vue'),
    },
    {
      path: '/resources/:id',
      name: 'resources-id',
      component: () => import('@/views/resources/ResourceDetails.vue'),
    },
  ],
})
