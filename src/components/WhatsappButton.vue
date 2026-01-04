<template>
  <a 
    :href="`https://wa.me/${phone}?text=${encodeURIComponent(message)}`" 
    target="_blank" 
    rel="noopener noreferrer"
    class="whatsapp-float"
  >
    <i class="fab fa-whatsapp"></i>
  </a>
</template>

<script setup>
defineProps({
  phone: { type: String, required: true }, // número com DDI, ex: 554399999999
  message: { type: String, default: 'Olá! Gostaria de mais informações.' }
})
</script>

<style scoped>
.whatsapp-float {
  position: fixed;
  bottom: 20px;
  left: 20px; /* lado esquerdo */
  background-color: #25D366;
  color: white;
  font-size: 2rem;
  padding: 0.8rem;
  border-radius: 50%;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0,0,0,0.2);
  z-index: 1000;
  transition: transform 0.3s ease;
  animation: pulse 2s infinite;
}

.whatsapp-float:hover {
  transform: scale(1.1);
  background-color: #1ebe5d;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.15); }
  100% { transform: scale(1); }
}
</style>

