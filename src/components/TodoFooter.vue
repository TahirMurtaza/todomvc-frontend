<!-- TodoFooter.vue -->
<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const props = defineProps(['todos']);
const route = useRoute();
const router = useRouter();
const remaining = computed(() => props.todos.filter(todo => !todo.completed).length);

function navigate(name) {
  router.push({ name })
}
</script>

<template>
  <q-card-actions class="bg-grey-2 q-pa-sm flex flex-wrap items-center justify-between">
    <div class="text-subtitle2">
      <strong>{{ remaining }}</strong> {{ remaining === 1 ? "item" : "items" }} left
    </div>

    <div class="q-gutter-sm row items-center no-wrap filters">
      <q-btn
        flat
        dense
        label="All"
        @click="navigate('all')"
        :color="route.name === 'all' ? 'primary' : 'grey-8'"
      />
      <q-btn
        flat
        dense
        label="Active"
        @click="navigate('active')"
        :color="route.name === 'active' ? 'primary' : 'grey-8'"
      />
      <q-btn
        flat
        dense
        label="Completed"
        @click="navigate('completed')"
        :color="route.name === 'completed' ? 'primary' : 'grey-8'"
      />
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
