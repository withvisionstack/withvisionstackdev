export interface Project {
  id: string
  icon: string

  // novos campos genéricos
  title?: string        // título genérico (usado com i18n)
  description?: string  // descrição genérica
  demoLink?: string     // link da demo
  githubLink?: string   // link do GitHub
  imageUrl?: string     // URL da imagem

  // campos antigos ainda usados em partes do código
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

export interface SocialLink {
  id: string
  icon: string
  url: string
  label?: string
}



