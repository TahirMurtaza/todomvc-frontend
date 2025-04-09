<template>
  <q-page class="flex flex-center column">
    <h4>Hi, {{ authStore.user?.first_name }} {{ authStore.user?.last_name }}</h4>
   
    <TodosComponent />
  </q-page>
</template>

<script setup>
import TodosComponent from 'src/components/TodosComponent.vue';
import { useAuthStore } from 'stores/auth'

const authStore = useAuthStore()
</script>
