<template>
  <section id="home">
    <div class="hero-content">
      <h1>{{ languageStore.t('hero.title') }}</h1>
      <div class="subtitle">
        {{ languageStore.t('hero.subtitle') }}
      </div>
      <p>
        {{ languageStore.t('hero.description') }}
      </p>

      <div class="cta-buttons">
        <a href="#projetos" class="btn btn-primary">
          <i class="fas fa-rocket"></i> 
          <span>{{ languageStore.t('hero.projectsBtn') }}</span>
        </a>
        <a href="#contato" class="btn btn-secondary">
          <i class="fas fa-envelope"></i> 
          <span>{{ languageStore.t('hero.contactBtn') }}</span>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useLanguageStore } from '../stores/language'

const languageStore = useLanguageStore()
</script>

<style scoped>
#home {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0a0a1e 0%, #1a1a3e 100%);
  position: relative;
  overflow: hidden;
  padding: 2rem;
}

#home::before {
  content: '';
  position: absolute;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%);
  border-radius: 50%;
  top: -250px;
  right: -250px;
  animation: pulse 4s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.5;
  }
}

.hero-content {
  text-align: center;
  max-width: 800px;
  z-index: 1;
  animation: fadeInUp 1s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

h1 {
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 1.5rem;
  font-weight: 300;
}

p {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.8;
  margin-bottom: 2.5rem;
}

.cta-buttons {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s;
  font-size: 1rem;
}

.btn-primary {
  background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
  color: white;
  box-shadow: 0 10px 30px rgba(99, 102, 241, 0.3);
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 40px rgba(99, 102, 241, 0.5);
}

.btn-secondary {
  background: transparent;
  color: white;
  border: 2px solid #6366f1;
}

.btn-secondary:hover {
  background: #6366f1;
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(99, 102, 241, 0.3);
}

@media (max-width: 768px) {
  .cta-buttons {
    flex-direction: column;
    align-items: stretch;
  }

  .btn {
    justify-content: center;
  }
}
</style>