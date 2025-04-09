<script setup>
import { RouterLink } from 'vue-router'
const emit = defineEmits(['add-todo'])

const onEnter = (e) => {
  const value = e.target.value.trim()
  if (value.length > 0) {
    emit('add-todo', value)
    e.target.value = ''
  }
}
</script>

<template>
  <q-card-section class="bg-default text-center">
    <RouterLink to="/dashboard" class="text-h5  text-decoration-none">Todos</RouterLink>
    <q-input
      filled
      placeholder="What needs to be done?"
      class="q-mt-md"
      @keyup.enter="onEnter"
    />
  </q-card-section>
</template>
