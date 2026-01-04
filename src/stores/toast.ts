import { defineStore } from 'pinia'
import { ref } from 'vue'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export const useToastStore = defineStore('toast', () => {
  const visible = ref(false)
  const title = ref('')
  const message = ref('')
  const type = ref<ToastType>('info')

  let timeoutId: number | null = null

  function show(
    newTitle: string,
    newMessage: string,
    newType: ToastType = 'info',
    duration = 5000
  ): void {
    title.value = newTitle
    message.value = newMessage
    type.value = newType
    visible.value = true

    if (timeoutId) clearTimeout(timeoutId)

    timeoutId = window.setTimeout(() => {
      hide()
    }, duration)
  }

  function hide(): void {
    visible.value = false
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
  }

  return {
    visible,
    title,
    message,
    type,
    show,
    hide
  }
})
