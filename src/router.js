import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '@/views/HomePage.vue'
import CardDetails from './views/CardDetails.vue'
import LoginPage from './views/LoginPage.vue'
import SettingsPage from './views/SettingsPage.vue'

import { useAuth } from './composables/useAuth'
const { isAuthenticated } = useAuth()

const routes = [
  { path: '/hw11-company-directory-api/', name: 'Home', component: HomePage },
  { path: '/hw11-company-directory-api/other', name: 'Other', component: () => import('@/views/OtherPage.vue') },
  { path: '/hw11-company-directory-api/employees/:id', name: 'CardDetails', component: CardDetails },
  { path: '/hw11-company-directory-api/login', name: 'LoginPage', component: LoginPage },
  { path: '/hw11-company-directory-api/settings', name: 'SettingsPage', component: SettingsPage, meta: {requiresAuth: true} },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

//navigation guard
router.beforeEach((to, _, next) => {
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    next({name: 'LoginPage', query: {redirect: to.fullpath}})
  } else {
    next()
  }
})

export default router
