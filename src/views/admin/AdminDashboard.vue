<template>
  <div class="admin-dashboard">
    <div class="dashboard-header">
      <div class="header-left">
        <h1>
          <i class="fas fa-cog"></i>
          Painel Admin
        </h1>
        <p>Gerenciar meus projetos</p>
      </div>
      <div class="header-right">
        <button @click="handleLogout" class="btn-logout">
          <i class="fas fa-sign-out-alt"></i>
          Sair
        </button>
      </div>
    </div>

    <div class="dashboard-content">
      <div class="actions-bar">
        <button @click="showAddModal = true" class="btn-add">
          <i class="fas fa-plus"></i>
          Novo Projeto
        </button>
        <div class="stats">
          <span class="stat">
            <i class="fas fa-eye"></i>
            {{ visibleCount }} visíveis
          </span>
          <span class="stat">
            <i class="fas fa-eye-slash"></i>
            {{ hiddenCount }} ocultos
          </span>
        </div>
      </div>

      <div class="projects-list">
        <div
          v-for="project in allProjects"
          :key="project.id"
          class="project-card"
          :class="{ hidden: !project.visible }"
        >
          <div class="project-header">
            <div class="project-icon">
              <i :class="project.icon"></i>
            </div>
            <div class="project-info">
              <h3>{{ project.title }}</h3>
              <p>{{ project.description }}</p>
            </div>
            <div class="project-status">
              <span v-if="project.visible" class="badge badge-visible">
                <i class="fas fa-eye"></i>
                Visível
              </span>
              <span v-else class="badge badge-hidden">
                <i class="fas fa-eye-slash"></i>
                Oculto
              </span>
            </div>
          </div>

          <div class="project-tags">
            <span v-for="tag in project.tags" :key="tag" class="tag">
              {{ tag }}
            </span>
          </div>

          <div class="project-links">
            <a v-if="project.demoLink !== '#'" :href="project.demoLink" target="_blank" class="link">
              <i class="fas fa-external-link-alt"></i>
              Demo
            </a>
            <a v-if="project.githubLink !== '#'" :href="project.githubLink" target="_blank" class="link">
              <i class="fab fa-github"></i>
              GitHub
            </a>
          </div>

          <div class="project-actions">
            <button @click="toggleVisibility(project.id)" class="btn-toggle">
              <i :class="project.visible ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
              {{ project.visible ? 'Ocultar' : 'Mostrar' }}
            </button>
            <button @click="editProject(project)" class="btn-edit">
              <i class="fas fa-edit"></i>
              Editar
            </button>
            <button @click="confirmDelete(project.id)" class="btn-delete">
              <i class="fas fa-trash"></i>
              Excluir
            </button>
          </div>
        </div>

        <div v-if="allProjects.length === 0" class="empty-state">
          <i class="fas fa-folder-open"></i>
          <p>Nenhum projeto cadastrado</p>
          <button @click="showAddModal = true" class="btn-add">
            <i class="fas fa-plus"></i>
            Adicionar primeiro projeto
          </button>
        </div>
      </div>
    </div>

    <!-- Modal Add/Edit -->
    <ProjectModal
      v-if="showAddModal || editingProject"
      :project="editingProject"
      @close="closeModal"
      @save="saveProject"
    />

    <!-- Modal Confirmação Delete -->
    <ConfirmModal
      v-if="deletingId"
      title="Excluir Projeto"
      message="Tem certeza que deseja excluir este projeto? Esta ação não pode ser desfeita."
      @confirm="deleteProject"
      @cancel="deletingId = null"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import { useProjectsStore } from '../../stores/projects'
import { useToastStore } from '../../stores/toast'
import type { Project } from '../../components/types'
import ProjectModal from './ProjectModal.vue'
import ConfirmModal from './ConfirmModal.vue'

const router = useRouter()
const authStore = useAuthStore()
const projectsStore = useProjectsStore()
const toastStore = useToastStore()

const showAddModal = ref(false)
const editingProject = ref<Project | null>(null)
const deletingId = ref<string | null>(null)

const allProjects = computed(() => projectsStore.getAllProjects())

const visibleCount = computed(() =>
  allProjects.value.filter((p: Project) => p.visible).length
)

const hiddenCount = computed(() =>
  allProjects.value.filter((p: Project) => !p.visible).length
)

onMounted(() => {
  projectsStore.fetchProjects()
})

const handleLogout = () => {
  authStore.logout()
  router.push('/')
  toastStore.show("Sucesso", "Logout realizado com sucesso", "info")
}

const toggleVisibility = async (id: string) => {
  await projectsStore.toggleVisibility(id)
  toastStore.show("Sucesso", "Visibilidade do projeto alterada", "success")
}

const editProject = (project: Project) => {
  editingProject.value = { ...project }
  showAddModal.value = true
}

const closeModal = () => {
  showAddModal.value = false
  editingProject.value = null
}

const saveProject = async (project: Omit<Project, 'id'> | Project) => {
  if ('id' in project) {
    await projectsStore.updateProject(project.id, project)
    toastStore.show("Sucesso", "Projeto atualizado com sucesso", "success")
  } else {
    await projectsStore.addProject(project)
    toastStore.show("Sucesso", "Projeto adicionado com sucesso", "success")
  }
  closeModal()
}

const confirmDelete = (id: string) => {
  deletingId.value = id
}

const deleteProject = async () => {
  if (deletingId.value) {
    await projectsStore.deleteProject(deletingId.value)
    deletingId.value = null
    toastStore.show("Sucesso", "Projeto excluído com sucesso", "success")
  }
}
</script>




<style scoped>
.admin-dashboard {
  min-height: 100vh;
  background: #0a0a1e;
  padding: 2rem;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.header-left h1 {
  color: #fff;
  font-size: 2rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.header-left h1 i {
  color: #6366f1;
}

.header-left p {
  color: rgba(255, 255, 255, 0.6);
}

.btn-logout {
  padding: 0.75rem 1.5rem;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #ef4444;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
}

.btn-logout:hover {
  background: rgba(239, 68, 68, 0.2);
  border-color: #ef4444;
}

.actions-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.btn-add {
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
}

.btn-add:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(99, 102, 241, 0.5);
}

.stats {
  display: flex;
  gap: 1.5rem;
}

.stat {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
}

.stat i {
  color: #6366f1;
}

.projects-list {
  display: grid;
  gap: 1.5rem;
}

.project-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(99, 102, 241, 0.3);
  border-radius: 15px;
  padding: 2rem;
  transition: all 0.3s;
}

.project-card.hidden {
  opacity: 0.6;
  border-color: rgba(255, 255, 255, 0.1);
}

.project-card:hover {
  border-color: #6366f1;
  transform: translateY(-2px);
}

.project-header {
  display: flex;
  gap: 1.5rem;
  align-items: start;
  margin-bottom: 1.5rem;
}

.project-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.project-icon i {
  font-size: 1.5rem;
  color: white;
}

.project-info {
  flex: 1;
}

.project-info h3 {
  color: #fff;
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
}

.project-info p {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
}

.project-status {
  flex-shrink: 0;
}

.badge {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.badge-visible {
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
  border: 1px solid rgba(16, 185, 129, 0.3);
}

.badge-hidden {
  background: rgba(107, 114, 128, 0.1);
  color: #9ca3af;
  border: 1px solid rgba(107, 114, 128, 0.3);
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.tag {
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.3);
  color: #a5b4fc;
  padding: 0.4rem 0.8rem;
  border-radius: 15px;
  font-size: 0.85rem;
}

.project-links {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.link {
  color: #6366f1;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  transition: color 0.3s;
}

.link:hover {
  color: #a855f7;
}

.project-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.project-actions button {
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s;
}

.btn-toggle {
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
  border: 1px solid rgba(59, 130, 246, 0.3);
}

.btn-toggle:hover {
  background: rgba(59, 130, 246, 0.2);
}

.btn-edit {
  background: rgba(168, 85, 247, 0.1);
  color: #a855f7;
  border: 1px solid rgba(168, 85, 247, 0.3);
}

.btn-edit:hover {
  background: rgba(168, 85, 247, 0.2);
}

.btn-delete {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.3);
}

.btn-delete:hover {
  background: rgba(239, 68, 68, 0.2);
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: rgba(255, 255, 255, 0.6);
}

.empty-state i {
  font-size: 4rem;
  color: #6366f1;
  margin-bottom: 1.5rem;
  display: block;
}

.empty-state p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

@media (max-width: 768px) {
  .project-header {
    flex-direction: column;
  }

  .project-actions {
    flex-direction: column;
  }

  .project-actions button {
    width: 100%;
    justify-content: center;
  }
}
</style>