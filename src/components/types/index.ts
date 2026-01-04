export interface Project {
  id: string
  icon: string
  title_pt: string
  title_en: string
  description_pt: string
  description_en: string
  tags: string[]
  demolink: string
  githublink: string
  image_url: string
  visible: boolean
}

export interface ContactForm {
  nome: string
  email: string
  mensagem: string
}


