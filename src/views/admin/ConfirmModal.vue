<template>
  <div class="modal-overlay" @click.self="$emit('cancel')">
    <div class="confirm-modal">
      <div class="confirm-icon">
        <i class="fas fa-exclamation-triangle"></i>
      </div>
      
      <h3>{{ title }}</h3>
      <p>{{ message }}</p>

      <div class="confirm-actions">
        <button @click="$emit('cancel')" class="btn-cancel">
          <i class="fas fa-times"></i>
          Cancelar
        </button>
        <button @click="$emit('confirm')" class="btn-confirm">
          <i class="fas fa-check"></i>
          Confirmar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  message: string
}>()

defineEmits<{
  confirm: []
  cancel: []
}>()
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
  z-index: 10000;
  padding: 2rem;
  animation: fadeIn 0.3s;
}

.confirm-modal {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 20px;
  padding: 2.5rem;
  max-width: 450px;
  width: 100%;
  text-align: center;
  animation: slideUp 0.3s;
}

.confirm-icon {
  width: 80px;
  height: 80px;
  background: rgba(239, 68, 68, 0.1);
  border: 3px solid rgba(239, 68, 68, 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  animation: shake 0.5s;
}

@keyframes shake {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-10deg); }
  75% { transform: rotate(10deg); }
}

.confirm-icon i {
  font-size: 2.5rem;
  color: #ef4444;
}

h3 {
  color: #fff;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

p {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  margin-bottom: 2rem;
}

.confirm-actions {
  display: flex;
  gap: 1rem;
}

.confirm-actions button {
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

.btn-confirm {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.3);
}

.btn-confirm:hover {
  background: rgba(239, 68, 68, 0.2);
  transform: translateY(-2px);
}
</style>