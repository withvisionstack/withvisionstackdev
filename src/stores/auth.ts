import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '../SupabaseCli'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)
  const user = ref<any>(null)

  const checkAuth = async () => {
    const { data } = await supabase.auth.getUser()
    user.value = data.user
    isAuthenticated.value = !!data.user
  }

  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) {
      console.error(error.message)
      return false
    }
    user.value = data.user
    isAuthenticated.value = true
    return true
  }

  const logout = async () => {
    await supabase.auth.signOut()
    user.value = null
    isAuthenticated.value = false
  }

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:5173/reset', // rota da sua app
    })
    if (error) {
      console.error(error.message)
      return false
    }
    return true
  }

  return { isAuthenticated, user, checkAuth, login, logout, resetPassword }
})

