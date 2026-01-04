<template>
  <section id="sobre">
    <h2>{{ languageStore.t('about.title') }}</h2>
    <p class="section-subtitle">
      {{ languageStore.t('about.subtitle') }}
    </p>
    <div class="sobre-content">
      <div class="sobre-text">
        <p>{{ languageStore.t('about.text1') }}</p>
        <p>{{ languageStore.t('about.text2') }}</p>
        <p>{{ languageStore.t('about.text3') }}</p>
      </div>
      <div>
        <h3 style="margin-bottom: 1.5rem;">
          <i class="fas fa-code"></i>
          <span>{{ languageStore.t('about.techTitle') }}</span>
        </h3>
        <div class="skills">
          <span 
            v-for="skill in mainSkills" 
            :key="skill.name" 
            class="skill-tag"
          >
            <i v-if="skill.icon" :class="skill.icon"></i>
            <img 
              v-else-if="skill.image" 
              :src="skill.image" 
              :alt="skill.name" 
              class="skill-icon"
            >
            {{ skill.name }}
          </span>
        </div>

        <hr style="margin: 2rem 0; border: none; border-top: 1px solid rgba(99, 102, 241, 0.3);">
        
        <h3 style="margin-bottom: 1.5rem;">
          <i class="fas fa-graduation-cap"></i> 
          <span>{{ languageStore.t('about.learningTitle') }}</span>
        </h3>
        
        <div class="skills">
          <span 
            v-for="skill in learningSkills" 
            :key="skill.name" 
            class="skill-tag"
          >
            <i v-if="skill.icon" :class="skill.icon"></i>
            <img 
              v-else-if="skill.image" 
              :src="skill.image" 
              :alt="skill.name" 
              class="skill-icon"
            >
            {{ skill.name }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useLanguageStore } from '../stores/language'
import type { Skill } from './types'

const languageStore = useLanguageStore()

const mainSkills: Skill[] = [
  { name: 'HTML5', icon: 'fa-brands fa-html5' },
  { name: 'CSS3', icon: 'fa-brands fa-css3-alt' },
  { name: 'JavaScript', icon: 'fa-brands fa-square-js' },
  { name: 'React', icon: 'fa-brands fa-react' },
  { name: 'TypeScript', image: '/assets/typescript.png' },
  { name: 'Tailwind CSS', image: '/assets/tailwind-css.svg' },
  { name: 'Git', icon: 'fa-brands fa-git-alt' },
  { name: 'Mobile responsive', icon: 'fa-solid fa-mobile-screen-button' },
  { name: 'Api Rest', image: '/public/assets/api.png' },
  { name: 'Figma', image: '/assets/figma.png' }
]

const learningSkills: Skill[] = [
  { name: 'Node.js | Back-end', icon: 'lab la-node-js' },
  { name: 'Python | Back-end', icon: 'lab la-python' },
  { name: 'PHP | Back-end', icon: 'fa-brands fa-php' },
  { name: 'Rust | Back-end', image: '/assets/Rust_programming_language_black_logo.svg.png' },
  { name: 'Golang | Back-end', image: '/assets/golang_icon_198153.png' },
  { name: 'GraphQL', image: '/assets/icons8-graphql-50.png' }
]
</script>

<style scoped>
#sobre {
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

.sobre-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  max-width: 1200px;
  margin: 0 auto;
  align-items: start;
}

.sobre-text p {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.8;
  margin-bottom: 1.5rem;
}

h3 {
  color: #fff;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

h3 i {
  color: #6366f1;
}

.skills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.skill-tag {
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.3);
  padding: 0.6rem 1.2rem;
  border-radius: 50px;
  color: #fff;
  font-size: 0.9rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s;
}

.skill-tag:hover {
  background: rgba(99, 102, 241, 0.2);
  border-color: #6366f1;
  transform: translateY(-2px);
}

.skill-tag i {
  font-size: 1.2rem;
  color: #6366f1;
}

.skill-icon {
  width: 20px;
  height: 20px;
  object-fit: contain;
}

@media (max-width: 768px) {
  .sobre-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
</style>