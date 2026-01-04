export interface Project {
  id: string
  icon: string

  // novos campos
  title?: string
  description?: string
  demoLink?: string
  githubLink?: string
  imageUrl?: string

  // campos antigos (para compatibilidade)
  title_pt?: string
  title_en?: string
  description_pt?: string
  description_en?: string
  demolink?: string
  githublink?: string
  image_url?: string

  tags: string[]
  visible: boolean
}

export interface ContactForm {
  nome: string
  email: string
  mensagem: string
}

export interface Skill {
  id: string
  name: string
  level: number | string // flexível
  icon?: string          // opcional
  image?: string         // opcional
}

export interface SocialLink {
  id: string
  icon: string
  url: string
  title: string
}

