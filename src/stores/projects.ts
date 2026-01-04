import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Project } from '../components/types/index'
import { supabase } from '../SupabaseCli' // cria esse arquivo com createClient

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref<Project[]>([])

  // Buscar todos os projetos do Supabase
  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from('withvisionstack_portfolio')
      .select('*')

    if (error) {
      console.error('Erro ao buscar projetos:', error.message)
      return
    }
    console.log('Projetos recebidos:', data)
    projects.value = (data || []) as Project[]
  }

  // Adicionar projeto
  const addProject = async (project: Omit<Project, 'id'>) => {
    const { data, error } = await supabase
      .from('withvisionstack_portfolio')
      .insert([{
        icon: project.icon,
        title: project.title,
        description: project.description,
        tags: project.tags,
        demolink: project.demolink,   // minúsculo
        githublink: project.githublink, // minúsculo
        image_url: project.image_url,
        visible: project.visible
      }])
      .select()

    if (error) {
      console.error('Erro ao adicionar projeto:', error.message)
      return
    }
    if (data) projects.value.push(...(data as Project[]))
  }

  // Atualizar projeto
  const updateProject = async (id: string, updates: Partial<Project>) => {
    const { error } = await supabase
      .from('withvisionstack_portfolio')
      .update(updates)
      .eq('id', id)

    if (error) {
      console.error('Erro ao atualizar projeto:', error.message)
      return
    }
    await fetchProjects()
  }

  // Deletar projeto
  const deleteProject = async (id: string) => {
    const { error } = await supabase
      .from('withvisionstack_portfolio')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Erro ao deletar projeto:', error.message)
      return
    }
    projects.value = projects.value.filter(p => p.id !== id)
  }

  // Toggle visibilidade
  const toggleVisibility = async (id: string) => {
    const project = projects.value.find(p => p.id === id)
    if (project) {
      const { error } = await supabase
        .from('withvisionstack_portfolio')
        .update({ visible: !project.visible })
        .eq('id', id)
      if (!error) project.visible = !project.visible
    }
  }

  // Obter apenas projetos visíveis
  const getVisibleProjects = () => projects.value.filter(p => p.visible)

  // Obter todos os projetos
  const getAllProjects = () => projects.value

  return {
    projects,
    fetchProjects,
    addProject,
    updateProject,
    deleteProject,
    toggleVisibility,
    getVisibleProjects,
    getAllProjects
  }
})

