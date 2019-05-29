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
      path: '/resources/create',
      name: 'resources-create',
      component: () => import('@/views/resources/CreateResource.vue'),
    },
    {
      path: '/resources/:id',
      name: 'resources-id',
      component: () => import('@/views/resources/ResourceDetails.vue'),
    },
    {
      path: '/resources/:id/edit',
      name: 'resources-id-edit',
      component: () => import('@/views/resources/EditResource.vue'),
    },
    {
      path: '/create-folder',
      name: 'create-folder',
      component: () => import('@/views/CreateFolder.vue'),
    },
    {
      path: '/folder/:id',
      name: 'folder-id',
      component: () => import('@/views/folders/FolderOpened.vue'),
    },
    {
      path: '/folder/:id/edit',
      name: 'folder-id-edit',
      component: () => import('@/views/folders/EditFolder.vue'),
    },
  ],
})
