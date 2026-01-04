<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-container">
      <div class="modal-header">
        <h2>
          <i :class="isEdit ? 'fas fa-edit' : 'fas fa-plus'"></i>
          {{ isEdit ? 'Editar Projeto' : 'Novo Projeto' }}
        </h2>
        <button @click="$emit('close')" class="btn-close">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="modal-form">
        <div class="form-row">
          <div class="form-group">
            <label>
              <i class="fas fa-heading"></i>
              Título
            </label>
            <input
              v-model="formData.title"
              type="text"
              placeholder="Ex: Meu Projeto Incrível"
              required
            >
          </div>

          <div class="form-group">
            <label>
              <i class="fas fa-icons"></i>
              Ícone (Font Awesome)
            </label>
            <input
              v-model="formData.icon"
              type="text"
              placeholder="Ex: fas fa-rocket"
              required
            >
            <small>
              <i :class="formData.icon || 'fas fa-question'"></i>
              Preview
            </small>
          </div>
        </div>

        <div class="form-group">
          <label>
            <i class="fas fa-align-left"></i>
            Descrição
          </label>
          <textarea
            v-model="formData.description"
            placeholder="Descreva seu projeto..."
            rows="3"
            required
          ></textarea>
        </div>

        <div class="form-group">
          <label>
            <i class="fas fa-tags"></i>
            Tags (separadas por vírgula)
          </label>
          <input
            v-model="tagsInput"
            type="text"
            placeholder="Ex: React, TypeScript, API"
            required
          >
          <div class="tags-preview">
            <span v-for="tag in formData.tags" :key="tag" class="tag-preview">
              {{ tag }}
            </span>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>
              <i class="fas fa-external-link-alt"></i>
              Link Demo
            </label>
            <input
              v-model="formData.demoLink"
              type="url"
              placeholder="https://meu-projeto.com"
            >
          </div>

          <div class="form-group">
            <label>
              <i class="fab fa-github"></i>
              Link GitHub
            </label>
            <input
              v-model="formData.githubLink"
              type="url"
              placeholder="https://github.com/user/repo"
            >
          </div>
        </div>

        <div class="form-group">
          <label class="checkbox-label">
            <input
              v-model="formData.visible"
              type="checkbox"
            >
            <span>
              <i :class="formData.visible ? 'fas fa-eye' : 'fas fa-eye-slash'"></i>
              {{ formData.visible ? 'Visível no site' : 'Oculto no site' }}
            </span>
          </label>
        </div>

        <div class="modal-actions">
          <button type="button" @click="$emit('close')" class="btn-cancel">
            <i class="fas fa-times"></i>
            Cancelar
          </button>
          <button type="submit" class="btn-save">
            <i class="fas fa-check"></i>
            {{ isEdit ? 'Salvar' : 'Criar' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { Project } from '../../components/types'

const props = defineProps<{ project?: Project | null }>()
const emit = defineEmits<{ close: []; save: [project: Omit<Project, 'id'> | Project] }>()

const isEdit = computed(() => !!props.project)

const formData = ref({
  icon: props.project?.icon || 'fas fa-code',
  title: props.project?.title || '',
  description: props.project?.description || '',
  tags: props.project?.tags || [],
  demoLink: props.project?.demoLink || '',
  githubLink: props.project?.githubLink || '',
  image_url: props.project?.image_url || '', // opcional
  visible: props.project?.visible ?? true
})

const tagsInput = ref(props.project?.tags?.join(', ') || '')

watch(tagsInput, (value) => {
  formData.value.tags = value.split(',').map(t => t.trim()).filter(Boolean)
})

const handleSubmit = () => {
  const projectData = {
    ...formData.value,
    ...(props.project && { id: props.project.id })
  }
  emit('save', projectData as any)
}
</script>


<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 2rem;
  animation: fadeIn 0.3s;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal-container {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(99, 102, 241, 0.3);
  border-radius: 20px;
  max-width: 700px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  animation: slideUp 0.3s;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  border-bottom: 1px solid rgba(99, 102, 241, 0.2);
}

.modal-header h2 {
  color: #fff;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.modal-header h2 i {
  color: #6366f1;
}

.btn-close {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #ef4444;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-close:hover {
  background: rgba(239, 68, 68, 0.2);
  transform: rotate(90deg);
}

.modal-form {
  padding: 2rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(99, 102, 241, 0.3);
  border-radius: 10px;
  color: #fff;
  font-size: 0.9rem;
  transition: all 0.3s;
  font-family: inherit;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #6366f1;
  background: rgba(255, 255, 255, 0.08);
}

.form-group small {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.85rem;
  margin-top: 0.5rem;
}

.form-group small i {
  font-size: 1.2rem;
  color: #6366f1;
}

.tags-preview {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.tag-preview {
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.3);
  color: #a5b4fc;
  padding: 0.3rem 0.6rem;
  border-radius: 12px;
  font-size: 0.8rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.8);
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 10px;
  transition: all 0.3s;
}

.checkbox-label:hover {
  background: rgba(255, 255, 255, 0.05);
}

.checkbox-label input[type="checkbox"] {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.checkbox-label span {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.modal-actions button {
  flex: 1;
  padding: 1rem;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.btn-cancel {
  background: rgba(107, 114, 128, 0.1);
  color: #9ca3af;
  border: 1px solid rgba(107, 114, 128, 0.3);
}

.btn-cancel:hover {
  background: rgba(107, 114, 128, 0.2);
}

.btn-save {
  background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
  color: white;
}

.btn-save:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(99, 102, 241, 0.5);
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }

  .modal-actions {
    flex-direction: column;
  }
}
</style>