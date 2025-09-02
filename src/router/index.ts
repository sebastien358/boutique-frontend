import NotFound from '@/components/NotFound.vue'
import Admin from '@/features/admin/Admin.vue'
import { ADMIN_ROUTES } from '@/features/admin/routes/routes.admin'
import { useAuthStore } from '@/features/admin/stores/authStore'
import Boutique from '@/features/boutique/Boutique.vue'
import Login from '@/features/boutique/components/auth/Login.vue'
import Register from '@/features/boutique/components/auth/Register.vue'

import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', redirect: '/boutique' },
  { path: '/boutique', component: Boutique },
  {
    path: '/admin',
    component: Admin,
    children: ADMIN_ROUTES,
    meta: { requiresAuth: true }
  },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/:notFound(.*)*', component: NotFound }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    next({path: '/login'})
  } else {
    next();
  }
})

export default router