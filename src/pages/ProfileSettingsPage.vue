<template>
  <q-page class="flex row flex-center">
    <q-card class="col-11 col-sm-8 col-md-6 col-lg-4 col-xl-3 q-pa-xs q-pa-md-sm q-mb-xl">
      <q-card-section>
        <div class="text-h6 text-center">Profile Settings</div>
        <div class="text-subtitle2 text-center">
          Update your first name or last name.
        </div>
      </q-card-section>

      <q-card-section>
        <q-form @submit.prevent="onSubmit" class="full-width">
          <!-- First Name -->
          <q-input
            v-model="firstName"
            label="First Name"
            outlined
            class="q-mb-lg"
            :rules="[(val) => !!val || 'First name is required']"
          />

          <!-- Last Name -->
          <q-input
            v-model="lastName"
            label="Last Name"
            outlined
            class="q-mb-lg"
            :rules="[(val) => !!val || 'Last name is required']"
          />

          <!-- Save Button -->
          <q-btn
            label="Save"
            color="primary"
            type="submit"
            class="full-width"
            :loading="loading"
            :disable="!firstName || !lastName"
          />
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useAuthStore } from '@/stores/auth'
import PersonService from '@/services/person.service'

const $q = useQuasar()
const authStore = useAuthStore()

const loading = ref(false)
const firstName = ref('')
const lastName = ref('')

onMounted(() => {
  firstName.value = authStore.user?.first_name || ''
  lastName.value = authStore.user?.last_name || ''
})

const onSubmit = async () => {
  if (!firstName.value || !lastName.value) return

  loading.value = true
  try {
    const updatedUser = await PersonService.updateName(firstName.value, lastName.value)
    // Update user in store
    authStore.user = updatedUser
  } catch (err) {
    $q.notify({ type: 'negative', message: 'Failed to update profile.' })
    console.error(err)
  } finally {
    loading.value = false
  }
}
</script>