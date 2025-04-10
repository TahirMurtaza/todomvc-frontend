<!-- TodoComponent.vue -->
<script setup>
import { ref, computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'

import TodoFooter from './TodoFooter.vue'
import TodoHeader from './TodoHeader.vue'
import TodoItem from './TodoItem.vue'

import TodoService from '@/services/todo.service'

const route = useRoute()
const todos = ref([])

const activeTodos = computed(() => todos.value.filter((todo) => !todo.is_completed))
const completedTodos = computed(() => todos.value.filter((todo) => todo.is_completed))
const filteredTodos = computed(() => {
  switch (route.name) {
    case 'active':
      return activeTodos
    case 'completed':
      return completedTodos
    default:
      return todos
  }
})

const toggleAllModel = computed({
  get: () => activeTodos.value.length === 0,
  set: value => {
    filteredTodos.value.forEach(todo => {
      toggleTodo(todo, value)
    })
  }
})

async function loadTodos() {
  try {
    let response

    if (route.name === 'active') {
      response = await TodoService.getActiveTodos()
    } else if (route.name === 'completed') {
      response = await TodoService.getCompletedTodos()
    } else {
      response = await TodoService.getTodos()
    }

    todos.value = response.todos 

  } catch (error) {
    console.error('Failed to load todos:', error)
  }
}

async function addTodo(title) {
  const newTodo = await TodoService.createTodo({ title })
  todos.value.push(newTodo.todo)
}

async function deleteTodo(todo) {
  todos.value = todos.value.filter((t) => t.entity_id !== todo.entity_id)
  await TodoService.deleteTodo(todo.entity_id)
}

async function toggleTodo(todo, value) {
  if (todo.is_completed !== value) {
    const updated = await TodoService.updateTodo(todo.entity_id, { is_completed: value, title: todo.title })
    todo.is_completed = updated.todo.is_completed
  }
}

async function editTodo(todo, value) {
  const updated = await TodoService.updateTodo(todo.entity_id, { title: value })
  todo.title = updated.todo.title
}

async function deleteCompleted() {
  await TodoService.clearCompleted()
  todos.value = todos.value.filter((todo) => !todo.is_completed)
}

watchEffect(() => {
  loadTodos()
})
</script>

<template>
  <q-page class="q-pa-md">
    <q-card class="q-mx-auto" style="max-width: 600px">
      <TodoHeader @add-todo="addTodo" />

      <q-separator />

      <q-card-section v-if="todos.length > 0">
        <q-toggle v-model="toggleAllModel" label="Mark all as completed" class="q-mb-md" />

        <q-list bordered class="rounded-borders">
          <TodoItem
            v-for="(todo, index) in filteredTodos.value"
            :key="todo.entity_id"
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
