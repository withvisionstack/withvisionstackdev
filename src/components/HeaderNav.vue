<template>
  <header>
    <nav>
      <div class="logo">&lt;[$withvisionstack]/&gt;</div>
      
      <button 
        class="hamburger" 
        :class="{ active: isMenuOpen }"
        @click="toggleMenu"
        aria-label="Menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      
      <div class="nav-menu" :class="{ active: isMenuOpen }">
        <ul>
          <li v-for="item in navItems" :key="item.href">
            <a 
              :href="item.href" 
              class="nav-link"
              @click="closeMenu"
            >
              {{ languageStore.t(item.i18n) }}
            </a>
          </li>
        </ul>
        
        <div class="language-switcher">
          <button 
            class="lang-btn" 
            :class="{ active: languageStore.currentLang === 'pt' }"
            @click="languageStore.setLanguage('pt')"
          >
            PT-BR Português
          </button>
          <span class="separator">|</span>
          <button 
            class="lang-btn"
            :class="{ active: languageStore.currentLang === 'en' }"
            @click="languageStore.setLanguage('en')"
          >
            EN-GB English
          </button>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useLanguageStore } from '../stores/language'

interface NavItem {
  href: string
  i18n: string
}

const languageStore = useLanguageStore()
const isMenuOpen = ref<boolean>(false)

const navItems: NavItem[] = [
  { href: '#home', i18n: 'nav.home' },
  { href: '#sobre', i18n: 'nav.about' },
  { href: '#projetos', i18n: 'nav.projects' },
  { href: '#contato', i18n: 'nav.contact' }
]

const toggleMenu = (): void => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = (): void => {
  isMenuOpen.value = false
}
</script>

<style scoped>
header {
  position: fixed;
  top: 0;
  width: 100%;
  background: rgba(10, 10, 30, 0.95);
  backdrop-filter: blur(10px);
  z-index: 1000;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 5%;
  max-width: 1400px;
  margin: 0 auto;
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: #6366f1;
  font-family: 'Courier New', monospace;
}

.hamburger {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

.hamburger span {
  width: 25px;
  height: 3px;
  background: #fff;
  transition: all 0.3s;
  border-radius: 3px;
}

.hamburger.active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.hamburger.active span:nth-child(2) {
  opacity: 0;
}

.hamburger.active span:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -6px);
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 3rem;
}

.nav-menu ul {
  display: flex;
  list-style: none;
  gap: 2rem;
  margin: 0;
  padding: 0;
}

.nav-link {
  color: #fff;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
  position: relative;
}

.nav-link:hover {
  color: #6366f1;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background: #6366f1;
  transition: width 0.3s;
}

.nav-link:hover::after {
  width: 100%;
}

.language-switcher {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.lang-btn {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  font-size: 0.9rem;
  transition: color 0.3s;
}

.lang-btn:hover,
.lang-btn.active {
  color: #6366f1;
}

.separator {
  color: rgba(255, 255, 255, 0.3);
}

@media (max-width: 768px) {
  .hamburger {
    display: flex;
  }

  .nav-menu {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    background: rgba(10, 10, 30, 0.98);
    flex-direction: column;
    padding: 2rem;
    transform: translateX(-100%);
    transition: transform 0.3s;
  }

  .nav-menu.active {
    transform: translateX(0);
  }

  .nav-menu ul {
    flex-direction: column;
    width: 100%;
    text-align: center;
  }

  .language-switcher {
    margin-top: 1rem;
  }
}
</style>