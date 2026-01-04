<template>
  <div class="admin-login">
    <!-- Background animado -->
    <div class="background-shapes">
      <div class="shape shape-1"></div>
      <div class="shape shape-2"></div>
      <div class="shape shape-3"></div>
    </div>

    <div class="login-container">
      <div class="login-header">
        <div class="icon-wrapper">
          <i class="fas fa-shield-alt"></i>
        </div>
        <h2>Admin Login</h2>
        <p>Acesso restrito ao painel administrativo</p>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="email">
            <i class="fas fa-envelope"></i>
            Email
          </label>
          <div class="input-wrapper">
            <input
              id="email"
              v-model="email"
              type="email"
              placeholder="Digite seu email"
              required
            >
            <div class="input-border"></div>
          </div>
        </div>

        <div class="form-group">
          <label for="password">
            <i class="fas fa-lock"></i>
            Senha
          </label>
          <div class="input-wrapper">
            <input
              id="password"
              v-model="password"
              type="password"
              placeholder="Digite a senha"
              required
              :class="{ error: showError }"
            >
            <div class="input-border"></div>
          </div>
        </div>

        <Transition name="error">
          <div v-if="showError" class="error-message">
            <i class="fas fa-exclamation-circle"></i>
            <span>Credenciais incorretas! Tente novamente.</span>
          </div>
        </Transition>

        <button type="submit" class="btn-login" :disabled="isLoading">
          <span v-if="!isLoading" class="btn-content">
            <i class="fas fa-sign-in-alt"></i>
            Entrar
          </span>
          <span v-else class="btn-content">
            <i class="fas fa-spinner fa-spin"></i>
            Verificando...
          </span>
        </button>

        <button type="button" @click="handleResetPassword" class="btn-reset">
          <i class="fas fa-key"></i>
          Esqueci minha senha
        </button>
      </form>

      <button @click="goBack" class="btn-back">
        <i class="fas fa-arrow-left"></i>
        Voltar ao site
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const showError = ref(false)
const isLoading = ref(false)

const handleLogin = async () => {
  isLoading.value = true
  showError.value = false

  const success = await authStore.login(email.value, password.value)

  if (success) {
    router.push('/admin/dashboard')
  } else {
    showError.value = true
    password.value = ''
  }

  isLoading.value = false
}

const handleResetPassword = async () => {
  if (!email.value) {
    alert('Por favor, digite seu email primeiro.')
    return
  }
  
  const ok = await authStore.resetPassword(email.value)
  if (ok) {
    alert('Verifique seu email para redefinir a senha.')
  } else {
    alert('Erro ao enviar email de reset.')
  }
}

const goBack = () => {
  router.push('/')
}
</script>

<style scoped>
/* ===== CONTAINER PRINCIPAL ===== */
.admin-login {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0a0a1e 0%, #1a1a3e 50%, #0f0f2e 100%);
  padding: 2rem;
  position: relative;
  overflow: hidden;
}

/* ===== BACKGROUND ANIMADO ===== */
.background-shapes {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
}

.shape {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.3;
  animation: float 20s ease-in-out infinite;
}

.shape-1 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 70%);
  top: -250px;
  right: -250px;
  animation-delay: 0s;
}

.shape-2 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, transparent 70%);
  bottom: -200px;
  left: -200px;
  animation-delay: 5s;
}

.shape-3 {
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: 10s;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0) scale(1);
    opacity: 0.3;
  }
  33% {
    transform: translate(50px, -50px) scale(1.1);
    opacity: 0.4;
  }
  66% {
    transform: translate(-30px, 40px) scale(0.9);
    opacity: 0.35;
  }
}

/* ===== CONTAINER DO LOGIN ===== */
.login-container {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 24px;
  padding: 3rem;
  max-width: 480px;
  width: 100%;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(255, 255, 255, 0.05) inset,
    0 20px 60px rgba(99, 102, 241, 0.1);
  position: relative;
  z-index: 1;
  animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(40px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* ===== HEADER ===== */
.login-header {
  text-align: center;
  margin-bottom: 3rem;
}

.icon-wrapper {
  width: 90px;
  height: 90px;
  margin: 0 auto 1.5rem;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(168, 85, 247, 0.2) 100%);
  border: 2px solid rgba(99, 102, 241, 0.3);
  border-radius: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  animation: iconPulse 3s ease-in-out infinite;
  box-shadow: 
    0 10px 30px rgba(99, 102, 241, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.1) inset;
}

@keyframes iconPulse {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 10px 30px rgba(99, 102, 241, 0.3);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 15px 40px rgba(99, 102, 241, 0.4);
  }
}

.icon-wrapper i {
  font-size: 2.5rem;
  background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.login-header h2 {
  color: #fff;
  font-size: 2rem;
  margin-bottom: 0.75rem;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.login-header p {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.95rem;
  line-height: 1.5;
}

/* ===== FORMULÁRIO ===== */
.login-form {
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.75rem;
}

.form-group label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 0.75rem;
  font-weight: 600;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.form-group label i {
  color: #6366f1;
  font-size: 1rem;
}

.input-wrapper {
  position: relative;
}

.form-group input {
  width: 100%;
  padding: 1.1rem 1.25rem;
  background: rgba(255, 255, 255, 0.03);
  border: 2px solid rgba(99, 102, 241, 0.2);
  border-radius: 12px;
  color: #fff;
  font-size: 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.form-group input::placeholder {
  color: rgba(255, 255, 255, 0.3);
}

.form-group input:focus {
  outline: none;
  border-color: #6366f1;
  background: rgba(255, 255, 255, 0.06);
  box-shadow: 
    0 0 0 4px rgba(99, 102, 241, 0.1),
    0 8px 20px rgba(99, 102, 241, 0.2);
  transform: translateY(-2px);
}

.input-border {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #6366f1 0%, #a855f7 100%);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateX(-50%);
}

.form-group input:focus + .input-border {
  width: 100%;
}

.form-group input.error {
  border-color: #ef4444;
  animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97);
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-8px); }
  20%, 40%, 60%, 80% { transform: translateX(8px); }
}

/* ===== MENSAGEM DE ERRO ===== */
.error-message {
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.05) 100%);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-left: 4px solid #ef4444;
  color: #fca5a5;
  padding: 1rem 1.25rem;
  border-radius: 10px;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.9rem;
  font-weight: 500;
}

.error-message i {
  color: #ef4444;
  font-size: 1.2rem;
  flex-shrink: 0;
}

/* Transição da mensagem de erro */
.error-enter-active {
  animation: errorSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.error-leave-active {
  animation: errorSlideOut 0.2s cubic-bezier(0.4, 0, 1, 1);
}

@keyframes errorSlideIn {
  from {
    opacity: 0;
    transform: translateY(-10px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes errorSlideOut {
  from {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  to {
    opacity: 0;
    transform: translateY(-10px) scale(0.95);
  }
}

/* ===== BOTÕES ===== */
.btn-login {
  width: 100%;
  padding: 1.15rem;
  background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 
    0 10px 25px rgba(99, 102, 241, 0.3),
    0 4px 12px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
}

.btn-login::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.btn-login:hover::before {
  left: 100%;
}

.btn-login:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 
    0 15px 35px rgba(99, 102, 241, 0.5),
    0 6px 16px rgba(0, 0, 0, 0.3);
}

.btn-login:active:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 
    0 8px 20px rgba(99, 102, 241, 0.4),
    0 3px 10px rgba(0, 0, 0, 0.2);
}

.btn-login:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.btn-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.btn-reset {
  width: 100%;
  padding: 0.85rem;
  background: transparent;
  color: rgba(255, 255, 255, 0.6);
  border: 1.5px solid rgba(99, 102, 241, 0.2);
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
}

.btn-reset:hover {
  color: #fff;
  border-color: #6366f1;
  background: rgba(99, 102, 241, 0.05);
  transform: translateY(-2px);
}

.btn-back {
  width: 100%;
  padding: 0.85rem;
  background: rgba(255, 255, 255, 0.02);
  color: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.btn-back:hover {
  color: #fff;
  border-color: rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.05);
  transform: translateY(-2px);
}

/* ===== RESPONSIVIDADE ===== */
@media (max-width: 768px) {
  .admin-login {
    padding: 1.5rem;
  }

  .login-container {
    padding: 2rem 1.5rem;
  }

  .icon-wrapper {
    width: 75px;
    height: 75px;
  }

  .icon-wrapper i {
    font-size: 2rem;
  }

  .login-header h2 {
    font-size: 1.75rem;
  }

  .login-header p {
    font-size: 0.85rem;
  }
}

@media (max-width: 480px) {
  .login-container {
    padding: 1.75rem 1.25rem;
  }

  .form-group input {
    padding: 1rem;
  }

  .btn-login {
    padding: 1rem;
  }
}

/* ===== DARK MODE ENHANCEMENTS ===== */
@media (prefers-color-scheme: dark) {
  .login-container {
    box-shadow: 
      0 8px 32px rgba(0, 0, 0, 0.6),
      0 0 0 1px rgba(255, 255, 255, 0.08) inset,
      0 20px 60px rgba(99, 102, 241, 0.15);
  }
}
</style>