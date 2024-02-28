<template>
  <VContainer class="flex justify-center items-center h-full">
    {{ authStore.token }}
    <Form
      @submit="onSubmit"
      :validation-schema="validationSchema"
      class="basis-full md:basis-3/5 lg:basis-2/5 xl:basis-1/5"
    >
      <VAlert variant="error" v-show="errorMessage" class="mb-6">
        {{ errorMessage }}
      </VAlert>
      <ValidatedInput name="email" label="Email" placeholder="Email" lg class="mb-10" />
      <ValidatedInput
        name="password"
        label="Password"
        placeholder="Password"
        type="password"
        lg
        class="mb-10"
      />

      <VButton size="lg" type="submit" block :disabled="requestProcessing">Login</VButton>
    </Form>
  </VContainer>
</template>

<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'
import { Form } from 'vee-validate'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useValidationSchema } from '@/composables/useValidationSchema'

interface FormData {
  email?: string | null
  password?: string | null
}

const router = useRouter()
const authStore = useAuthStore()
const requestProcessing = ref(false)
const errorMessage = ref<string>()
const { validationSchema } = useValidationSchema(['email', 'password'])

const onSubmit = async (values: FormData) => {
  requestProcessing.value = true

  try {
    const { data } = await axios.post('/auth/signin', {
      ...values
    })

    authStore.setToken(data.accessToken)
    router.push({ name: 'home' })
  } catch (err) {
    if (axios.isAxiosError(err)) {
      errorMessage.value = err.response?.data.message
    }
  }
  requestProcessing.value = false
}
</script>
