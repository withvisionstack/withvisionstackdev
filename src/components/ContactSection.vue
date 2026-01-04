<template>
  <section id="contato">
    <h2>{{ languageStore.t('contact.title') }}</h2>
    <p class="section-subtitle">
      {{ languageStore.t('contact.subtitle') }}
    </p>
    <div class="contato-content">
      <form @submit.prevent="handleSubmit">
        <input 
          v-model="formData.nome"
          type="text" 
          name="nome" 
          :placeholder="languageStore.t('contact.namePlaceholder')"
          required
        >
        <input 
          v-model="formData.email"
          type="email" 
          name="email" 
          :placeholder="languageStore.t('contact.emailPlaceholder')"
          required
        >
        <textarea 
          v-model="formData.mensagem"
          name="mensagem" 
          :placeholder="languageStore.t('contact.messagePlaceholder')"
          required
        ></textarea>
        
        <div class="submit-wrapper">
          <button type="submit" :disabled="isSubmitting">
            <span v-if="!isSubmitting">{{ languageStore.t('contact.sendBtn') }}</span>
            <span v-else>Enviando...</span>
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useLanguageStore } from '../stores/language'
import { useToast } from 'vue-toastification'
import type { ContactForm } from './types'

// Stores
const languageStore = useLanguageStore()
const toast = useToast()

// Estado do formulário
const formData = reactive<ContactForm>({
  nome: '',
  email: '',
  mensagem: ''
})

const isSubmitting = ref<boolean>(false)

// Regex
const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Submit
const handleSubmit = async (): Promise<void> => {
  if (isSubmitting.value) return

  // 🔎 Validações
  if (!formData.nome || !formData.email || !formData.mensagem) {
    toast.warning('Por favor, preencha todos os campos.')
    return
  }

  if (!emailRegex.test(formData.email)) {
    toast.error('Por favor, insira um email válido.')
    return
  }

  if (formData.nome.length < 10) {
    toast.warning('Por favor, insira seu nome completo.')
    return
  }

  if (formData.email.length < 16) {
    toast.warning('Por favor, insira um email real.')
    return
  }

  if (formData.mensagem.length < 600) {
    toast.warning('Escreva uma mensagem mais detalhada.')
    return
  }

  try {
    isSubmitting.value = true

    // 📡 Envio real (sem reCAPTCHA)
    const response = await fetch('http://withvisionstackservices.onrender.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: formData.nome,
        email: formData.email,
        message: formData.mensagem
      })
    })

    const data: { success: boolean; message?: string } = await response.json()

    if (data.success) {
      toast.success('Mensagem enviada com sucesso! ✨')

      // 🧹 Limpar formulário
      formData.nome = ''
      formData.email = ''
      formData.mensagem = ''
    } else {
      toast.error(data.message || 'Houve um problema ao enviar sua mensagem.')
    }
  } catch (error) {
    console.error('Erro no envio:', error)
    toast.error('Não foi possível enviar sua mensagem.')
  } finally {
    isSubmitting.value = false
  }
}
</script>



<style scoped>
#contato {
  padding: 6rem 5%;
  background: #0f0f2e;
}

h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #fff;
}

.section-subtitle {
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
  font-size: 1.1rem;
  margin-bottom: 3rem;
}

.contato-content {
  max-width: 600px;
  margin: 0 auto;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

input,
textarea {
  width: 100%;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(99, 102, 241, 0.3);
  border-radius: 10px;
  color: #fff;
  font-size: 1rem;
  transition: all 0.3s;
  font-family: inherit;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #6366f1;
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 0 20px rgba(99, 102, 241, 0.2);
}

input::placeholder,
textarea::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

textarea {
  min-height: 150px;
  resize: vertical;
}
/* Força o reCAPTCHA v3 badge a ficar dentro do formulário */
.submit-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-bottom: 4rem; /* Espaço para o badge */
}
@media (max-width: 768px) {
  .grecaptcha-badge {
    position: fixed !important;
    bottom: 0 !important;
    left: 50% !important;
    transform: translateX(-50%) !important;
    box-shadow: none !important;
    border-radius: 6px;
    overflow: hidden;
  }
}


button {
  background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
  color: white;
  border: none;
  padding: 1rem 3rem;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

button:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(99, 102, 241, 0.5);
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

</style>