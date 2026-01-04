import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import './components/assets/style.css'
import App from './App.vue'
import '@fortawesome/fontawesome-free/css/all.css'
import 'line-awesome/dist/line-awesome/css/line-awesome.css'
import { createI18n } from 'vue-i18n'

// → Vue Toastification
import Toast, { POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

// mensagens de exemplo
const messages = {
  en: {
    projects: {
      title: 'Projects',
      subtitle: 'Some of my work'
    }
  },
  pt: {
    projects: {
      title: 'Projetos',
      subtitle: 'Alguns dos meus trabalhos'
    }
  }
}

// cria instância do i18n
const i18n = createI18n({
  legacy: false, 
  locale: 'pt',          // idioma padrão
  fallbackLocale: 'en',  // idioma de fallback
  messages
})

const app = createApp(App)
const pinia = createPinia()

// registra Pinia e i18n
app.use(pinia)
app.use(i18n)
app.use(router)

// registra Vue Toastification
app.use(Toast, {
  position: POSITION.TOP_RIGHT,
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: 'button',
  icon: true,
  rtl: false,
})

app.mount('#app')
