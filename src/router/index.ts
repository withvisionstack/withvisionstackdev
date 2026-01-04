// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import AdminLogin from "../views/admin/AdminLogin.vue";
import ResetPassword from '../views/ResetPassword.vue';
import AdminDashboard from "../views/admin/AdminDashboard.vue";


const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,        // ← / abre a Home
  },
  {
    path: '/admin',
    name: 'admin-login',
    component: AdminLogin,  // ← /admin abre o login
  },
  {
    path: '/reset',
    name: 'ResetPassword',
    component: ResetPassword,
  },
  {
    path: '/admin/dashboard',
    name: 'admin-dashboard',
    component: AdminDashboard, // ← /admin/dashboard abre o painel
  },
]




const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router



