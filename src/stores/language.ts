import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Translations {
  [key: string]: any
}

const translations: Record<string, Translations> = {
  pt: {
    nav: {
      home: 'Início',
      about: 'Sobre',
      projects: 'Projetos',
      contact: 'Contato'
    },
    hero: {
      title: 'Desenvolvedor Full-Stack',
      subtitle: 'Transformando ideias em experiências digitais',
      description: 'Especializado em criar interfaces modernas, responsivas e de alta performance que encantam usuários e impulsionam negócios.',
      projectsBtn: 'Ver Projetos',
      contactBtn: 'Entre em Contato'
    },
    about: {
      title: 'Sobre Mim',
      subtitle: 'Paixão por código e design que fazem a diferença',
      text1: 'Olá! Me chamo Hugo Felipe , Sou um desenvolvedor full-stack apaixonado por criar experiências web excepcionais. Com foco em código limpo, design intuitivo e performance otimizada, transformo conceitos em realidade digital.',
      text2: 'Minha jornada no desenvolvimento começou com curiosidade e evoluiu para uma carreira dedicada a construir soluções que realmente importam. Acredito que cada projeto é uma oportunidade de aprender algo novo e superar limites.',
      text3: 'Estudo e Aplico constantemente para me manter atualizado com as melhores práticas e tecnologias mais recentes do ecossistema full-stack.',
      techTitle: 'Tecnologias',
      learningTitle: 'Aprendendo | Estudando'
    },
    projects: {
      title: 'Projetos em Destaque',
      subtitle: 'Alguns dos meus trabalhos mais recentes',
      project1: {
        title: 'E-commerce Moderno',
        description: 'Plataforma completa de comércio eletrônico com carrinho de compras, integração de pagamento e painel administrativo.'
      },
      project2: {
        title: 'Dashboard Analytics',
        description: 'Interface administrativa com gráficos interativos e visualização de dados em tempo real para análise de métricas.'
      },
      project3: {
        title: 'Landing Page Corporativa',
        description: 'Website institucional responsivo com animações suaves e alta performance.'
      }
    },
    contact: {
      title: 'Vamos Conversar?',
      subtitle: 'Estou sempre aberto a novos projetos e oportunidades',
      namePlaceholder: 'Seu nome',
      emailPlaceholder: 'Seu e-mail',
      messagePlaceholder: 'Sua mensagem',
      sendBtn: 'Enviar Mensagem'
    },
    select: {
      lang: 'PT-BR Português',
      lang2: 'EN-GB English'
    }
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      projects: 'Projects',
      contact: 'Contact'
    },
    hero: {
      title: 'Full-Stack Developer',
      subtitle: 'Transforming ideas into digital experiences',
      description: 'Specialized in creating modern, responsive and high-performance interfaces that delight users and drive business.',
      projectsBtn: 'View Projects',
      contactBtn: 'Get in Touch'
    },
    about: {
      title: 'About Me',
      subtitle: 'Passion for code and design that make a difference',
      text1: 'Hello! My name is Hugo Felipe, I am a full-stack developer passionate about creating exceptional web experiences. With a focus on clean code, intuitive design and optimized performance, I transform concepts into digital reality.',
      text2: 'My journey in development started with curiosity and evolved into a career dedicated to building solutions that really matter. I believe that each project is an opportunity to learn something new and push boundaries.',
      text3: 'I constantly study and apply to keep myself updated with the best practices and latest technologies in the full-stack ecosystem.',
      techTitle: 'Technologies',
      learningTitle: 'Learning | Studying'
    },
    projects: {
      title: 'Featured Projects',
      subtitle: 'Some of my most recent work',
      project3: {
        title: 'Corporate Landing Page',
        description: 'Responsive institutional website with smooth animations and high performance.'
      }
    },
    contact: {
      title: 'Let\'s Talk?',
      subtitle: 'I\'m always open to new projects and opportunities',
      namePlaceholder: 'Your name',
      emailPlaceholder: 'Your email',
      messagePlaceholder: 'Your message',
      sendBtn: 'Send Message'
    },
    select: {
      lang: 'PT-BR Portuguese',
      lang2: 'EN-GB English'
    }
  }
}

export const useLanguageStore = defineStore('language', () => {
  const currentLang = ref<string>('pt')

  const t = (key: string): string => {
    const keys = key.split('.')
    let value: any = translations[currentLang.value]
    
    for (const k of keys) {
      value = value?.[k]
    }
    
    return value || key
  }

  const setLanguage = (lang: string) => {
    if (lang === 'pt' || lang === 'en') {
      currentLang.value = lang
      localStorage.setItem('lang', lang)
    }
  }

  const initLanguage = () => {
    const savedLang = localStorage.getItem('lang')
    if (savedLang && (savedLang === 'pt' || savedLang === 'en')) {
      currentLang.value = savedLang
    }
  }

  return {
    currentLang: computed(() => currentLang.value),
    t,
    setLanguage,
    initLanguage
  }
})