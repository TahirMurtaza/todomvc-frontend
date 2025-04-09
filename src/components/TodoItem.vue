<script setup>
import { ref, nextTick, computed } from 'vue'

const props = defineProps(['todo', 'index']);
const emit = defineEmits(['delete-todo', 'edit-todo', 'toggle-todo']);

const editing = ref(false);
const editInput = ref(null);
const editText = ref("");

const editModel = computed({
  get: () => props.todo.title,
  set: value => editText.value = value
})

const toggleModel = computed({
  get: () => props.todo.completed,
  set: value => emit("toggle-todo", props.todo, value)
})

function startEdit() {
  editing.value = true
  nextTick(() => editInput.value?.focus())
}

function finishEdit() {
  editing.value = false
  if (editText.value.trim().length === 0) deleteTodo()
  else updateTodo()
}

function cancelEdit() {
  editing.value = false
}

function deleteTodo() {
  emit("delete-todo", props.todo)
}

function updateTodo() {
  emit("edit-todo", props.todo, editText.value)
  editText.value = ""
}
</script>

<template>
  <q-item :class="{ 'bg-grey-3': editing }">
    <q-item-section avatar>
      <q-checkbox v-model="toggleModel" />
    </q-item-section>

    <q-item-section @dblclick="startEdit">
      <div v-if="!editing">{{ todo.title }}</div>
      <q-input
        v-else
        dense
        ref="editInput"
        v-model="editModel"
        @keyup.enter="finishEdit"
        @blur="cancelEdit"
        autofocus
      />
    </q-item-section>

    <q-item-section side>
      <q-btn icon="delete" flat color="negative" @click="deleteTodo" />
    </q-item-section>
  </q-item>
</template>