<script setup lang="ts">
import { ref } from 'vue'
import { supabase } from '../SupabaseCli'

const newPassword = ref('')
const confirmPassword = ref('')
const message = ref('')

const updatePassword = async () => {
  if (newPassword.value !== confirmPassword.value) {
    message.value = 'As senhas não coincidem.'
    return
  }

  const { error } = await supabase.auth.updateUser({
    password: newPassword.value,
  })

  if (error) {
    message.value = 'Erro ao redefinir senha: ' + error.message
  } else {
    message.value = 'Senha redefinida com sucesso! Você já pode fazer login.'
  }
}
</script>

<template>
  <div class="reset-container">
    <h2>Redefinir Senha</h2>
    <input type="password" v-model="newPassword" placeholder="Nova senha" />
    <input type="password" v-model="confirmPassword" placeholder="Confirmar senha" />
    <button @click="updatePassword">Salvar nova senha</button>
    <p>{{ message }}</p>
  </div>
</template>

