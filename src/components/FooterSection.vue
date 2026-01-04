<template>
  <footer>
    <div class="social-links">
      <a 
        v-for="link in socialLinks" 
        :key="link.title"
        :href="link.url" 
        class="social-link" 
        :title="link.title"
        :target="link.url !== '#' ? '_blank' : '_self'"
      >
        <i :class="link.icon"></i>
      </a>
    </div>
    <p>&copy; {{ currentYear }} Feito com ❤ por withvisionstack . Todos os direitos reservados.</p>
  </footer>
</template>

<script setup lang="ts">
import type { SocialLink } from './types'
const currentYear = new Date().getFullYear()

const socialLinks: SocialLink[] = [
  {
    title: 'GitHub',
    url: 'https://github.com/withvisionstack',
    icon: 'fab fa-github'
  },
  {
    title: 'LinkedIn',
    url: '#',
    icon: 'fab fa-linkedin-in'
  }
 
]
</script>

<style scoped>
footer {
  background: #0a0a1e;
  padding: 3rem 5%;
  text-align: center;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.social-link {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6366f1;
  font-size: 1.2rem;
  transition: all 0.3s;
  text-decoration: none;
}

.social-link:hover {
  background: #6366f1;
  color: white;
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(99, 102, 241, 0.3);
}

p {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
}
</style>