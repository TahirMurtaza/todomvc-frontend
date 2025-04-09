<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

import TodoFooter from './TodoFooter.vue';
import TodoHeader from './TodoHeader.vue';
import TodoItem from './TodoItem.vue';

const todos = ref([]);
const route = useRoute();

const filters = {
  all: todos => todos,
  active: todos => todos.value.filter(todo => !todo.completed),
  completed: todos => todos.value.filter(todo => todo.completed)
}

const activeTodos = computed(() => filters.active(todos))
const completedTodos = computed(() => filters.completed(todos))
const filteredTodos = computed(() => {
  switch (route.name) {
    case 'active': return activeTodos
    case 'completed': return completedTodos
    default: return todos
  }
})

const toggleAllModel = computed({
  get: () => activeTodos.value.length === 0,
  set: value => todos.value.forEach(todo => todo.completed = value)
})

function uuid() {
  let uuid = ""
  for (let i = 0; i < 32; i++) {
    let random = (Math.random() * 16) | 0
    if (i === 8 || i === 12 || i === 16 || i === 20) uuid += "-"
    uuid += (i === 12 ? 4 : i === 16 ? (random & 3) | 8 : random).toString(16)
  }
  return uuid
}

function addTodo(value) {
  todos.value.push({ completed: false, title: value, id: uuid() })
}

function deleteTodo(todo) {
  todos.value = todos.value.filter(t => t !== todo)
}

function toggleTodo(todo, value) {
  todo.completed = value
}

function editTodo(todo, value) {
  todo.title = value
}

function deleteCompleted() {
  todos.value = todos.value.filter(todo => !todo.completed)
}
</script>

<template>
  <q-page class="col-11 col-sm-8 col-md-6 col-lg-4 col-xl-3 q-pa-xs q-pa-md-sm q-mb-xl">
    <q-card class="q-mx-auto" style="max-width: 600px">
      <TodoHeader @add-todo="addTodo" />

      <q-separator />

      <q-card-section v-if="todos.length > 0">
        <q-toggle v-model="toggleAllModel" label="Mark all as completed" class="q-mb-md" />

        <q-list bordered class="rounded-borders">
          <TodoItem
            v-for="(todo, index) in filteredTodos.value"
            :key="todo.id"
            :todo="todo"
            :index="index"
            @delete-todo="deleteTodo"
            @edit-todo="editTodo"
            @toggle-todo="toggleTodo"
          />
        </q-list>
      </q-card-section>

      <TodoFooter :todos="todos" @delete-completed="deleteCompleted" />
    </q-card>
  </q-page>
</template>