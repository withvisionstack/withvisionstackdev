<template>
  <Transition name="toast">
    <div v-show="toastStore.visible" class="toast">
      <div class="toast-content">
        <div class="toast-icon-wrapper">
          <i class="fas fa-paper-plane toast-icon"></i>
        </div>

        <div class="toast-text">
          <h4 class="toast-title">{{ toastStore.title }}</h4>
          <p class="toast-message">{{ toastStore.message }}</p>
        </div>

        <button class="toast-close" @click="toastStore.hide">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <div
        class="toast-progress"
        :style="{ width: progressWidth + '%' }"
      ></div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue'
import { useToastStore } from '../stores/toast'

const toastStore = useToastStore()
const progressWidth = ref<number>(100)

let intervalId: number | null = null
const duration = 5000
const interval = 50
const decrement = (interval / duration) * 100

watch(
  () => toastStore.visible,
  (visible) => {
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }

    if (visible) {
      progressWidth.value = 100

      intervalId = window.setInterval(() => {
        progressWidth.value -= decrement
        if (progressWidth.value <= 0) {
          clearInterval(intervalId!)
          intervalId = null
          toastStore.hide() // <- fecha o toast automaticamente
        }
      }, interval)
    }
  }
)
onBeforeUnmount(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>


<style scoped>
.toast {
  position: fixed;
  top: 20px;
  right: 20px;
  background: rgba(10, 10, 30, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(99, 102, 241, 0.3);
  border-radius: 15px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
  min-width: 350px;
  overflow: hidden;
  z-index: 9999;
}

.toast-content {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
}

.toast-icon-wrapper {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.toast-icon {
  color: white;
  font-size: 1.2rem;
}

.toast-text {
  flex: 1;
}

.toast-title {
  color: white;
  font-size: 1rem;
  margin: 0 0 0.25rem 0;
}

.toast-message {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  margin: 0;
}

.toast-close {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  font-size: 1rem;
  padding: 0.5rem;
  transition: color 0.3s;
  flex-shrink: 0;
}

.toast-close:hover {
  color: white;
}

.toast-progress {
  height: 3px;
  background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
  transition: width 0.05s linear;
}

/* Animações de transição */
.toast-enter-active {
  animation: slideIn 0.3s ease-out;
}

.toast-leave-active {
  animation: slideOut 0.3s ease-in;
}

@keyframes slideIn {
  from {
    transform: translateX(400px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideOut {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(400px);
    opacity: 0;
  }
}

@media (max-width: 768px) {
  .toast {
    min-width: auto;
    max-width: calc(100% - 40px);
    left: 20px;
    right: 20px;
  }
}
</style>