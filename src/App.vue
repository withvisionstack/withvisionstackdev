<script setup lang="ts">
import { useRoute } from 'vue-router'

import HeaderNav from './components/HeaderNav.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import ContactSection from './components/ContactSection.vue'
import FooterSection from './components/FooterSection.vue'
import BackToTop from './components/BackToTop.vue'
import WhatsappButton from './components/WhatsappButton.vue'
import ToastNotification from './components/ToastNotification.vue'

const route = useRoute()
</script>

<template>
  <div id="app">
    
    <router-view v-if="route.path.startsWith('/admin')" />

    
    <template v-else>
      <HeaderNav />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
      <FooterSection />
      <BackToTop />
      <WhatsappButton
        phone="5543988489529"
        message="Olá, preciso de um trabalho seu!"
        label="WhatsApp"
      />
      <ToastNotification />
    </template>
  </div>
</template>

