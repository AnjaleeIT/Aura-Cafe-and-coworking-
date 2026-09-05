import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import MenuView from '../views/MenuView.vue'
import ControlPanelLayout from '../layouts/ControlPanelLayout.vue'
import AdminOverview from '../views/admin/AdminOverview.vue'
import SpaceManagement from '../views/admin/SpaceManagement.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/menu',
      name: 'menu',
      component: MenuView
    },
    {
      path: '/spaces',
      name: 'spaces',
      component: HomeView 
    },
    {
      path: '/admin',
      component: ControlPanelLayout,
      meta: { requiresAuth: true, requiresAdmin: true },
      children: [
        {
          path: '',
          name: 'control-panel-overview',
          component: AdminOverview
        },
        {
          path: 'spaces',
          name: 'space-management',
          component: SpaceManagement
        }
      ]
    }
  ]
})

// Modern Vue Router Navigation Guard (Role-based)
router.beforeEach((to) => {
  const isLoggedIn = localStorage.getItem('is_logged_in') === 'true'
  const userRole = localStorage.getItem('user_role')

  // Authentication check
  if (to.meta.requiresAuth && !isLoggedIn) {
    return { name: 'login' }
  }

  // Admin/Staff Permission check
  if (to.meta.requiresAdmin && (userRole !== 'admin' && userRole !== 'staff')) {
    return { name: 'home' }
  }
})

export default router