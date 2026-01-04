<template>
  <section id="projetos">
    <h2>{{ t('projects.title') }}</h2>
    <p class="section-subtitle">
      {{ t('projects.subtitle') }}
    </p>
    <div class="projetos-grid">
      <ProjectCard 
        v-for="project in visibleProjects" 
        :key="project.id"
        :project="project"
      />
    </div>
  </section>
</template>


<script setup>
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLanguageStore } from '@/stores/language'
import { useProjectsStore } from '@/stores/projects'  
import ProjectCard from './ProjectCard.vue'

const { t } = useI18n()
const projectsStore = useProjectsStore()
const languageStore = useLanguageStore()

// Computed para pegar apenas os projetos visíveis
const visibleProjects = computed(() => projectsStore.getVisibleProjects())

// Buscar projetos do Supabase quando o componente montar
onMounted(() => {
  projectsStore.fetchProjects()
})
</script>


<style scoped>
#projetos {
  padding: 6rem 5%;
  background: linear-gradient(135deg, #1a1a3e 0%, #0a0a1e 100%);
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

.projetos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .projetos-grid {
    grid-template-columns: 1fr;
  }
}
</style>