<template>
  <div class="projeto">
    <div class="projeto-img">
      <i :class="project.icon" style="font-size: 4rem;"></i>
    </div>
    <div class="projeto-content">
    <h3>{{ languageStore.currentLang === 'en' ? project.title_en ?? project.title_pt : project.title_pt }}
    </h3>
    <p>{{ languageStore.currentLang === 'en' ? project.description_en ?? project.description_pt : project.description_pt }}
    </p>
      <div class="projeto-tags">
        <span 
          v-for="tag in project.tags" 
          :key="tag" 
          class="tag"
        >
          {{ tag }}
        </span>
      </div>
      <div class="projeto-links">
        <a 
          :href="project.demolink" 
          class="projeto-link"
          :target="project.demolink !== '#' ? '_blank' : '_self'"
        >
          <i class="fas fa-external-link-alt"></i> Ver Demo
        </a>
        <a 
          :href="project.githublink" 
          class="projeto-link"
          :target="project.githublink !== '#' ? '_blank' : '_self'"
        >
          <i class="fab fa-github"></i> GitHub
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLanguageStore } from '../stores/language'   
import type { Project } from './types'
const languageStore = useLanguageStore()   // 👈 agora a store exist


defineProps<{
  project: Project
}>()
</script>



<style scoped>
.projeto {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  border: 1px solid rgba(99, 102, 241, 0.2);
}

.projeto:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(99, 102, 241, 0.3);
}

.projeto-img {
  background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
  padding: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  min-height: 200px;
}

.projeto-content {
  padding: 2rem;
}

.projeto-content h3 {
  color: #fff;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.projeto-content p {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.projeto-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.tag {
  background: rgba(99, 102, 241, 0.2);
  color: #a5b4fc;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
}

.projeto-links {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  cursor: pointer;
}

.projeto-link {
  color: #6366f1;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  transition: color 0.3s;
}

.projeto-link:hover {
  color: #a855f7;
}
</style>