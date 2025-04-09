<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps(['todos']);
const route = useRoute();
const remaining = computed(() => props.todos.filter(todo => !todo.completed).length);
</script>

<template>
  <q-card-actions class="bg-grey-2 q-pa-sm flex flex-wrap items-center justify-between">
    <div class="text-subtitle2">
      <strong>{{ remaining }}</strong> {{ remaining === 1 ? "item" : "items" }} left
    </div>
    <div class="q-gutter-sm">
      <q-btn flat dense :to="'/todos'" :class="{ 'text-primary': route.name === 'all' }" label="All" />
      <q-btn flat dense :to="'/todos/active'" :class="{ 'text-primary': route.name === 'active' }" label="Active" />
      <q-btn flat dense :to="'/todos/completed'" :class="{ 'text-primary': route.name === 'completed' }" label="Completed" />
    </div>
    <q-btn 
      v-if="todos.some(todo => todo.completed)"
      label="Clear Completed"
      color="negative"
      flat
      dense
      @click="$emit('delete-completed')"
    />
  </q-card-actions>
</template>